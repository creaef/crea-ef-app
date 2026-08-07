import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StepProgress } from './components/StepProgress';
import { Step1General } from './components/Step1General';
import { Step2Curriculum } from './components/Step2Curriculum';
import { Step3Saberes } from './components/Step3Saberes';
import { Step4Methodology } from './components/Step4Methodology';
import { Step5Sessions } from './components/Step5Sessions';
import { Step6FinalChallenge } from './components/Step6FinalChallenge';
import { Step7Diversity } from './components/Step7Diversity';
import { Step8Evaluation } from './components/Step8Evaluation';
import { Step9Resources } from './components/Step9Resources';
import { Step10Export } from './components/Step10Export';
import { LandingPage, UserSession } from './components/LandingPage';
import { SituacionAprendizaje, Curso, Trimestre, TematicaEF, Ciclo, ModeloEstructuraSesion } from './types';
import { getCicloFromCurso, generarRubricaPorDefecto } from './utils/sdaGenerator';
import { logoutGoogle, db } from './lib/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { useColorTheme } from './utils/theme';

const INITIAL_SDA_STATE: SituacionAprendizaje = {
  id: 'sda-' + Date.now(),
  fechaCreacion: new Date().toLocaleDateString('es-ES'),
  titulo: '',
  curso: '3º Primaria',
  ciclo: 'Segundo Ciclo',
  trimestre: '1º Trimestre',
  numSesiones: 6,
  tematica: '',
  justificacion: '',
  competenciasSeleccionadas: [],
  criteriosSeleccionados: [],
  saberesSeleccionados: [],
  odsSeleccionados: [],
  descriptoresOperativos: [],
  metodologiaActiva: '',
  modeloEstructura: 'Modelo 2: Competencial',
  sesiones: [],
  productoFinal: '',
  neaeSeleccionadas: [],
  adaptacionesNEAE: [],
  pautasDUAGlobales: [],
  instrumentosSeleccionados: [],
  evaluacionInicial: '',
  instrumentosEvaluacion: [],
  rubrica: [],
  recursosEspaciales: [],
  recursosMateriales: [],
  recursosExternos: [],
  recursosCurriculares: [],
};

