import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, Loader2, AlertCircle, X } from 'lucide-react';

export type GenerationType =
  | 'sessions'
  | 'rubric'
  | 'session-rubric'
  | 'final-challenge'
  | 'diversity'
  | 'justification';

interface GenerationProgressModalProps {
  isOpen: boolean;
  type: GenerationType;
  customTitle?: string;
  customSubtitle?: string;
  isFinished?: boolean;
  error?: string | null;
  onClose?: () => void;
}

interface StepConfig {
  title: string;
  subtitle: string;
  steps: string[];
  whyItTakesTime: string;
}

const GENERATION_CONFIGS: Record<GenerationType, StepConfig> = {
  sessions: {
    title: 'Redactando tus sesiones de Educación Física',
    subtitle: 'Tarda unos 45-60 segundos. Puedes dejar la pestaña abierta y volver.',
    steps: [
      'Reuniendo tus actividades del banco y fuentes',
      'Analizando currículo y grupo',
      'Redactando el documento',
      'Comprobando que está completo',
    ],
    whyItTakesTime:
      'No se está cargando una plantilla: se está escribiendo tu documento entero. Se cita el decreto de tu comunidad, se vinculan los criterios de evaluación que has marcado con las tareas y sus evidencias, y cada actividad se ajusta al material del que dispones y a tu ratio. Son veinte páginas.',
  },
  rubric: {
    title: 'Redactando rúbricas e instrumentos de evaluación',
    subtitle: 'Tarda unos 30-45 segundos. Puedes dejar la pestaña abierta y volver.',
    steps: [
      'Extrayendo criterios de evaluación oficiales seleccionados',
      'Graduando descriptores y niveles de logro (1 a 4)',
      'Redactando instrumentos complementarios y evidencias',
      'Comprobando coherencia y criterios de calificación',
    ],
    whyItTakesTime:
      'No se está cargando una plantilla: se están graduando los 4 niveles de desempeño para cada criterio de evaluación conforme al marco LOMLOE de tu comunidad autónoma, con evidencias observables y descriptores claros.',
  },
  'session-rubric': {
    title: 'Redactando rúbrica específica por sesiones',
    subtitle: 'Tarda unos 20-30 segundos. Puedes dejar la pestaña abierta y volver.',
    steps: [
      'Analizando los retos motrices de cada sesión',
      'Asignando indicadores de logro a cada actividad',
      'Graduando descriptores observables a pie de pista',
      'Comprobando la trazabilidad con los criterios',
    ],
    whyItTakesTime:
      'No se está cargando una plantilla: se cruzan las actividades y retos de tus sesiones para generar una rúbrica práctica y adaptada a la observación directa en clase de Educación Física.',
  },
  'final-challenge': {
    title: 'Diseñando el reto o producto final competencial',
    subtitle: 'Tarda unos 20-30 segundos. Puedes dejar la pestaña abierta y volver.',
    steps: [
      'Analizando competencias específicas y saberes del curso',
      'Ideando la narrativa motivadora y contexto del reto',
      'Estructurando fases, roles inclusivos y juego limpio',
      'Ajustando tiempos, instalaciones y formato final',
    ],
    whyItTakesTime:
      'No se está cargando una plantilla: la IA estructura un desafío motriz auténtico y significativo para tu alumnado, integrando las habilidades practicadas en la Situación de Aprendizaje.',
  },
  diversity: {
    title: 'Configurando medidas DUA y adaptaciones NEAE',
    subtitle: 'Tarda unos 20-30 segundos. Puedes dejar la pestaña abierta y volver.',
    steps: [
      'Revisando barreras de aprendizaje y casuísticas seleccionadas',
      'Aplicando los 3 principios del Diseño Universal para el Aprendizaje (DUA)',
      'Redactando adaptaciones específicas para el área motriz',
      'Verificando accesibilidad y participación activa de todo el grupo',
    ],
    whyItTakesTime:
      'No se está cargando una plantilla: se diseñan propuestas metodológicas inclusivas concretas para que todo el alumnado participe con equidad y éxito en las actividades planteadas.',
  },
  justification: {
    title: 'Redactando la justificación pedagógica',
    subtitle: 'Tarda unos 15-25 segundos. Puedes dejar la pestaña abierta y volver.',
    steps: [
      'Analizando el curso, etapa y marco normativo autonómico',
      'Redactando la fundamentación pedagógica y relevancia motriz',
      'Vinculando con los Objetivos de Desarrollo Sostenible (ODS)',
      'Comprobando coherencia didáctica y enfoque competencial',
    ],
    whyItTakesTime:
      'No se está cargando una plantilla: se redacta una fundamentación curricular y pedagógica rigurosa, adaptada a la normativa educativa de tu comunidad autónoma.',
  },
};

