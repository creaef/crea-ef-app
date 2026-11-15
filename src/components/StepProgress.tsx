import React from 'react';
import {
  FileText,
  BookmarkCheck,
  BookOpen,
  Boxes,
  Calendar,
  Trophy,
  Users,
  ClipboardCheck,
  Package,
  Download,
  Check,
} from 'lucide-react';
import { useColorTheme } from '../utils/theme';

interface StepProgressProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  maxStepReached: number;
}

const STEPS = [
  { step: 1, label: 'Datos & Temática', icon: FileText },
  { step: 2, label: 'Currículo', icon: BookmarkCheck },
  { step: 3, label: 'Saberes & ODS', icon: BookOpen },
  { step: 4, label: 'Metodología', icon: Boxes },
  { step: 5, label: 'Sesiones', icon: Calendar },
  { step: 6, label: 'Producto Final', icon: Trophy },
  { step: 7, label: 'Diversidad', icon: Users },
  { step: 8, label: 'Evaluación', icon: ClipboardCheck },
  { step: 9, label: 'Recursos', icon: Package },
  { step: 10, label: 'Resumen SdA', icon: Download },
];

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep, onSelectStep, maxStepReached }) => {
  const { theme } = useColorTheme();
  const isLight = theme.id === 'option_1_balanced';

  return (
    <div
      id="step-progress-wrapper"
      className={`sticky top-[58px] z-30 backdrop-blur-md border-b py-2 px-4 shadow-md overflow-x-auto scrollbar-thin transition-colors ${
        isLight
          ? 'bg-white/95 border-slate-200/90 text-slate-900'
          : 'bg-slate-950/95 border-slate-800 text-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[760px] space-x-1">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.step;
          const isCompleted = currentStep > s.step || maxStepReached > s.step;
          const isClickable = s.step <= maxStepReached || s.step <= currentStep + 1;

          return (
            <React.Fragment key={s.step}>
              <button
                id={`step-indicator-btn-${s.step}`}
                disabled={!isClickable}
                onClick={() => onSelectStep(s.step)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/25 ring-2 ring-amber-400/40'
                    : isCompleted
                    ? isLight
                      ? 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200'
                      : 'bg-emerald-950/70 text-emerald-300 hover:bg-emerald-900/80 border border-emerald-500/30'
                    : isClickable
                    ? isLight
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                    : isLight
                    ? 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
                    : 'bg-slate-900/60 text-slate-600 cursor-not-allowed opacity-50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-slate-950 text-amber-400 font-black'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isLight
                      ? 'bg-slate-200 text-slate-600'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isCompleted && !isActive ? <Check className="w-3 h-3 stroke-[3]" /> : s.step}
                </div>

                <span className="truncate max-w-[90px]">{s.label}</span>
              </button>

              {s.step < STEPS.length && (
                <div
                  className={`h-0.5 flex-1 min-w-[10px] max-w-[24px] ${
                    isCompleted
                      ? isLight
                        ? 'bg-indigo-300'
                        : 'bg-amber-400'
                      : isLight
                      ? 'bg-slate-200'
                      : 'bg-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
