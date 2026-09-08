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
import { CookieBanner } from './components/CookieBanner';
import { SituacionAprendizaje, Curso, Trimestre, TematicaEF, Ciclo, ModeloEstructuraSesion, ComunidadAutonoma } from './types';
import { getCicloFromCurso, getEtapaFromCurso, generarRubricaPorDefecto } from './utils/sdaGenerator';
import { logoutGoogle, db } from './lib/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { useColorTheme } from './utils/theme';

const INITIAL_SDA_STATE: SituacionAprendizaje = {
  id: 'sda-' + Date.now(),
  fechaCreacion: new Date().toLocaleDateString('es-ES'),
  comunidad: 'Andalucía',
  etapa: 'Primaria',
  titulo: '',
  curso: '1º Primaria',
  ciclo: 'Primer Ciclo',
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
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('sda_active_user_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

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
    
    const loadSdAs = async () => {
      if (email) {
        localStorage.setItem('current_user_email', email);
        
        // 1. Intentar cargar desde Firestore (cliente)
        try {
          const sdasRef = collection(db, 'users', email, 'user_sdas');
          const snap = await getDocs(sdasRef);
          const sdasList = snap.docs.map(d => d.data() as SituacionAprendizaje);
          
          if (sdasList.length > 0) {
            setSavedSdas(sdasList);
            try {
              localStorage.setItem(`sda_ef_andalucia_list_${email}`, JSON.stringify(sdasList));
              localStorage.setItem('sda_ef_andalucia_list_local', JSON.stringify(sdasList));
            } catch (e) {}
            return;
          }
        } catch (error) {
          console.warn('Could not load SdAs from client Firestore, trying server fallback:', error);
        }

        // 2. Intentar cargar mediante endpoint seguro del servidor
        try {
          const resp = await fetch(`/api/user/sdas?email=${encodeURIComponent(email)}`);
          if (resp.ok) {
            const data = await resp.json();
            if (Array.isArray(data.sdas) && data.sdas.length > 0) {
              setSavedSdas(data.sdas);
              try {
                localStorage.setItem(`sda_ef_andalucia_list_${email}`, JSON.stringify(data.sdas));
                localStorage.setItem('sda_ef_andalucia_list_local', JSON.stringify(data.sdas));
              } catch (e) {}
              return;
            }
          }
        } catch (backendErr) {
          console.warn('Backend fetch sdas failed:', backendErr);
        }

        // 3. Fallback en localStorage por email
        try {
          const stored = localStorage.getItem(`sda_ef_andalucia_list_${email}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setSavedSdas(parsed);
              return;
            }
          }
        } catch (e) {}
      }

      // 4. Fallback en localStorage local general
      try {
        const storedLocal = localStorage.getItem('sda_ef_andalucia_list_local');
        if (storedLocal) {
          const parsedLocal = JSON.parse(storedLocal);
          if (Array.isArray(parsedLocal) && parsedLocal.length > 0) {
            setSavedSdas(parsedLocal);
            return;
          }
        }
      } catch (e) {}

      setSavedSdas([]);
    };
    
    loadSdAs();
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

    // Asegurar ID único si la SdA no tiene uno definido
    const sdaId = sda.id && sda.id.trim() !== '' ? sda.id : `sda_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const sdaToSave: SituacionAprendizaje = { ...sda, id: sdaId };
    if (sda.id !== sdaId) {
      setSda(sdaToSave);
    }

    const filtered = savedSdas.filter((s) => s.id !== sdaId);
    if (filtered.length >= maxAllowedSdas) {
      alert(`⚠️ Has alcanzado el límite máximo de ${maxAllowedSdas} Situaciones de Aprendizaje guardadas en tu perfil. Elimina alguna desde "Mis SdAs Guardadas" para guardar una nueva.`);
      return;
    }
    const updated = [sdaToSave, ...filtered].slice(0, maxAllowedSdas);
    setSavedSdas(updated);

    // 1. Guardar SIEMPRE en localStorage local para máxima rapidez y disponibilidad offline/online
    try {
      localStorage.setItem('sda_ef_andalucia_list_local', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving to local storage:', e);
    }

    const email = userSession?.email?.trim().toLowerCase();
    if (email) {
      try {
        localStorage.setItem(`sda_ef_andalucia_list_${email}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving to localStorage by email:', e);
      }
      
      // 2. Sanitizar profundamente para eliminar cualquier campo 'undefined' que Firestore rechaza
      const cleanSda = JSON.parse(JSON.stringify(sdaToSave));

      // 3. Guardar en la nube (Firestore del cliente)
      let savedCloud = false;
      try {
        const sdaDocRef = doc(db, 'users', email, 'user_sdas', sdaId);
        await setDoc(sdaDocRef, cleanSda, { merge: true });
        savedCloud = true;
      } catch (clientErr) {
        console.warn('Client Firestore save failed, attempting server API fallback:', clientErr);
      }

      // 4. Si el cliente de Firestore falló (por permisos, offline o red), sincronizar mediante el backend
      if (!savedCloud) {
        try {
          const resp = await fetch('/api/user/save-sda', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, sda: cleanSda }),
          });
          if (resp.ok) {
            savedCloud = true;
          } else {
            console.warn('Server API save returned non-ok status:', resp.status);
          }
        } catch (serverErr) {
          console.warn('Server API save failed:', serverErr);
        }
      }
    }
  };

  const handleDeleteSdA = async (idToDelete: string) => {
    const updated = savedSdas.filter((s) => s.id !== idToDelete);
    setSavedSdas(updated);
    try {
      localStorage.setItem('sda_ef_andalucia_list_local', JSON.stringify(updated));
    } catch (e) {}

    const email = userSession?.email?.trim().toLowerCase();
    if (email) {
      try {
        localStorage.setItem(`sda_ef_andalucia_list_${email}`, JSON.stringify(updated));
      } catch (e) {
        console.error('Error deleting from localStorage:', e);
      }
      
      let deletedCloud = false;
      try {
        const sdaDocRef = doc(db, 'users', email, 'user_sdas', idToDelete);
        await deleteDoc(sdaDocRef);
        deletedCloud = true;
      } catch (e) {
        console.warn('Could not delete SdA from client Firestore:', e);
      }

      if (!deletedCloud) {
        try {
          await fetch('/api/user/delete-sda', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, id: idToDelete }),
          });
        } catch (serverErr) {
          console.warn('Could not delete SdA from backend either:', serverErr);
        }
      }
    }
  };

  const handleLoadSdA = (loaded: SituacionAprendizaje) => {
    const safeLoaded: SituacionAprendizaje = {
      ...INITIAL_SDA_STATE,
      ...loaded,
      competenciasSeleccionadas: Array.isArray(loaded.competenciasSeleccionadas) ? loaded.competenciasSeleccionadas : [],
      criteriosSeleccionados: Array.isArray(loaded.criteriosSeleccionados) ? loaded.criteriosSeleccionados : [],
      saberesSeleccionados: Array.isArray(loaded.saberesSeleccionados) ? loaded.saberesSeleccionados : [],
      odsSeleccionados: Array.isArray(loaded.odsSeleccionados) ? loaded.odsSeleccionados : [],
      descriptoresOperativos: Array.isArray(loaded.descriptoresOperativos) ? loaded.descriptoresOperativos : [],
      sesiones: Array.isArray(loaded.sesiones) ? loaded.sesiones : [],
      neaeSeleccionadas: Array.isArray(loaded.neaeSeleccionadas) ? loaded.neaeSeleccionadas : [],
      adaptacionesNEAE: Array.isArray(loaded.adaptacionesNEAE) ? loaded.adaptacionesNEAE : [],
      pautasDUAGlobales: Array.isArray(loaded.pautasDUAGlobales) ? loaded.pautasDUAGlobales : [],
      instrumentosSeleccionados: Array.isArray(loaded.instrumentosSeleccionados) ? loaded.instrumentosSeleccionados : [],
      instrumentosEvaluacion: Array.isArray(loaded.instrumentosEvaluacion) ? loaded.instrumentosEvaluacion : [],
      rubrica: Array.isArray(loaded.rubrica) ? loaded.rubrica : [],
      recursosEspaciales: Array.isArray(loaded.recursosEspaciales) ? loaded.recursosEspaciales : [],
      recursosMateriales: Array.isArray(loaded.recursosMateriales) ? loaded.recursosMateriales : [],
      recursosCurriculares: Array.isArray(loaded.recursosCurriculares) ? loaded.recursosCurriculares : [],
      recursosExternos: Array.isArray(loaded.recursosExternos) ? loaded.recursosExternos : [],
    };
    setSda(safeLoaded);
    setCurrentStep(10);
    setMaxStepReached(10);
  };

  const { theme } = useColorTheme();

  if (!userSession) {
    return (
      <>
        <LandingPage onStartSession={handleStartSession} />
        <CookieBanner />
      </>
    );
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
            comunidad={sda.comunidad}
            setComunidad={(v) => updateSda({ comunidad: v })}
            etapa={sda.etapa}
            setEtapa={(v) => updateSda({ etapa: v })}
            titulo={sda.titulo}
            setTitulo={(v) => updateSda({ titulo: v })}
            curso={sda.curso}
            setCurso={(v) => {
              const newCiclo = getCicloFromCurso(v);
              const newEtapa = getEtapaFromCurso(v);
              const cicloChanged = newCiclo !== sda.ciclo;
              const cursoChanged = v !== sda.curso;
              if (cicloChanged || cursoChanged) {
                updateSda({
                  curso: v,
                  ciclo: newCiclo,
                  etapa: newEtapa,
                  competenciasSeleccionadas: [],
                  criteriosSeleccionados: [],
                  saberesSeleccionados: []
                });
              } else {
                updateSda({ curso: v, ciclo: newCiclo, etapa: newEtapa });
              }
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
            comunidad={sda.comunidad}
            etapa={sda.etapa}
            curso={sda.curso}
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
            comunidad={sda.comunidad}
            etapa={sda.etapa}
            curso={sda.curso}
            ciclo={sda.ciclo}
            competenciasSeleccionadas={sda.competenciasSeleccionadas}
            criteriosSeleccionados={sda.criteriosSeleccionados}
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
            sesiones={sda.sesiones}
            comunidad={sda.comunidad}
            etapa={sda.etapa}
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
              etapa: sda.etapa,
            }}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 8 && (
          <Step8Evaluation
            comunidad={sda.comunidad}
            evaluacionInicial={sda.evaluacionInicial || ''}
            setEvaluacionInicial={(v) => updateSda({ evaluacionInicial: v })}
            instrumentosSeleccionados={sda.instrumentosSeleccionados}
            setInstrumentosSeleccionados={(v) => updateSda({ instrumentosSeleccionados: v })}
            instrumentosEvaluacion={sda.instrumentosEvaluacion}
            setInstrumentosEvaluacion={(v) => updateSda({ instrumentosEvaluacion: v })}
            criteriosSeleccionados={sda.criteriosSeleccionados}
            tematica={sda.tematica}
            curso={sda.curso}
            etapa={sda.etapa}
            rubrica={sda.rubrica}
            setRubrica={(v) => updateSda({ rubrica: v })}
            sesiones={sda.sesiones}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 9 && (
          <Step9Resources
            curso={sda.curso}
            ciclo={sda.ciclo}
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
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="font-bold text-slate-800">
              Crea-Ef LOMLOE • Basado en la normativa vigente de cada comunidad autónoma.
            </p>
            <p className="mt-1">
              Diseñado para docentes de Educación Física
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-slate-500 font-medium mt-1">
            <a href="https://crea-ef.es/aviso-legal.html" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Aviso Legal</a>
            <a href="https://crea-ef.es/terminos-y-condiciones.html" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Términos y condiciones</a>
            <a href="https://crea-ef.es/privacidad.html" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Política de Privacidad</a>
            <a href="https://crea-ef.es/cookies.html" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Política de Cookies</a>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
