import React, { useEffect, useMemo } from 'react';
import { BookOpen, CheckSquare, Square, ArrowLeft, ArrowRight, Globe, Layers, Sparkles } from 'lucide-react';
import { Ciclo, EtapaEducativa, ComunidadAutonoma, Curso, SaberBasico } from '../types';
import { ODS_LIST, DESCRIPTORES_OPERATIVOS_MAP } from '../data/curriculumData';
import { getSaberesByEtapa, getCriteriosByEtapa, getCompetenciasByEtapa } from '../utils/curriculumHelpers';

interface Step3Props {
  comunidad: ComunidadAutonoma;
  etapa: EtapaEducativa;
  curso: Curso;
  ciclo: Ciclo;
  competenciasSeleccionadas?: string[];
  criteriosSeleccionados?: string[];
  saberesSeleccionados: string[];
  setSaberesSeleccionados: (v: string[]) => void;
  odsSeleccionados: string[];
  setOdsSeleccionados: (v: string[]) => void;
  descriptoresOperativos: string[];
  setDescriptoresOperativos: (v: string[]) => void;
  onPrev: () => void;
  onNext: () => void;
}

const BLOQUES_POR_COMPETENCIA: Record<string, string[]> = {
  'CE.EF.1': ['A'],
  'CE.EF.2': ['B', 'C'],
  'CE.EF.3': ['D'],
  'CE.EF.4': ['E'],
  'CE.EF.5': ['F'],
};