export default function App() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxStepReached, setMaxStepReached] = useState<number>(1);
  const [sda, setSda] = useState<SituacionAprendizaje>(INITIAL_SDA_STATE);
  const [savedSdas, setSavedSdas] = useState<SituacionAprendizaje[]>([]);

  // Auto-scroll to top whenever step or login session changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, userSession?.email]);

  // El pago se confirma exclusivamente vía Webhook de Stripe en el backend.
  // Cuando el usuario vuelve de Stripe, deberá iniciar sesión nuevamente y
  // su estado se leerá de la base de datos (actualizada por el webhook).

  // Load saved SdAs on mount & whenever userSession email changes
  useEffect(() => {
    const email = userSession?.email?.trim().toLowerCase();
    if (email) {
      localStorage.setItem('current_user_email', email);
      
      const loadFromFirestore = async () => {
        try {
          const sdasRef = collection(db, 'users', email, 'user_sdas');
          const snap = await getDocs(sdasRef);
          const sdasList = snap.docs.map(d => d.data() as SituacionAprendizaje);
          
          if (sdasList.length > 0) {
            setSavedSdas(sdasList);
            try {
              localStorage.setItem(`sda_ef_andalucia_list_${email}`, JSON.stringify(sdasList));
            } catch (e) {}
          } else {
            setSavedSdas([]);
          }
        } catch (error) {
          console.warn('Could not load SdAs from Firestore:', error);
          try {
            const stored = localStorage.getItem(`sda_ef_andalucia_list_${email}`);
            setSavedSdas(stored ? JSON.parse(stored) : []);
          } catch (e) {
            setSavedSdas([]);
          }
        }
      };
      
      loadFromFirestore();
    } else {
      localStorage.removeItem('current_user_email');
      setSavedSdas([]);
    }
  }, [userSession?.email]);

  const handleStartSession = (session: UserSession) => {
    setUserSession(session);
    try {
      localStorage.setItem('sda_active_user_session', JSON.stringify(session));
    } catch (e) {
      console.error('Error saving session:', e);
    }
    handleNewSdA();
  };

  const handleLogout = async () => {
    setUserSession(null);
    setSavedSdas([]);
    handleNewSdA();
    try {
      localStorage.removeItem('sda_active_user_session');
      localStorage.removeItem('custom_excel_games_database');
      localStorage.removeItem('sda_drive_access_token');
      localStorage.removeItem('google_access_token');
      localStorage.removeItem('sda_drive_folder_id');
      localStorage.removeItem('sda_drive_folder_name');
      localStorage.removeItem('sda_drive_doc_text');
      sessionStorage.clear();
      await logoutGoogle().catch(() => {});
    } catch (e) {
      console.error('Error clearing session and tokens:', e);
    }
  };

  const updateSda = (partial: Partial<SituacionAprendizaje>) => {
    setSda((prev) => ({ ...prev, ...partial }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (step > maxStepReached) {
      setMaxStepReached(step);
    }
  };

  const handleNext = () => {
    goToStep(Math.min(10, currentStep + 1));
  };

  const handlePrev = () => {
    goToStep(Math.max(1, currentStep - 1));
  };

  const handleNewSdA = async () => {
    try {
      localStorage.removeItem('custom_excel_games_database');
      localStorage.removeItem('sda_drive_access_token');
      localStorage.removeItem('google_access_token');
      localStorage.removeItem('sda_drive_folder_id');
      localStorage.removeItem('sda_drive_folder_name');
      localStorage.removeItem('sda_drive_doc_text');
      sessionStorage.clear();
      await logoutGoogle().catch(() => {});
    } catch (e) {
      console.warn('Error clearing tokens on reset', e);
    }
    const freshState: SituacionAprendizaje = {
      ...INITIAL_SDA_STATE,
      id: 'sda-' + Date.now(),
      fechaCreacion: new Date().toLocaleDateString('es-ES'),
      titulo: '',
      justificacion: '',
      driveFolderName: '',
      driveDocumentationText: '',
      porcentajeDrive: 0,
      porcentajeBancoJuegos: 0,
      porcentajeIA: 100,
      sesiones: [],
      rubrica: [],
    };
    setSda(freshState);
    setCurrentStep(1);
    setMaxStepReached(1);
  };

  const handleSaveSdA = async () => {
    const isTrialUser = userSession?.type === 'trial' || (userSession as any)?.isTrial;
    const maxAllowedSdas = isTrialUser ? 3 : 8;

    const filtered = savedSdas.filter((s) => s.id !== sda.id);
    if (filtered.length >= maxAllowedSdas) {
      alert(`⚠️ Has alcanzado el límite máximo de ${maxAllowedSdas} Situaciones de Aprendizaje guardadas en tu perfil. Elimina alguna desde "Mis SdAs Guardadas" para guardar una nueva.`);
      return;
    }
    const updated = [sda, ...filtered].slice(0, maxAllowedSdas);
    setSavedSdas(updated);
    const email = userSession?.email?.trim().toLowerCase();
    if (email) {
      try {
        localStorage.setItem(`sda_ef_andalucia_list_${email}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
      
      try {
        const sdaDocRef = doc(db, 'users', email, 'user_sdas', sda.id);
        await setDoc(sdaDocRef, sda, { merge: true });
      } catch (e) {
        console.warn('Could not persist SdA to server:', e);
        alert('Error al guardar en la nube, pero se ha guardado localmente.');
      }
    }
  };

  const handleDeleteSdA = async (idToDelete: string) => {
    const updated = savedSdas.filter((s) => s.id !== idToDelete);
    setSavedSdas(updated);
    const email = userSession?.email?.trim().toLowerCase();
    if (email) {
      try {
        localStorage.setItem(`sda_ef_andalucia_list_${email}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Error deleting from localStorage:', e);
      }
      
      try {
        const sdaDocRef = doc(db, 'users', email, 'user_sdas', idToDelete);
        await deleteDoc(sdaDocRef);
      } catch (e) {
        console.warn('Could not delete SdA from server:', e);
      }
    }
  };

  const handleLoadSdA = (loaded: SituacionAprendizaje) => {
    setSda(loaded);
    setCurrentStep(10);
    setMaxStepReached(10);
  };

  const { theme } = useColorTheme();

  if (!userSession) {
    return <LandingPage onStartSession={handleStartSession} />;
  }

  return (
    <div id="sda-app-root" className={`min-h-screen ${theme.bodyBgClass} flex flex-col font-sans antialiased transition-colors duration-300`}>
      {/* Top Navbar */}
      <Navbar
        currentStep={currentStep}
        onNewSdA={handleNewSdA}
        savedSdas={savedSdas}
        onLoadSdA={handleLoadSdA}
        onDeleteSdA={handleDeleteSdA}
        userSession={userSession}
        onLogout={handleLogout}
      />

      {/* Stepper Progress Bar */}
      <StepProgress
        currentStep={currentStep}
        onSelectStep={goToStep}
        maxStepReached={maxStepReached}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentStep === 1 && (
          <Step1General
            titulo={sda.titulo}
            setTitulo={(v) => updateSda({ titulo: v })}
            curso={sda.curso}
            setCurso={(v) => {
              const newCiclo = getCicloFromCurso(v);
              updateSda({ curso: v, ciclo: newCiclo });
            }}
            trimestre={sda.trimestre}
            setTrimestre={(v) => updateSda({ trimestre: v })}
            numSesiones={sda.numSesiones}
            setNumSesiones={(v) => updateSda({ numSesiones: v })}
            tematica={sda.tematica}
            setTematica={(v) => updateSda({ tematica: v })}
            justificacion={sda.justificacion}
            setJustificacion={(v) => updateSda({ justificacion: v })}
            onNext={handleNext}
            userEmail={userSession?.email}
          />
        )}

        {currentStep === 2 && (
          <Step2Curriculum
            ciclo={sda.ciclo}
            tematica={sda.tematica}
            competenciasSeleccionadas={sda.competenciasSeleccionadas}
            setCompetenciasSeleccionadas={(v) => updateSda({ competenciasSeleccionadas: v })}
            criteriosSeleccionados={sda.criteriosSeleccionados}
            setCriteriosSeleccionados={(v) => updateSda({ criteriosSeleccionados: v })}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 3 && (
          <Step3Saberes
            ciclo={sda.ciclo}
            saberesSeleccionados={sda.saberesSeleccionados}
            setSaberesSeleccionados={(v) => updateSda({ saberesSeleccionados: v })}
            odsSeleccionados={sda.odsSeleccionados}
            setOdsSeleccionados={(v) => updateSda({ odsSeleccionados: v })}
            descriptoresOperativos={sda.descriptoresOperativos}
            setDescriptoresOperativos={(v) => updateSda({ descriptoresOperativos: v })}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 4 && (
          <Step4Methodology
            metodologiaActiva={sda.metodologiaActiva}
            setMetodologiaActiva={(v) => updateSda({ metodologiaActiva: v })}
            modeloEstructura={sda.modeloEstructura}
            setModeloEstructura={(v) => updateSda({ modeloEstructura: v })}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 5 && (
          <Step5Sessions
            numSesiones={sda.numSesiones}
            curso={sda.curso}
            ciclo={sda.ciclo}
            tematica={sda.tematica}
            modeloEstructura={sda.modeloEstructura}
            criteriosSeleccionados={sda.criteriosSeleccionados}
            sesiones={sda.sesiones}
            setSesiones={(v) => updateSda({ sesiones: v })}
            driveFolderId={sda.driveFolderId}
            setDriveFolderId={(v) => updateSda({ driveFolderId: v })}
            driveDocumentationText={sda.driveDocumentationText}
            setDriveDocumentationText={(v) => updateSda({ driveDocumentationText: v })}
            porcentajeDrive={sda.porcentajeDrive}
            setPorcentajeDrive={(v) => updateSda({ porcentajeDrive: v })}
            porcentajeBancoJuegos={sda.porcentajeBancoJuegos}
            setPorcentajeBancoJuegos={(v) => updateSda({ porcentajeBancoJuegos: v })}
            porcentajeIA={sda.porcentajeIA}
            setPorcentajeIA={(v) => updateSda({ porcentajeIA: v })}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 6 && (
          <Step6FinalChallenge
            tituloSdA={sda.titulo}
            curso={sda.curso}
            tematica={sda.tematica}
            metodologiaActiva={sda.metodologiaActiva}
            productoFinal={sda.productoFinal}
            setProductoFinal={(v) => updateSda({ productoFinal: v })}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 7 && (
          <Step7Diversity
            neaeSeleccionadas={sda.neaeSeleccionadas}
            setNeaeSeleccionadas={(v) => updateSda({ neaeSeleccionadas: v })}
            pautasDUA={sda.pautasDUAGlobales}
            setPautasDUA={(v) => updateSda({ pautasDUAGlobales: v })}
            adaptacionesNEAE={sda.adaptacionesNEAE}
            setAdaptacionesNEAE={(v) => updateSda({ adaptacionesNEAE: v })}
            sdaContext={{
              titulo: sda.titulo,
              curso: sda.curso,
              tematica: sda.tematica,
              productoFinal: sda.productoFinal,
            }}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 8 && (
          <Step8Evaluation
            evaluacionInicial={sda.evaluacionInicial}
            setEvaluacionInicial={(v) => updateSda({ evaluacionInicial: v })}
            instrumentosSeleccionados={sda.instrumentosSeleccionados}
            setInstrumentosSeleccionados={(v) => updateSda({ instrumentosSeleccionados: v })}
            instrumentosEvaluacion={sda.instrumentosEvaluacion}
            setInstrumentosEvaluacion={(v) => updateSda({ instrumentosEvaluacion: v })}
            criteriosSeleccionados={sda.criteriosSeleccionados}
            tematica={sda.tematica}
            curso={sda.curso}
            rubrica={sda.rubrica}
            setRubrica={(v) => updateSda({ rubrica: v })}
            sesiones={sda.sesiones}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 9 && (
          <Step9Resources
            recursosEspaciales={sda.recursosEspaciales}
            setRecursosEspaciales={(v) => updateSda({ recursosEspaciales: v })}
            recursosMateriales={sda.recursosMateriales}
            setRecursosMateriales={(v) => updateSda({ recursosMateriales: v })}
            recursosExternos={sda.recursosExternos}
            setRecursosExternos={(v) => updateSda({ recursosExternos: v })}
            recursosCurriculares={sda.recursosCurriculares}
            setRecursosCurriculares={(v) => updateSda({ recursosCurriculares: v })}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 10 && (
          <Step10Export sda={sda} onSaveSdA={handleSaveSdA} onPrev={handlePrev} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>
            Crea-Ef LOMLOE • Basado en Decreto 101/2023 y Orden 30 de mayo de 2023.
          </span>
          <span className="font-semibold text-indigo-700">
            Diseñado para docentes de Educación Física en Andalucía
          </span>
        </div>
      </footer>
    </div>
  );
}
