import React, { useState } from 'react';
import { Sparkles, FolderDown, Plus, HelpCircle, FileText, CheckCircle2, Info, LogOut, ShieldCheck, CreditCard, KeyRound, Users, Crown, Sun, Moon } from 'lucide-react';
import { SituacionAprendizaje } from '../types';
import { HowItWorksModal } from './HowItWorksModal';
import { SavedSdasModal } from './SavedSdasModal';
import { TesterManagerModal } from './TesterManagerModal';
import { UserSession } from './LandingPage';
import { CreaEfLogo } from './CreaEfLogo';
import { useColorTheme } from '../utils/theme';

interface NavbarProps {
  currentStep: number;
  onNewSdA: () => void;
  savedSdas: SituacionAprendizaje[];
  onLoadSdA: (sda: SituacionAprendizaje) => void;
  onDeleteSdA: (id: string) => void;
  userSession?: UserSession | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentStep, onNewSdA, savedSdas, onLoadSdA, onDeleteSdA, userSession, onLogout }) => {
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showTesterModal, setShowTesterModal] = useState(false);
  const { theme, changeTheme } = useColorTheme();
  const isLight = theme.id === 'option_1_balanced';

  const handleOpenHowItWorks = () => {
    setShowHowItWorks(true);
  };

  const toggleTheme = () => {
    changeTheme(isLight ? 'option_2_dynamic' : 'option_1_balanced');
  };

  return (
    <header
      id="app-navbar"
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        isLight
          ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-2xs'
          : `${theme.headerBgClass} text-white shadow-lg`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Badge */}
        <div className="flex items-center space-x-3">
          <div
            id="brand-icon-container"
            className={`p-1 rounded-2xl border backdrop-blur-sm shadow-xs shrink-0 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/10 border-white/20'
            }`}
          >
            <CreaEfLogo className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 id="app-main-title" className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                <span className="text-orange-500 drop-shadow-xs">Crea-</span>
                <span className="text-sky-500 drop-shadow-xs">Ef</span>
              </h1>
              <span
                id="andalucia-flag-badge"
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                  isLight
                    ? 'bg-indigo-50 text-indigo-900 border-indigo-200'
                    : 'bg-indigo-950/80 text-amber-300 border-amber-400/30'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
                LOMLOE Decreto 101/2023
              </span>
            </div>
            <p className={`text-[11px] mt-0.5 font-medium leading-snug ${isLight ? 'text-slate-500' : 'text-indigo-200'}`}>
              Diseña y personaliza tus Situaciones de Aprendizaje de EF
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Theme Toggle Button (Light / Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition shadow-2xs ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
            }`}
            title={isLight ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro luminoso'}
          >
            {isLight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Modo Oscuro</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Modo Claro</span>
              </>
            )}
          </button>

          {userSession && (
            <div
              className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-indigo-950/90 border-indigo-700 text-white'
              }`}
            >
              {userSession.type === 'trial' && (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-slate-800">Prueba ({userSession.generacionesUsadas || 0}/3)</span>
                </>
              )}
              {userSession.type === 'user' && (
                <>
                  {(userSession as any).plan === 'fundador' ? (
                    <>
                      <Crown className="w-4 h-4 text-amber-500" />
                      <span className="font-extrabold text-amber-700">Socio Fundador</span>
                    </>
                  ) : (userSession as any).plan === 'anual' ? (
                    <>
                      <CreditCard className="w-4 h-4 text-sky-600" />
                      <span className="font-bold text-sky-800">Plan Anual</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-emerald-800">Plan Mensual</span>
                    </>
                  )}
                </>
              )}
              {userSession.type === 'admin' && (
                <>
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-indigo-900">
                    {userSession.email === 'admin@crea-ef.es' ? 'Admin' : 'Tester'}
                  </span>
                </>
              )}
            </div>
          )}

          {userSession?.type === 'admin' && (
            <button
              id="btn-tester-manager-modal"
              type="button"
              onClick={() => setShowTesterModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-extrabold transition border border-emerald-600 shadow-2xs cursor-pointer"
              title="Gestión de Cuentas de Tester"
            >
              <Users className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden sm:inline">Testers</span>
            </button>
          )}

          {/* Cómo funciona Button */}
          <button
            id="btn-how-it-works"
            onClick={handleOpenHowItWorks}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border shadow-2xs ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100/80 text-amber-900 border-amber-200'
                : 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border-amber-400/40'
            }`}
            title="Instrucciones paso a paso"
          >
            <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[10px]">
              i
            </div>
            <span>Cómo funciona</span>
          </button>

          <button
            id="btn-saved-sdas-modal"
            onClick={() => setShowSavedModal(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border shadow-2xs ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                : 'bg-indigo-800/80 hover:bg-indigo-700 text-indigo-100 border-indigo-600/60'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Mis SdAs</span>
            {savedSdas.length > 0 && (
              <span id="saved-sdas-badge-count" className="ml-1 bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                {savedSdas.length}
              </span>
            )}
          </button>

          <button
            id="btn-new-sda-create"
            onClick={onNewSdA}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition shadow-xs hover:shadow active:scale-98"
          >
            <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>Nueva SdA</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className={`p-1.5 rounded-xl transition border ${
                isLight
                  ? 'bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 border-slate-200'
                  : 'bg-slate-800/80 hover:bg-red-900/60 text-slate-300 hover:text-red-200 border-slate-700'
              }`}
              title="Cerrar sesión y volver a la Pantalla de Inicio"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* How it works Modal */}
      <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />

      {/* Saved SdAs Modal */}
      <SavedSdasModal
        isOpen={showSavedModal}
        onClose={() => setShowSavedModal(false)}
        savedSdas={savedSdas}
        onLoadSdA={onLoadSdA}
        onDeleteSdA={onDeleteSdA}
      />

      {/* Tester Manager Modal */}
      <TesterManagerModal
        isOpen={showTesterModal}
        onClose={() => setShowTesterModal(false)}
      />
    </header>
  );
};