export const Step3Saberes: React.FC<Step3Props> = ({
  comunidad,
  etapa,
  curso,
  ciclo,
  competenciasSeleccionadas = [],
  criteriosSeleccionados = [],
  saberesSeleccionados,
  setSaberesSeleccionados,
  odsSeleccionados,
  setOdsSeleccionados,
  descriptoresOperativos,
  setDescriptoresOperativos,
  onPrev,
  onNext,
}) => {
  const saberesEtapa = getSaberesByEtapa(etapa, comunidad);
  const criteriosEtapa = getCriteriosByEtapa(etapa, comunidad);
  const competenciasEtapa = getCompetenciasByEtapa(etapa, comunidad);

  const saberesDelCiclo = saberesEtapa.filter((s) => {
    if (s.cursoRef && curso) {
      return s.cursoRef === curso || s.ciclo === 'Todos';
    }
    return s.ciclo === ciclo || s.ciclo === 'Todos';
  });

  const criteriosDelCiclo = criteriosEtapa.filter((c) => {
    if (c.cursoRef && curso) {
      return c.cursoRef === curso || c.ciclo === 'Todos';
    }
    return c.ciclo === ciclo || c.ciclo === 'Todos';
  });

  // Mapear qué bloques de saberes están directamente vinculados a los criterios seleccionados
  const { targetBloques, vinculacionPorBloque } = useMemo(() => {
    const bloquesSet = new Set<string>();
    const vinculacion: Record<string, { compNombre: string; criterios: string[] }> = {};

    const activeComps = new Set<string>(competenciasSeleccionadas);

    criteriosSeleccionados.forEach((cod) => {
      const crit = criteriosDelCiclo.find((c) => c.codigo === cod || c.id === cod);
      if (crit) {
        activeComps.add(crit.competenciaId);
        const bloquesAsoc = BLOQUES_POR_COMPETENCIA[crit.competenciaId] || [];
        bloquesAsoc.forEach((b) => {
          bloquesSet.add(b);
          if (!vinculacion[b]) {
            const comp = competenciasEtapa.find((ce) => ce.id === crit.competenciaId);
            vinculacion[b] = { compNombre: comp ? comp.nombre : crit.competenciaId, criterios: [] };
          }
          const codLabel = crit.id ? crit.id.replace(/-[23]c/, '') : crit.codigo;
          if (!vinculacion[b].criterios.includes(codLabel)) {
            vinculacion[b].criterios.push(codLabel);
          }
        });
      }
    });

    // Si hay competencias seleccionadas sin criterios específicos
    activeComps.forEach((compId) => {
      const bloquesAsoc = BLOQUES_POR_COMPETENCIA[compId] || [];
      bloquesAsoc.forEach((b) => {
        bloquesSet.add(b);
        if (!vinculacion[b]) {
          const comp = competenciasEtapa.find((ce) => ce.id === compId);
          vinculacion[b] = { compNombre: comp ? comp.nombre : compId, criterios: [] };
        }
      });
    });

    return { targetBloques: bloquesSet, vinculacionPorBloque: vinculacion };
  }, [criteriosSeleccionados, competenciasSeleccionadas, criteriosDelCiclo, competenciasEtapa]);

  // Sincronizar Saberes Básicos automáticamente con los criterios elegidos en el Paso 2
  useEffect(() => {
    if (targetBloques.size > 0) {
      const vinculados = saberesDelCiclo
        .filter((s) => targetBloques.has(s.bloque))
        .map((s) => s.codigo);

      // Si los saberes seleccionados están vacíos o pertenecen a otro ciclo/bloque desfasado
      const validosActuales = saberesSeleccionados.filter((cod) =>
        saberesDelCiclo.some((s) => s.codigo === cod)
      );

      if (validosActuales.length === 0 && vinculados.length > 0) {
        setSaberesSeleccionados(vinculados);
      }
    } else if (saberesSeleccionados.length === 0 && saberesDelCiclo.length > 0) {
      setSaberesSeleccionados(saberesDelCiclo.slice(0, 3).map((s) => s.codigo));
    }
    if (odsSeleccionados.length === 0) {
      setOdsSeleccionados(['ODS 3: Salud y Bienestar', 'ODS 4: Educación de Calidad']);
    }
    if (descriptoresOperativos.length === 0) {
      setDescriptoresOperativos(['CPSAA2', 'CC1', 'STEM1', 'CD1']);
    }
  }, [ciclo, curso, Array.from(targetBloques).sort().join(',')]);

  const toggleSaber = (codigo: string) => {
    if (saberesSeleccionados.includes(codigo)) {
      setSaberesSeleccionados(saberesSeleccionados.filter((s) => s !== codigo));
    } else {
      setSaberesSeleccionados([...saberesSeleccionados, codigo]);
    }
  };

  const toggleOds = (id: string) => {
    if (odsSeleccionados.includes(id)) {
      setOdsSeleccionados(odsSeleccionados.filter((o) => o !== id));
    } else {
      setOdsSeleccionados([...odsSeleccionados, id]);
    }
  };

  const toggleDescriptor = (codigo: string) => {
    if (descriptoresOperativos.includes(codigo)) {
      setDescriptoresOperativos(descriptoresOperativos.filter((d) => d !== codigo));
    } else {
      setDescriptoresOperativos([...descriptoresOperativos, codigo]);
    }
  };

  return (
    <div id="step3-container" className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-indigo-700/40">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="w-7 h-7 text-amber-400" />
          <h2 className="text-xl font-bold">Paso 3: Saberes Básicos, ODS y Descriptores Operativos</h2>
        </div>
        <p className="text-indigo-100 text-sm max-w-3xl">
          Selecciona los Saberes Básicos por bloques de contenidos alineados con <strong>{etapa} ({ciclo})</strong> y conecta con los Objetivos de Desarrollo Sostenible (ODS).
        </p>
      </div>

      {/* Banner de Vinculación Curricular Automática */}
      {targetBloques.size > 0 && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-start space-x-3 shadow-2xs">
          <Sparkles className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-950 space-y-1">
            <p className="font-bold text-sm text-indigo-900">
              Saberes Básicos alineados con los Criterios del Paso 2:
            </p>
            <p className="text-indigo-800 leading-relaxed">
              Hemos vinculado y preseleccionado automáticamente los saberes de los bloques{' '}
              <strong className="underline decoration-indigo-400 font-extrabold">
                {Array.from(targetBloques).sort().map((b) => `Bloque ${b}`).join(', ')}
              </strong>{' '}
              según los criterios y competencias elegidos en la pantalla anterior. Puedes añadir o retirar bloques libremente haciendo clic en cada tarjeta.
            </p>
          </div>
        </div>
      )}

      {/* Saberes Básicos por Bloque */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-base flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-700" />
            <span>Saberes Básicos (Bloques A-F) - {ciclo}</span>
          </h3>
          <span className="text-xs bg-indigo-100 text-indigo-900 font-bold px-2.5 py-1 rounded-full">
            {saberesSeleccionados.length} seleccionados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {saberesDelCiclo.map((saber) => {
            const isSelected = saberesSeleccionados.includes(saber.codigo);
            const vincInfo = vinculacionPorBloque[saber.bloque];
            const isVinculado = Boolean(vincInfo);

            return (
              <div
                key={saber.codigo}
                onClick={() => toggleSaber(saber.codigo)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-500 shadow-xs ring-1 ring-indigo-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="mt-0.5 text-indigo-700">
                  {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="text-xs font-bold bg-indigo-900 text-white px-2 py-0.5 rounded">
                      Bloque {saber.bloque}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{saber.codigo}</span>
                    {isVinculado && (
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Alineado con tus criterios</span>
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mt-1.5">{saber.bloqueNombre}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{saber.descripcion}</p>

                  {isVinculado && (
                    <div className="mt-2.5 pt-2 border-t border-indigo-100 flex items-start space-x-1.5 text-[11px] text-indigo-900">
                      <strong className="text-indigo-950 font-bold shrink-0">Criterios vinculados:</strong>
                      <span className="text-indigo-800">
                        {vincInfo.criterios.length > 0
                          ? vincInfo.criterios.join(', ')
                          : vincInfo.compNombre}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ODS y Descriptores Operativos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ODS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-2">
              <Globe className="w-4 h-4 text-indigo-700" />
              <span>Objetivos de Desarrollo Sostenible (ODS)</span>
            </h3>
          </div>

          <div className="space-y-2.5">
            {ODS_LIST.map((ods) => {
              const isSelected = odsSeleccionados.includes(ods.id);
              return (
                <div
                  key={ods.id}
                  onClick={() => toggleOds(ods.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-start space-x-3 ${
                    isSelected ? 'bg-amber-50 border-amber-400 shadow-2xs' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="mt-0.5 text-amber-600">
                    {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{ods.nombre}</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">{ods.descripcion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Descriptores Operativos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
            Descriptores Operativos del Perfil de Salida (LOMLOE)
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {DESCRIPTORES_OPERATIVOS_MAP.map((d) => {
              const isSelected = descriptoresOperativos.includes(d.codigo);
              return (
                <button
                  type="button"
                  key={d.codigo}
                  onClick={() => toggleDescriptor(d.codigo)}
                  className={`p-2.5 rounded-lg border text-left transition ${
                    isSelected
                      ? 'bg-indigo-700 text-white border-indigo-800 font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-[11px] font-bold">{d.codigo}</div>
                  <div className="text-[10px] opacity-90 truncate">{d.nombre}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-step3-prev"
          onClick={onPrev}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior: Currículo</span>
        </button>

        <button
          id="btn-step3-next"
          disabled={saberesSeleccionados.length === 0}
          onClick={onNext}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
        >
          <span>Siguiente: Metodología y Modelos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
