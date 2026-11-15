import React, { useEffect } from 'react';
import { BookmarkCheck, CheckSquare, Square, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Ciclo, TematicaEF, EtapaEducativa, ComunidadAutonoma, Curso } from '../types';
import { getCompetenciasByEtapa, getCriteriosByEtapa } from '../utils/curriculumHelpers';

interface Step2Props {
  comunidad: ComunidadAutonoma;
  etapa: EtapaEducativa;
  curso: Curso;
  ciclo: Ciclo;
  tematica: TematicaEF;
  competenciasSeleccionadas: string[];
  setCompetenciasSeleccionadas: (v: string[]) => void;
  criteriosSeleccionados: string[];
  setCriteriosSeleccionados: (v: string[]) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step2Curriculum: React.FC<Step2Props> = ({
  comunidad,
  etapa,
  curso,
  ciclo,
  tematica,
  competenciasSeleccionadas,
  setCompetenciasSeleccionadas,
  criteriosSeleccionados,
  setCriteriosSeleccionados,
  onPrev,
  onNext,
}) => {
  const competenciasEtapa = getCompetenciasByEtapa(etapa, comunidad);
  const criteriosEtapa = getCriteriosByEtapa(etapa, comunidad);

  // Filter criterios matching current cycle OR specific course if provided in the data
  const criteriosDelCiclo = criteriosEtapa.filter((c) => {
    if (c.cursoRef && curso) {
      return c.cursoRef === curso || c.ciclo === 'Todos';
    }
    // Regla de respaldo autonómica para Andalucía por ciclo y curso
    if (comunidad === 'Andalucía' && curso) {
      const esPrimerAnioCiclo = ['1º Primaria', '3º Primaria', '5º Primaria'].includes(curso);
      const esSegundoAnioCiclo = ['2º Primaria', '4º Primaria', '6º Primaria'].includes(curso);
      if (esPrimerAnioCiclo && (c.codigo.endsWith('.a') || c.id.endsWith('.a'))) {
        return c.ciclo === ciclo || c.ciclo === 'Todos';
      }
      if (esSegundoAnioCiclo && (c.codigo.endsWith('.b') || c.id.endsWith('.b'))) {
        return c.ciclo === ciclo || c.ciclo === 'Todos';
      }
    }
    return c.ciclo === ciclo || c.ciclo === 'Todos';
  });

  // Keep selected competencias in sync with selected criteria (without forcing default competencies when empty)
  useEffect(() => {
    const compSet = new Set<string>();
    criteriosSeleccionados.forEach((cod) => {
      const crit = criteriosDelCiclo.find((c) => c.codigo === cod || c.id === cod);
      if (crit) {
        compSet.add(crit.competenciaId);
      }
    });
    setCompetenciasSeleccionadas(Array.from(compSet));
  }, [criteriosSeleccionados, criteriosDelCiclo]);

  const toggleCriterio = (codigo: string, id?: string) => {
    const exists = criteriosSeleccionados.includes(codigo) || (id && criteriosSeleccionados.includes(id));
    if (exists) {
      setCriteriosSeleccionados(criteriosSeleccionados.filter((c) => c !== codigo && c !== id));
    } else {
      setCriteriosSeleccionados([...criteriosSeleccionados, codigo]);
    }
  };

  const toggleCompetencia = (id: string) => {
    if (competenciasSeleccionadas.includes(id)) {
      setCompetenciasSeleccionadas(competenciasSeleccionadas.filter((c) => c !== id));
    } else {
      setCompetenciasSeleccionadas([...competenciasSeleccionadas, id]);
    }
  };

  return (
    <div id="step2-container" className="space-y-4">
      {/* Header card compact dark athletic */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-4 shadow-md border border-indigo-700/40">
        <div className="flex items-center space-x-3 mb-1">
          <BookmarkCheck className="w-6 h-6 text-amber-400" />
          <h2 className="text-lg font-bold">Paso 2: Conexión Curricular (Criterios y Competencias)</h2>
        </div>
        <p className="text-indigo-100 text-xs max-w-3xl">
          Selección de Competencias Específicas y Criterios de Evaluación autonómicos de {comunidad} para <strong>{etapa} ({ciclo})</strong>.
        </p>
      </div>

      {/* Info notice compact */}
      <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-xl flex items-center space-x-2.5 text-amber-950 text-xs shadow-2xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="text-xs">
          <strong>Alineación autonómica automática:</strong> Al marcar Criterios de Evaluación del <strong>{ciclo}</strong>, la app vincula automáticamente sus Competencias Específicas correspondientes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Competencias Específicas EF (5 total) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
            <span>Competencias Específicas (EF)</span>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-100">
              {competenciasSeleccionadas.length} seleccionadas
            </span>
          </h3>

          <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1.5 scrollbar-thin">
            {competenciasEtapa.map((comp) => {
              const isSelected = competenciasSeleccionadas.includes(comp.id);
              return (
                <div
                  key={comp.id}
                  onClick={() => toggleCompetencia(comp.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/90 border-indigo-500 shadow-2xs ring-1 ring-indigo-500/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    <div className="mt-0.5 text-indigo-700">
                      {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold bg-indigo-900 text-white px-2 py-0.5 rounded">
                          {comp.id}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs">{comp.nombre}</h4>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{comp.descripcion}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Criterios de Evaluación por Ciclo */}
        <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2 mb-3 flex items-center justify-between">
            <span>Criterios de Evaluación - {ciclo}</span>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-100">
              {criteriosSeleccionados.length} seleccionados
            </span>
          </h3>

          <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1.5 scrollbar-thin">
            {criteriosDelCiclo.map((crit) => {
              const isSelected = criteriosSeleccionados.includes(crit.codigo) || criteriosSeleccionados.includes(crit.id);
              const decretoNum = crit.id ? crit.id.replace(/-[23]c/, '') : '';
              return (
                <div
                  key={crit.id}
                  onClick={() => toggleCriterio(crit.codigo, crit.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/90 border-indigo-500 shadow-2xs ring-1 ring-indigo-500/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    <div className="mt-0.5 text-indigo-700">
                      {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold bg-indigo-900 text-white px-2 py-0.5 rounded">
                          {crit.codigo}
                        </span>
                        {decretoNum && decretoNum !== crit.codigo && (
                          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                            Criterio {decretoNum}
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-500">
                          Vinc: {crit.competenciaId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">{crit.descripcion}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-step2-prev"
          onClick={onPrev}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior: Datos Generales</span>
        </button>

        <button
          id="btn-step2-next"
          disabled={criteriosSeleccionados.length === 0}
          onClick={onNext}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
        >
          <span>Siguiente: Saberes Básicos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
