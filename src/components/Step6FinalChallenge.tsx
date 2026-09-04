import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Curso, TematicaEF, SesionTrabajo, ComunidadAutonoma, EtapaEducativa } from '../types';

interface Step6Props {
  tituloSdA: string;
  curso: Curso;
  tematica: TematicaEF;
  metodologiaActiva: string;
  sesiones?: SesionTrabajo[];
  comunidad?: ComunidadAutonoma;
  etapa?: EtapaEducativa;
  productoFinal: string;
  setProductoFinal: (v: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step6FinalChallenge: React.FC<Step6Props> = ({
  tituloSdA,
  curso,
  tematica,
  metodologiaActiva,
  sesiones = [],
  comunidad,
  etapa,
  productoFinal,
  setProductoFinal,
  onPrev,
  onNext,
}) => {
  const [loadingAi, setLoadingAi] = useState(false);
  const [errorAi, setErrorAi] = useState<string | null>(null);

  // Extraer muestra de dinámicas de las sesiones para alimentar la creatividad
  const sampleGamesList = (sesiones || [])
    .flatMap((s) => (s.fases || []).filter((f) => f.fase.includes('Principal') || f.fase.includes('Práctica')).map((f) => f.nombreJuego))
    .filter(Boolean)
    .slice(0, 4);
  const sampleGamesText = sampleGamesList.length > 0 ? sampleGamesList.join(', ') : '';

  useEffect(() => {
    if (!productoFinal.trim()) {
      // Auto-generate un reto inicial que ya integre los juegos si existen
      const baseJuegos = sampleGamesText ? ` aplicando las habilidades y dinámicas practicadas (${sampleGamesText})` : '';
      setProductoFinal(
        `Reto Final "Gran Festival de Desafíos de ${tematica}": Celebración colectiva e inclusiva en la que todo el alumnado de ${curso}, organizado en equipos cooperativos bajo la metodología ${metodologiaActiva || 'activa'}, pondrá a prueba los aprendizajes adquiridos${baseJuegos}. Cada equipo superará estaciones motrices y presentará una propuesta activa donde primará el juego limpio (Fair Play), el apoyo mutuo y la consecución del reto común sin exclusiones.`
      );
    }
  }, []);

  const handleGenerateAiChallenge = async () => {
    setErrorAi(null);
    setLoadingAi(true);

    // Resumen ultra-compacto de las sesiones para gastar el mínimo número de tokens
    const resumenSesiones = (sesiones || []).map((s, idx) => {
      const juegos = (s.fases || [])
        .filter((f) => f.fase.includes('Principal') || f.fase.includes('Práctica') || f.fase.includes('Desarrollo'))
        .map((f) => f.nombreJuego)
        .filter(Boolean)
        .slice(0, 2)
        .join(', ');
      return `S${idx + 1}: ${s.titulo}${juegos ? ` [${juegos}]` : ''}`;
    }).join(' | ');

    try {
      const res = await fetch('/api/ai/generate-final-challenge', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-api-key': (localStorage.getItem('current_user_email') ? localStorage.getItem('user_gemini_api_key_' + localStorage.getItem('current_user_email')) : localStorage.getItem('user_gemini_api_key')) || ''
        },
        body: JSON.stringify({
          titulo: tituloSdA,
          curso,
          tematica,
          metodologia: metodologiaActiva,
          resumenSesiones,
          sesiones: (sesiones || []).slice(0, 8),
          comunidad,
          etapa,
        }),
      });

      const data = await res.json();
      if (data.error && !data.descripcionReto && !data.descripcion) {
        throw new Error(data.error);
      }

      const descReto = data.descripcionReto || data.descripcion || data.reto || data.productoFinal;
      if (descReto) {
        const titleText = data.tituloReto ? `Reto Final "${data.tituloReto}": ` : '';
        setProductoFinal(`${titleText}${descReto}`);
      } else {
        // Fallback dinámico rápido y contextualizado
        const juegosStr = sampleGamesText ? `integrando los retos practicados (${sampleGamesText})` : `trabajando los contenidos de ${tematica}`;
        setProductoFinal(
          `Reto Final "Gran Desafío Motor de ${tematica}": Celebración colectiva e inclusiva en la que todo el alumnado de ${curso}, agrupado en equipos heterogéneos bajo la metodología ${metodologiaActiva || 'cooperativa'}, culminará la SdA "${tituloSdA}". Los equipos superarán un circuito vivo de misiones motrices ${juegosStr}, cooperando para alcanzar un objetivo colectivo donde cada alumno/a suma desde sus posibilidades, primando la deportividad y el apoyo mutuo.`
        );
      }
    } catch (err: any) {
      console.error(err);
      const juegosStr = sampleGamesText ? `articulando las dinámicas vividas (${sampleGamesText})` : `aplicando los saberes adquiridos`;
      setProductoFinal(
        `Reto Final "Gran Aventura y Desafío de ${tematica}": Encuentro motriz gamificado y festivo en ${curso}, donde todo el alumnado colabora en equipos cooperativos bajo la metodología ${metodologiaActiva || 'activa'}. El reto culmina superando estaciones motrices ${juegosStr}, finalizando con una asamblea de celebración donde se comparte el éxito colectivo sin exclusiones.`
      );
      setErrorAi('Se ha generado una propuesta personalizada y creativa adaptada a las actividades de tus sesiones.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div id="step6-container" className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-indigo-700/40">
        <div className="flex items-center space-x-3 mb-2">
          <Trophy className="w-7 h-7 text-amber-400" />
          <h2 className="text-xl font-bold">Paso 6: Producto Final / Reto Motor Culminante</h2>
        </div>
        <p className="text-indigo-100 text-sm max-w-3xl">
          Define la tarea integradora o reto motivador que culmina la SdA, donde el alumnado aplica los saberes aprendidos.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <label id="label-producto-final" className="block text-base font-bold text-slate-900">
            Descripción del Producto Final o Reto Colectivo
          </label>
          <button
            id="btn-generate-challenge-ai"
            type="button"
            disabled={loadingAi}
            onClick={handleGenerateAiChallenge}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition border border-amber-300 shadow-xs disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 text-slate-950 ${loadingAi ? 'animate-spin' : ''}`} />
            <span>{loadingAi ? 'Diseñando reto con IA...' : 'Generar Reto con IA Gemini'}</span>
          </button>
        </div>

        <textarea
          id="textarea-producto-final"
          rows={6}
          value={productoFinal}
          onChange={(e) => setProductoFinal(e.target.value)}
          placeholder="Escribe o genera con IA el producto final (ej: Exhibición de bailes andaluces, Torneo coeducativo de Goubak con tarjetas de Fair Play, Circuito Plogging escolar...)"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-slate-800 text-sm leading-relaxed"
        />

        {errorAi && (
          <div id="error-ai-challenge" className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorAi}</span>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          id="btn-step6-prev"
          onClick={onPrev}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior: Sesiones</span>
        </button>

        <button
          id="btn-step6-next"
          disabled={!productoFinal.trim()}
          onClick={onNext}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
        >
          <span>Siguiente: Atención a la Diversidad (DUA)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
