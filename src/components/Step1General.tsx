import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  FileText,
  AlertCircle,
  ArrowRight,
  Search,
  Plus,
  X,
  Shuffle,
  CheckCircle2,
  Check,
  Tag,
  Lightbulb,
} from 'lucide-react';
import { Curso, Trimestre, TematicaEF, Ciclo, EtapaEducativa, ComunidadAutonoma } from '../types';
import { getCicloFromCurso } from '../utils/sdaGenerator';
import { LISTA_UNIFICADA_TEMATICAS } from '../data/proposedThemes';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GenerationProgressModal } from './GenerationProgressModal';

interface Step1Props {
  comunidad: ComunidadAutonoma;
  setComunidad: (v: ComunidadAutonoma) => void;
  etapa: EtapaEducativa;
  setEtapa: (v: EtapaEducativa) => void;
  titulo: string;
  setTitulo: (v: string) => void;
  curso: Curso;
  setCurso: (v: Curso) => void;
  trimestre: Trimestre;
  setTrimestre: (v: Trimestre) => void;
  numSesiones: number;
  setNumSesiones: (v: number) => void;
  tematica: TematicaEF;
  setTematica: (v: TematicaEF) => void;
  justificacion: string;
  setJustificacion: (v: string) => void;
  onNext: () => void;
  userEmail?: string;
}

const CURSOS_POR_ETAPA: Record<EtapaEducativa, Curso[]> = {
  Infantil: ['3 años', '4 años', '5 años'],
  Primaria: ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
  ESO: ['1º ESO', '2º ESO', '3º ESO', '4º ESO'],
  Bachillerato: ['1º Bachillerato', '2º Bachillerato']
};

const TRIMESTRES_LIST: Trimestre[] = ['1º Trimestre', '2º Trimestre', '3º Trimestre'];