const FUN_PHRASES = [
  'Buscando el cono que siempre falta...',
  'Inflando los balones que perdieron presión...',
  'Eligiendo quién se pide primero a Messi...',
  'Desenredando las cuerdas de saltar del almacén...',
  'Repartiendo los petos que huelen a gloria...',
  'Verificando que nadie lleve las zapatillas desatadas...',
  'Sincronizando los criterios LOMLOE con la pista...',
  'Ajustando las pulsaciones para la vuelta a la calma...',
  'Calibrando el silbato reglamentario del profesor...',
  'Revisando que el botiquín tenga tiritas y hielo...',
  'Diseñando variantes para que nadie se quede sentado...',
  'Asegurando que la colchoneta no se deslice...',
];

export const GenerationProgressModal: React.FC<GenerationProgressModalProps> = ({
  isOpen,
  type,
  customTitle,
  customSubtitle,
  isFinished = false,
  error = null,
  onClose,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [progress, setProgress] = useState(8);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const config = useMemo(() => {
    return GENERATION_CONFIGS[type] || GENERATION_CONFIGS.sessions;
  }, [type]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setElapsedSeconds(0);
      setProgress(8);
      setPhraseIndex(Math.floor(Math.random() * FUN_PHRASES.length));
    }
  }, [isOpen]);

  // Timer counter
  useEffect(() => {
    if (!isOpen || isFinished || error) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isFinished, error]);

  // Fun phrases rotation
  useEffect(() => {
    if (!isOpen || isFinished || error) return;
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % FUN_PHRASES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen, isFinished, error]);

  // Asymptotic progress bar simulation
  useEffect(() => {
    if (!isOpen) return;
    if (error) return;

    if (isFinished) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) {
          // Slow trickle once past 94% until AI completes
          return Math.min(prev + 0.3, 97);
        }
        if (prev >= 80) return prev + 0.8;
        if (prev >= 50) return prev + 1.5;
        if (prev >= 20) return prev + 2.4;
        return prev + 3.5;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen, isFinished, error]);

  if (!isOpen) return null;

  // Format seconds to mm:ss
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Determine current active step (0 to 3)
  const currentStepIndex = isFinished
    ? 4
    : progress < 25
    ? 0
    : progress < 55
    ? 1
    : progress < 85
    ? 2
    : 3;

  const currentPhrase = FUN_PHRASES[phraseIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 overflow-hidden">
        {/* Close button if error */}
        {error && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* HEADER */}
        <div className="flex items-start space-x-4">
          {/* Custom Basketball / Sport Icon with pedestal */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs relative">
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-none stroke-current stroke-2 animate-pulse"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Basketball sphere */}
                <circle cx="12" cy="12" r="10" />
                {/* Basketball curved lines */}
                <path d="M2.1 12h19.8" />
                <path d="M12 2.1a15.3 15.3 0 0 1 4 9.9 15.3 15.3 0 0 1-4 9.9" />
                <path d="M12 2.1a15.3 15.3 0 0 0-4 9.9 15.3 15.3 0 0 0 4 9.9" />
              </svg>
            </div>
            {/* Small pedestal line like in reference image */}
            <div className="w-8 h-1 bg-slate-300 rounded-full mt-1.5" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {customTitle || config.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {customSubtitle || config.subtitle}
            </p>
          </div>
        </div>

        {/* ERROR STATE */}
        {error ? (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-3">
            <div className="flex items-center space-x-2 text-red-700 font-semibold text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Ha ocurrido un problema al redactar</span>
            </div>
            <p className="text-xs text-red-600 pl-7">{error}</p>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white transition shadow-xs"
              >
                Cerrar y Reintentar
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* STATUS PHRASE & PERCENTAGE */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-800 font-medium truncate pr-2">
                  {isFinished ? '¡Completado con éxito!' : currentPhrase}
                </span>
                <span className="text-blue-600 font-bold text-lg flex-shrink-0">
                  {Math.round(progress)} %
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full bg-blue-100/70 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              {/* ELAPSED TIMER */}
              <div className="text-xs text-slate-400 font-mono pl-0.5">
                {formatTime(elapsedSeconds)}
              </div>
            </div>

            {/* CHECKLIST STEPS */}
            <div className="space-y-3.5 pt-1">
              {config.steps.map((stepText, idx) => {
                const isCompleted = isFinished || idx < currentStepIndex;
                const isCurrent = !isFinished && idx === currentStepIndex;
                const isPending = !isFinished && idx > currentStepIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 text-sm transition-all duration-300 ${
                      isPending ? 'opacity-45' : 'opacity-100'
                    }`}
                  >
                    {/* Status Icon */}
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
                          <CheckCircle2 className="w-4 h-4 stroke-2" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 bg-slate-50 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Step Label */}
                    <span
                      className={`text-xs sm:text-sm leading-tight ${
                        isCurrent
                          ? 'font-bold text-slate-900'
                          : isCompleted
                          ? 'font-medium text-slate-800'
                          : 'text-slate-500'
                      }`}
                    >
                      {stepText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* EXPLANATORY INFO BOX ("Por qué tarda") */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-600 space-y-2">
              <p className="leading-relaxed">
                <strong className="text-slate-800 font-bold">Por qué tarda. </strong>
                {config.whyItTakesTime}
              </p>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                El documento solo cuenta si llega completo. Si algo falla por el camino, puedes reintentarlo de inmediato.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
