import React, { useEffect, useState } from 'react';
import { Package, ArrowLeft, ArrowRight, Plus, Trash2, Download, Printer, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { Curso, Ciclo } from '../types';
import {
  downloadDuaCardsPdf,
  downloadAcrosportCardsPdf,
  openDuaCardsPrintWindow,
  openAcrosportCardsPrintWindow,
} from '../utils/cardDecksPdf';

interface Step9Props {
  curso?: Curso;
  ciclo?: Ciclo;
  recursosEspaciales: string[];
  setRecursosEspaciales: (v: string[]) => void;
  recursosMateriales: string[];
  setRecursosMateriales: (v: string[]) => void;
  recursosExternos: string[];
  setRecursosExternos: (v: string[]) => void;
  recursosCurriculares: string[];
  setRecursosCurriculares: (v: string[]) => void;
  onPrev: () => void;
  onNext: () => void;
}

const DEFAULT_ESPACIALES = [
  'Pista polideportiva exterior del centro escolar',
  'Pabellón de Educación Física / Gimnasio cubierto',
  'Parque público / Entorno natural o parque periurbano de la localidad',
];

const DEFAULT_MATERIALES = [
  'Balones de gomaespuma de alta densidad y petos de colores variados',
  'Aros, picas, ladrillos de plástico y conos de delimitación espacial',
  'Combas largas y cortas, colchonetas y paracaídas de tela gigante',
  'Materiales reciclados (chapas decoradas, cajas de cartón, botellas)',
];

const DEFAULT_CURRICULARES = [
  'Tarjetas visuales DUA de apoyo a las reglas, roles inclusivos y pausas sensoriales',
  'Dianas impresas para la autoevaluación motriz y emocional',
  'Cancionero popular y pautas visuales de aprendizaje motor',
];

export const Step9Resources: React.FC<Step9Props> = ({
  curso,
  ciclo,
  recursosEspaciales,
  setRecursosEspaciales,
  recursosMateriales,
  setRecursosMateriales,
  recursosExternos,
  setRecursosExternos,
  recursosCurriculares,
  setRecursosCurriculares,
  onPrev,
  onNext,
}) => {
  const isThirdCycleOrHigher =
    (typeof ciclo === 'string' && (ciclo.toLowerCase().includes('tercer') || ciclo.toLowerCase().includes('3º') || ciclo.toLowerCase().includes('secundaria') || ciclo.toLowerCase().includes('eso'))) ||
    (typeof curso === 'string' && (curso.includes('5º') || curso.includes('6º') || curso.toLowerCase().includes('eso') || curso.toLowerCase().includes('secundaria')));

  const getDefaultExternos = () => {
    return isThirdCycleOrHigher
      ? [
          'Altavoz Bluetooth portátil para ambientación sonora y audiciones musicales',
          'Tabletas digitales del centro para registro puntual de retos motrices o autoevaluación',
        ]
      : [
          'Altavoz Bluetooth portátil para audiciones, ritmo y ambientación musical en pista',
          'Cronómetro y silbato del docente para dinamización y tiempos de actividad',
        ];
  };

  useEffect(() => {
    if (recursosEspaciales.length === 0) setRecursosEspaciales([...DEFAULT_ESPACIALES]);
    if (recursosMateriales.length === 0) setRecursosMateriales([...DEFAULT_MATERIALES]);
    if (recursosExternos.length === 0) {
      setRecursosExternos(getDefaultExternos());
    } else if (!isThirdCycleOrHigher) {
      // Limpiar tablets automáticas si estamos en ciclos inferiores
      const cleaned = recursosExternos.filter(r => !r.toLowerCase().includes('tablet') && !r.toLowerCase().includes('móvil') && !r.toLowerCase().includes('qr'));
      if (cleaned.length !== recursosExternos.length) {
        if (cleaned.length === 0) cleaned.push('Altavoz Bluetooth portátil para audiciones y ritmo en pista');
        setRecursosExternos(cleaned);
      }
    }
    if (recursosCurriculares.length === 0) setRecursosCurriculares([...DEFAULT_CURRICULARES]);
  }, [curso, ciclo]);

  const [downloadingDua, setDownloadingDua] = useState(false);
  const [downloadingAcro, setDownloadingAcro] = useState(false);

  const handleDownloadDua = async () => {
    try {
      setDownloadingDua(true);
      await downloadDuaCardsPdf();
    } catch (e) {
      console.error('Error descargando tarjetas DUA:', e);
      openDuaCardsPrintWindow();
    } finally {
      setDownloadingDua(false);
    }
  };

  const handleDownloadAcro = async () => {
    try {
      setDownloadingAcro(true);
      await downloadAcrosportCardsPdf();
    } catch (e) {
      console.error('Error descargando tarjetas de Acrosport:', e);
      openAcrosportCardsPrintWindow();
    } finally {
      setDownloadingAcro(false);
    }
  };

  const handleAddItem = (
    list: string[],
    setter: (l: string[]) => void,
    defaultValue: string
  ) => {
    setter([...list, defaultValue]);
  };

  const handleUpdateItem = (
    list: string[],
    setter: (l: string[]) => void,
    index: number,
    value: string
  ) => {
    const copy = [...list];
    copy[index] = value;
    setter(copy);
  };

  const handleRemoveItem = (
    list: string[],
    setter: (l: string[]) => void,
    index: number
  ) => {
    const copy = [...list];
    copy.splice(index, 1);
    setter(copy);
  };

  return (
    <div id="step9-container" className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-indigo-700/40">
        <div className="flex items-center space-x-3 mb-2">
          <Package className="w-7 h-7 text-amber-400" />
          <h2 className="text-xl font-bold">Paso 9: Recursos e Instalaciones</h2>
        </div>
        <p className="text-indigo-100 text-sm max-w-3xl">
          Inventario de espacios, materiales escolares y deportivos, recursos digitales y materiales curriculares requeridos para el desarrollo de la SdA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Espaciales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 text-sm">1. Recursos Espaciales e Instalaciones</h3>
            <button
              id="btn-add-espacial"
              onClick={() => handleAddItem(recursosEspaciales, setRecursosEspaciales, 'Nuevo espacio...')}
              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-bold px-2.5 py-1 rounded-lg transition border border-indigo-200 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </div>
          <div className="space-y-2">
            {recursosEspaciales.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleUpdateItem(recursosEspaciales, setRecursosEspaciales, idx, e.target.value)}
                  className="flex-1 text-xs p-2 border border-slate-300 rounded-lg text-slate-800 focus:border-indigo-600"
                />
                <button
                  onClick={() => handleRemoveItem(recursosEspaciales, setRecursosEspaciales, idx)}
                  className="text-slate-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Materiales Deportivos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 text-sm">2. Materiales Escolares y Deportivos</h3>
            <button
              id="btn-add-material"
              onClick={() => handleAddItem(recursosMateriales, setRecursosMateriales, 'Nuevo material...')}
              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-bold px-2.5 py-1 rounded-lg transition border border-indigo-200 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </div>
          <div className="space-y-2">
            {recursosMateriales.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleUpdateItem(recursosMateriales, setRecursosMateriales, idx, e.target.value)}
                  className="flex-1 text-xs p-2 border border-slate-300 rounded-lg text-slate-800 focus:border-indigo-600"
                />
                <button
                  onClick={() => handleRemoveItem(recursosMateriales, setRecursosMateriales, idx)}
                  className="text-slate-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Externos / Digitales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 text-sm">3. Recursos Digitales y Externos</h3>
            <button
              id="btn-add-externo"
              onClick={() => handleAddItem(recursosExternos, setRecursosExternos, 'Nuevo recurso digital...')}
              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-bold px-2.5 py-1 rounded-lg transition border border-indigo-200 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </div>
          <div className="space-y-2">
            {recursosExternos.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleUpdateItem(recursosExternos, setRecursosExternos, idx, e.target.value)}
                  className="flex-1 text-xs p-2 border border-slate-300 rounded-lg text-slate-800 focus:border-indigo-600"
                />
                <button
                  onClick={() => handleRemoveItem(recursosExternos, setRecursosExternos, idx)}
                  className="text-slate-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculares */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 text-sm">4. Materiales Curriculares y Didácticos</h3>
            <button
              id="btn-add-curricular"
              onClick={() => handleAddItem(recursosCurriculares, setRecursosCurriculares, 'Nuevo recurso curricular...')}
              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-bold px-2.5 py-1 rounded-lg transition border border-indigo-200 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir</span>
            </button>
          </div>
          <div className="space-y-2">
            {recursosCurriculares.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleUpdateItem(recursosCurriculares, setRecursosCurriculares, idx, e.target.value)}
                  className="flex-1 text-xs p-2 border border-slate-300 rounded-lg text-slate-800 focus:border-indigo-600"
                />
                <button
                  onClick={() => handleRemoveItem(recursosCurriculares, setRecursosCurriculares, idx)}
                  className="text-slate-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barajas Didácticas y Materiales Recortables para la Pista (Solo se muestran si se necesitan en los materiales) */}
      {(() => {
        const allMatText = [
          ...recursosMateriales,
          ...recursosCurriculares,
          ...recursosExternos,
          ...recursosEspaciales,
        ].join(' ').toLowerCase();

        const hasAcro = /acrosport|acrogimnasia|figuras.*acro|pir[aá]mide/i.test(allMatText);
        const hasDuaCards = /dua|tarjeta.*dua|apoyo.*visual|pictograma/i.test(allMatText);

        if (!hasAcro && !hasDuaCards) return null;

        return (
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-5 border border-indigo-500/30 text-white shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-indigo-800/60 mb-4">
              <div className="flex items-center space-x-2.5">
                <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-white">Barajas Didácticas Recortables Requeridas (PDF)</h4>
                  <p className="text-xs text-indigo-200">Material visual complementario detectado en los materiales de tu SdA, listo para imprimir y plastificar.</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-1 rounded-full self-start sm:self-auto">
                100% Vectorial • Listo para Imprimir A4
              </span>
            </div>

            <div className={`grid grid-cols-1 ${hasDuaCards && hasAcro ? 'md:grid-cols-2' : ''} gap-4`}>
              {/* Card 1: Tarjetas DUA */}
              {hasDuaCards && (
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs uppercase tracking-wider text-emerald-300">Inclusión Universal</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-md font-semibold">6 Tarjetas A4</span>
                    </div>
                    <h5 className="font-bold text-white text-sm">Tarjetas DUA para Educación Física</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Roles inclusivos (Capitán de material, Juez Fair-Play), semáforo de autorregulación y esfuerzo, comodines de flexibilización y pausas sensoriales.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadDua}
                      disabled={downloadingDua}
                      className="flex-1 inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>{downloadingDua ? 'Generando PDF...' : 'Descargar PDF DUA'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={openDuaCardsPrintWindow}
                      title="Abrir vista de impresión"
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition border border-white/20"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Card 2: Tarjetas Acrosport */}
              {hasAcro && (
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs uppercase tracking-wider text-amber-300">Gimnasia Colectiva</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded-md font-semibold">6 Fichas Técnicas</span>
                    </div>
                    <h5 className="font-bold text-white text-sm">Tarjetas de Figuras de Acrosport</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Diagramas visuales de parejas, tríos y cuartetos, apoyos biomecánicos en superficies óseas y normas estrictas de seguridad y rol del ayudante.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadAcro}
                      disabled={downloadingAcro}
                      className="flex-1 inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition shadow-sm disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>{downloadingAcro ? 'Generando PDF...' : 'Descargar PDF Acrosport'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={openAcrosportCardsPrintWindow}
                      title="Abrir vista de impresión"
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition border border-white/20"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-step9-prev"
          onClick={onPrev}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior: Evaluación</span>
        </button>

        <button
          id="btn-step9-next"
          onClick={onNext}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-md transition"
        >
          <span>Siguiente: Resumen Sda</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