export const Step1General: React.FC<Step1Props> = ({
  comunidad,
  setComunidad,
  etapa,
  setEtapa,
  titulo,
  setTitulo,
  curso,
  setCurso,
  trimestre,
  setTrimestre,
  numSesiones,
  setNumSesiones,
  tematica,
  setTematica,
  justificacion,
  setJustificacion,
  onNext,
  userEmail,
}) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [errorAi, setErrorAi] = useState<string | null>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressModalFinished, setProgressModalFinished] = useState(false);
  const [progressModalError, setProgressModalError] = useState<string | null>(null);


  // Parse current tematica into an array of selected theme ideas
  const [selectedThemes, setSelectedThemes] = useState<string[]>(() => {
    if (!tematica) return [];
    return tematica
      .split(', ')
      .map((s) => s.trim())
      .filter(Boolean);
  });

  const [customIdeaInput, setCustomIdeaInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const cicloCalculado: Ciclo = getCicloFromCurso(curso);

  // Sync selected themes with parent state whenever selectedThemes array changes
  const updateParentTematica = (newThemes: string[]) => {
    setSelectedThemes(newThemes);
    setTematica(newThemes.join(', '));
  };

  const handleToggleTheme = (themeName: string) => {
    if (selectedThemes.includes(themeName)) {
      const next = selectedThemes.filter((t) => t !== themeName);
      updateParentTematica(next);
    } else {
      const next = [...selectedThemes, themeName];
      updateParentTematica(next);
    }
  };

  const handleAddCustomIdea = () => {
    if (!customIdeaInput.trim()) return;
    const idea = customIdeaInput.trim();
    if (!selectedThemes.includes(idea)) {
      const next = [...selectedThemes, idea];
      updateParentTematica(next);
    }
    setCustomIdeaInput('');
  };

  const handlePickThreeRandom = () => {
    const shuffled = [...LISTA_UNIFICADA_TEMATICAS].sort(() => 0.5 - Math.random());
    const three = shuffled.slice(0, 3);
    updateParentTematica(three);
  };

  const handleClearThemes = () => {
    updateParentTematica([]);
  };

  const filteredThemes = LISTA_UNIFICADA_TEMATICAS.filter((t) =>
    t.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateJustification = async () => {
    if (!titulo.trim()) {
      setErrorAi('Por favor, escribe un Título para la SdA antes de generar la justificación.');
      return;
    }
    if (!tematica.trim()) {
      setErrorAi('Por favor, añade o selecciona al menos una temática antes de generar la justificación.');
      return;
    }
    setErrorAi(null);
    setProgressModalError(null);
    setProgressModalFinished(false);
    setIsProgressModalOpen(true);
    setLoadingAi(true);

    try {
      const res = await fetch('/api/ai/generate-justification', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo,
          curso,
          etapa,
          ciclo: cicloCalculado,
          tematica,
          comunidad,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.justificacion) {
        setJustificacion(data.justificacion);
      }

      setProgressModalFinished(true);
      setTimeout(() => {
        setIsProgressModalOpen(false);
        setProgressModalFinished(false);
      }, 700);
    } catch (err: any) {
      console.error(err);
      setErrorAi(err.message || 'Error al conectar con la IA de Gemini.');
      setProgressModalError(err.message || 'Error al conectar con la IA de Gemini.');
    } finally {
      setLoadingAi(false);
    }
  };

  const isFormValid =
    titulo.trim().length > 0 && tematica.trim().length > 0 && justificacion.trim().length > 0;

  return (
    <div id="step1-container" className="space-y-4">
      {/* Header card compact dark athletic */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-4 shadow-md border border-indigo-700/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-amber-400" />
          <div>
            <h2 className="text-lg font-bold">Paso 1: Datos Generales y Temática SdA</h2>
            <p className="text-indigo-100 text-xs">
              Define las coordenadas principales de tu Situación de Aprendizaje para el área de Educación Física ({comunidad}).
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full">
            {etapa} • {curso} • {trimestre}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* COLUMNA IZQUIERDA: Coordenadas y Justificación (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          {/* Title Input */}
          <div>
            <label id="label-sda-titulo" className="block text-xs font-bold text-slate-800 mb-1">
              Título de la Situación de Aprendizaje <span className="text-red-500">*</span>
            </label>
            <input
              id="input-sda-titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Misión Flamenca: Descubriendo el Folclore Andaluz en Movimiento"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium text-xs sm:text-sm transition bg-slate-50/50"
            />
          </div>

          {/* Comunidad, Etapa, Course, Trimestre, Num Sesiones Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Comunidad Select */}
            <div>
              <label id="label-sda-comunidad" className="block text-[11px] font-bold text-slate-700 mb-1">
                Comunidad Autónoma
              </label>
              <select
                id="select-sda-comunidad"
                value={comunidad}
                onChange={(e) => {
                  const newComunidad = e.target.value as ComunidadAutonoma;
                  setComunidad(newComunidad);
                  if (newComunidad !== 'Andalucía' && (etapa === 'Infantil' || etapa === 'Bachillerato')) {
                    setEtapa('Primaria');
                    setCurso(CURSOS_POR_ETAPA['Primaria'][0]);
                  }
                }}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500 text-slate-800 text-xs font-medium bg-slate-50"
              >
                <option value="Andalucía">Andalucía</option>
                <option value="Aragón">Aragón</option>
                <option value="Asturias">Asturias</option>
                <option value="Cantabria">Cantabria</option>
                <option value="Castilla y León">Castilla y León</option>
                <option value="Castilla-La Mancha">Castilla-La Mancha</option>
                <option value="Catalunya">Catalunya</option>
                <option value="Comunidad de Madrid">Comunidad de Madrid</option>
                <option value="Comunidad Valenciana">Comunidad Valenciana</option>
                <option value="Extremadura">Extremadura</option>
                <option value="Galicia">Galicia</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Navarra">Navarra</option>
                <option value="País Vasco">País Vasco</option>
                <option value="Región de Murcia">Región de Murcia</option>
              </select>
            </div>

            {/* Etapa Select */}
            <div>
              <label id="label-sda-etapa" className="block text-[11px] font-bold text-slate-700 mb-1">
                Etapa Educativa
              </label>
              <select
                id="select-sda-etapa"
                value={etapa}
                onChange={(e) => {
                  const newEtapa = e.target.value as EtapaEducativa;
                  setEtapa(newEtapa);
                  const firstCourse = CURSOS_POR_ETAPA[newEtapa][0];
                  setCurso(firstCourse);
                }}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500 text-slate-800 text-xs font-medium bg-slate-50"
              >
                {comunidad === 'Andalucía' && <option value="Infantil">Infantil</option>}
                <option value="Primaria">Primaria</option>
                <option value="ESO">ESO</option>
                {comunidad === 'Andalucía' && <option value="Bachillerato">Bachillerato</option>}
              </select>
            </div>

            {/* Curso / Level Select */}
            <div>
              <label id="label-sda-curso" className="block text-[11px] font-bold text-slate-700 mb-1">
                Curso / Nivel
              </label>
              <select
                id="select-sda-curso"
                value={curso}
                onChange={(e) => setCurso(e.target.value as Curso)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500 text-slate-800 text-xs font-medium bg-slate-50"
              >
                {CURSOS_POR_ETAPA[etapa].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Trimestre */}
            <div>
              <label id="label-sda-trimestre" className="block text-[11px] font-bold text-slate-700 mb-1">
                Trimestre
              </label>
              <select
                id="select-sda-trimestre"
                value={trimestre}
                onChange={(e) => setTrimestre(e.target.value as Trimestre)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500 text-slate-800 text-xs font-medium bg-slate-50"
              >
                {TRIMESTRES_LIST.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Num Sesiones */}
            <div className="sm:col-span-2">
              <label id="label-sda-num-sesiones" className="block text-[11px] font-bold text-slate-700 mb-1">
                Nº Sesiones Totales (60 min c/u)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="input-sda-num-sesiones"
                  type="number"
                  min={2}
                  max={16}
                  value={numSesiones}
                  onChange={(e) => setNumSesiones(Math.max(2, Math.min(16, parseInt(e.target.value) || 6)))}
                  className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 focus:border-indigo-600 text-slate-900 font-bold text-xs bg-slate-50"
                />
                <span className="text-[11px] text-slate-500">
                  {cicloCalculado} • Rec: 6 a 10 sesiones.
                </span>
              </div>
            </div>
          </div>

          {/* Justificación y Temática */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label id="label-sda-justificacion" className="block text-xs font-bold text-slate-800">
                Justificación de la Propuesta <span className="text-red-500">*</span>
              </label>
              <button
                id="btn-generate-justification-ai"
                type="button"
                disabled={loadingAi}
                onClick={handleGenerateJustification}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold transition border border-indigo-200 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 text-amber-500 ${loadingAi ? 'animate-spin' : ''}`} />
                <span>{loadingAi ? 'Generando...' : 'Redactar con IA'}</span>
              </button>
            </div>

            <textarea
              id="textarea-sda-justificacion"
              rows={7}
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
              placeholder={`Introduce la justificación pedagógica o pulsa en 'Redactar con IA' para que el sistema redacte la justificación alineada con la LOMLOE de ${comunidad}...`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 text-xs leading-relaxed transition bg-slate-50/30"
            />

            {errorAi && (
              <div id="error-ai-justification" className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorAi}</span>
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: Cuadro de Selección y Composición de Temáticas (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center space-x-1.5">
                <Tag className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>Composición de Temáticas</span>
              </h3>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center space-x-1 transition ${
                  selectedThemes.length >= 3
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : selectedThemes.length > 0
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>{selectedThemes.length}/3+</span>
              </span>
            </div>

            {/* Chips de ideas seleccionadas */}
            {selectedThemes.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto scrollbar-thin p-1 bg-indigo-50/40 rounded-xl border border-indigo-100">
                {selectedThemes.map((thm) => (
                  <span
                    key={thm}
                    className="inline-flex items-center gap-1 bg-white text-indigo-950 font-bold text-[10px] px-2 py-0.5 rounded-lg border border-indigo-200 shadow-2xs"
                  >
                    <span>{thm}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleTheme(thm)}
                      className="text-slate-400 hover:text-red-500 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                Selecciona al menos 3 ideas de la lista o escribe tu propia temática.
              </p>
            )}

            {/* Input para añadir temática propia */}
            <div className="flex space-x-1.5">
              <input
                type="text"
                value={customIdeaInput}
                onChange={(e) => setCustomIdeaInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomIdea())}
                placeholder="Añadir idea propia..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:border-indigo-600"
              />
              <button
                type="button"
                onClick={handleAddCustomIdea}
                className="px-3 py-1.5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-bold shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Buscador de temáticas */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar temáticas (ej: acrosport, circo, comba)..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:border-indigo-600"
              />
            </div>

            {/* Lista Scrollable de Temáticas */}
            <div className="max-h-56 overflow-y-auto scrollbar-thin pr-1 space-y-1">
              {filteredThemes.map((themeItem) => {
                const isChecked = selectedThemes.includes(themeItem);
                return (
                  <button
                    key={themeItem}
                    type="button"
                    onClick={() => handleToggleTheme(themeItem)}
                    className={`w-full p-1.5 px-2.5 rounded-lg border text-left text-xs transition flex items-center justify-between ${
                      isChecked
                        ? 'bg-indigo-50 border-indigo-400 font-bold text-indigo-950'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate pr-1">{themeItem}</span>
                    <div
                      className={`w-3.5 h-3.5 rounded border shrink-0 flex items-center justify-center ${
                        isChecked ? 'bg-indigo-700 border-indigo-800 text-white' : 'bg-white border-slate-300'
                      }`}
                    >
                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Temática Consolidada */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
              Temática Consolidada de la SdA:
            </label>
            <input
              type="text"
              value={tematica}
              onChange={(e) => {
                setTematica(e.target.value);
                setSelectedThemes(
                  e.target.value.split(', ').map((s) => s.trim()).filter(Boolean)
                );
              }}
              placeholder="Las temáticas seleccionadas se resumen aquí..."
              className="w-full px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50"
            />
          </div>
        </div>
      </div>





      {/* Navigation Footer */}
      <div className="flex justify-end pt-2">
        <button
          id="btn-step1-next"
          disabled={!isFormValid}
          onClick={onNext}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Siguiente: Conexión Curricular</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Generation Progress Modal (IA) */}
      <GenerationProgressModal
        isOpen={isProgressModalOpen}
        type="justification"
        isFinished={progressModalFinished}
        error={progressModalError}
        onClose={() => {
          setIsProgressModalOpen(false);
          setProgressModalError(null);
        }}
      />
    </div>
  );
};

