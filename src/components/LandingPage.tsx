import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  UserCheck,
  CreditCard,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  X,
  Mail,
  UserPlus,
  LogIn,
  Palette,
} from 'lucide-react';
import { CreaEfLogo } from './CreaEfLogo';
import { ThemeSelectorModal } from './ThemeSelectorModal';
import { useColorTheme } from '../utils/theme';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserSession {
  type: 'trial' | 'user' | 'admin';
  email: string;
  estadoPago?: 'Pendiente' | 'Pagado';
  estadoAdmin?: 'Activo' | 'Inactivo';
  generacionesRestantes?: number;
  generacionesUsadas?: number;
}

interface LandingPageProps {
  onStartSession: (session: UserSession) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartSession }) => {
  const [activeTab, setActiveTab] = useState<'trial' | 'user' | 'admin'>('trial');

  // Via 1: Trial State
  const [trialEmail, setTrialEmail] = useState('');
  const [trialError, setTrialError] = useState<string | null>(null);

  // Via 2: User / Stripe State
  const [isRegister, setIsRegister] = useState(false);
  const [userNombre, setUserNombre] = useState('');
  const [userApellidos, setUserApellidos] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userError, setUserError] = useState<string | null>(null);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const [stripeCheckoutUrl, setStripeCheckoutUrl] = useState('');
  const [currentUserPending, setCurrentUserPending] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  // Via 3: Admin / Developer State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);

  // Local storage checks
  const getDeviceTrialCount = (): number => {
    try {
      const stored = localStorage.getItem('trial_device_count');
      return stored ? parseInt(stored, 10) : 0;
    } catch (e) {
      return 0;
    }
  };

  const getDeviceTrialEmail = (): string | null => {
    try {
      return localStorage.getItem('trial_device_email');
    } catch (e) {
      return null;
    }
  };

  // Handle Trial Submission
  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrialError(null);

    const cleanEmail = trialEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setTrialError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    // Front-end localStorage double check for device lock
    const deviceCount = getDeviceTrialCount();
    const storedDeviceEmail = getDeviceTrialEmail();

    if (deviceCount >= 3) {
      setTrialError(
        `Este dispositivo ya ha consumido el límite de 3 Situaciones de Aprendizaje de prueba. Por favor, regístrate en la Vía 2 para obtener acceso ilimitado.`
      );
      return;
    }

    if (storedDeviceEmail && storedDeviceEmail !== cleanEmail && deviceCount >= 3) {
      setTrialError(
        `Este dispositivo está bloqueado por haber alcanzado el límite de prueba con otra cuenta (${storedDeviceEmail}). Se requiere suscripción para continuar.`
      );
      return;
    }

    try {
      // Backend validation request
      const res = await fetch('/api/auth/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, deviceCount }),
      });

      const data = await res.json();
      if (!res.ok || data.blocked) {
        setTrialError(
          data.message ||
            'Has alcanzado el límite máximo de 3 SdAs de prueba con esta cuenta. Te invitamos a suscribirte en la Vía 2.'
        );
        return;
      }

      // Save device state
      localStorage.setItem('trial_device_email', cleanEmail);
      localStorage.setItem('trial_device_count', String(data.generacionesUsadas || deviceCount));

      onStartSession({
        type: 'trial',
        email: cleanEmail,
        generacionesUsadas: data.generacionesUsadas || deviceCount,
        generacionesRestantes: data.generacionesRestantes || Math.max(0, 3 - deviceCount),
      });
    } catch (err) {
      // Fallback local execution if offline or direct
      const updatedCount = deviceCount;
      if (updatedCount >= 3) {
        setTrialError(
          'Límite de prueba alcanzado en este dispositivo (3/3). Registrate para continuar.'
        );
        return;
      }
      localStorage.setItem('trial_device_email', cleanEmail);
      onStartSession({
        type: 'trial',
        email: cleanEmail,
        generacionesUsadas: updatedCount,
        generacionesRestantes: 3 - updatedCount,
      });
    }
  };

  // Handle User Registration & Login (Via 2)
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError(null);

    const cleanEmail = userEmail.trim().toLowerCase();
    if (!cleanEmail || !userPassword) {
      setUserError('Por favor, introduce tu correo electrónico y contraseña.');
      return;
    }

    if (isRegister && (!userNombre.trim() || !userApellidos.trim())) {
      setUserError('Por favor, completa tu nombre y apellidos.');
      return;
    }

    try {
      const userRef = doc(db, 'users', cleanEmail);
      const devRef = doc(db, 'devs', cleanEmail);
      
      const devSnap = await getDoc(devRef);
      if (devSnap.exists()) {
        const devData = devSnap.data();
        if (devData.estado === 'Inactivo') {
          setUserError('⛔ Acceso revocado. La cuenta de tester se encuentra inactiva o eliminada.');
          return;
        }
      }

      if (isRegister) {
        /*
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserError('El correo ya se encuentra registrado. Por favor, inicia sesión.');
          return;
        }
        
        await setDoc(userRef, {
          email: cleanEmail,
          password: userPassword,
          nombre: userNombre.trim(),
          apellidos: userApellidos.trim(),
          estadoPago: 'Pendiente'
        });

        const url = `https://buy.stripe.com/test_dRm4gyaoG0Ft8gV7iy8Vi01?prefilled_email=${encodeURIComponent(cleanEmail)}`;
        setCurrentUserPending(cleanEmail);
        setStripeCheckoutUrl(url);
        setShowStripeCheckout(true);
        window.open(url, '_blank');
        */
        setShowComingSoonModal(true);
        return;
      } else {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists() || userSnap.data().password !== userPassword) {
          setUserError('Credenciales de usuario incorrectas o cuenta no registrada.');
          return;
        }

        const data = userSnap.data();
        if (data.estadoPago === 'Pendiente') {
          setCurrentUserPending(cleanEmail);
          const url = `https://buy.stripe.com/test_dRm4gyaoG0Ft8gV7iy8Vi01?prefilled_email=${encodeURIComponent(cleanEmail)}`;
          setStripeCheckoutUrl(url);
          setShowStripeCheckout(true);
          window.open(url, '_blank');
        } else {
          onStartSession({
            type: 'user',
            email: cleanEmail,
            estadoPago: 'Pagado',
          });
        }
      }
    } catch (err) {
      setUserError('Error conectando con la base de datos.');
      console.error(err);
    }
  };



  // Handle Admin Submission (Via 3)
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);

    const cleanEmail = adminEmail.trim().toLowerCase();
    if (!cleanEmail || !adminPassword) {
      setAdminError('Introduce email y contraseña de administrador.');
      return;
    }

    try {
      const devRef = doc(db, 'devs', cleanEmail);
      const devSnap = await getDoc(devRef);

      if (!devSnap.exists() || devSnap.data().password !== adminPassword) {
        setAdminError('Acceso denegado.');
        return;
      }

      const data = devSnap.data();
      if (data.estado === 'Inactivo') {
        setAdminError('⛔ Acceso revocado. Tu cuenta de desarrollador se encuentra INACTIVA.');
        return;
      }

      onStartSession({
        type: 'admin',
        email: cleanEmail,
        estadoAdmin: 'Activo',
      });
    } catch (err) {
      setAdminError('Error al validar credenciales de administración.');
      console.error(err);
    }
  };


  const codeGsContent = '';

  const [showThemeModal, setShowThemeModal] = useState(false);
  const { theme } = useColorTheme();

  return (
    <div className={`min-h-screen ${theme.bodyBgClass} flex flex-col justify-between selection:bg-amber-400 selection:text-slate-900 font-sans transition-colors duration-300`}>
      {/* Top Banner Header */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 ${theme.headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5 rounded-2xl border border-slate-700 shadow-md shrink-0 flex items-center justify-center">
              <CreaEfLogo className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black tracking-tight leading-none">
                  <span className="text-orange-500">Crea-</span>
                  <span className="text-sky-400">Ef</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
                  LOMLOE Andalucía
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium leading-snug">
                Diseña y personaliza tus<br className="hidden sm:inline" /> Situaciones de Aprendizaje de EF
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero & Access System */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Centered App Brand & Logo */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-2xl">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <CreaEfLogo className="w-28 h-28 sm:w-36 sm:h-36" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight pt-1">
            <span className="text-orange-500 drop-shadow-sm">Crea-</span>
            <span className="text-sky-400 drop-shadow-sm">Ef</span>
          </h1>
          <p className="text-center text-base sm:text-xl text-slate-200 font-semibold max-w-lg leading-relaxed">
            Diseña y personaliza tus<br />
            Situaciones de Aprendizaje de EF
          </p>
        </div>

        {/* Title and Intro */}
        <div className="text-center max-w-xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema de Control de Acceso Integrado</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Selecciona tu vía de acceso
          </h2>
        </div>

        {/* Access Method Tabs */}
        <div className="w-full max-w-4xl bg-slate-950/90 rounded-3xl p-2 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab('trial')}
            className={`p-4 rounded-2xl flex flex-col items-start text-left transition-all relative overflow-hidden ${
              activeTab === 'trial'
                ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-400/50 text-white shadow-lg shadow-amber-500/10'
                : 'bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Vía 1
              </span>
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-extrabold text-base text-white">Periodo de Prueba</h3>
            <p className="text-xs text-slate-400 mt-1">
              Prueba gratuita (máx. 3 SdAs) con doble validación Email + Dispositivo.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('user')}
            className={`p-4 rounded-2xl flex flex-col items-start text-left transition-all relative overflow-hidden ${
              activeTab === 'user'
                ? 'bg-gradient-to-br from-indigo-500/20 to-blue-500/10 border border-indigo-400/50 text-white shadow-lg shadow-indigo-500/10'
                : 'bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-indigo-400/20 text-indigo-300 border border-indigo-400/30">
                Vía 2
              </span>
              <CreditCard className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-extrabold text-base text-white">Iniciar Sesión / Registro</h3>
            <p className="text-xs text-slate-400 mt-1">
              Acceso ilimitado (Próximamente).
            </p>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`p-4 rounded-2xl flex flex-col items-start text-left transition-all relative overflow-hidden ${
              activeTab === 'admin'
                ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-400/50 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Vía 3
              </span>
              <KeyRound className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-extrabold text-base text-white">Admin / Desarrolladores</h3>
            <p className="text-xs text-slate-400 mt-1">
              Acceso restringido para administradores y testers con verificación de estado.
            </p>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          {/* VIA 1: TRIAL */}
          {activeTab === 'trial' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Acceso Gratuito de Prueba</h3>
                  <p className="text-xs text-slate-400">
                    Doble validación: Control por servidor (Email) y dispositivo (localStorage)
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Límite:</strong> Puedes generar un máximo de <strong>3 Situaciones de Aprendizaje</strong>. Al consumir la tercera SdA, la aplicación bloqueará automáticamente este dispositivo y te redirigirá a la suscripción.
                </p>
              </div>

              <form onSubmit={handleTrialSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    Correo electrónico básico:
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="profesor@crea-ef.es"
                      value={trialEmail}
                      onChange={(e) => setTrialEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>

                {trialError && (
                  <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-start space-x-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p>{trialError}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('user');
                          setIsRegister(true);
                        }}
                        className="inline-flex items-center space-x-1 font-extrabold text-amber-300 underline text-xs"
                      >
                        <span>Ir a Registro y Pago (Vía 2)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  <span>Comenzar periodo de prueba</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-4 flex justify-center">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScB2nJKkqH1RlsU84ihKveoPq5uy13E1uS4ENiJGNKwhiGuuA/viewform?usp=sharing&ouid=104396603938196011081"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex py-3 px-6 bg-sky-900/40 hover:bg-sky-800/60 border border-sky-500/50 text-sky-100 font-bold text-xs rounded-2xl transition shadow-lg flex-col items-center justify-center text-center space-y-1"
                >
                  <span className="text-sm font-black text-white">Necesito tu opinión</span>
                  <span className="text-sky-300 font-semibold">Cuéntame qué te parece 📝</span>
                </a>
              </div>
            </div>
          )}

          {/* VIA 2: REGISTER / LOGIN + STRIPE */}
          {activeTab === 'user' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {isRegister ? 'Registro de Usuario' : 'Iniciar Sesión'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isRegister ? 'Cuestionario de alta (Próximamente)' : 'Ingresa con tus credenciales guardadas'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setUserError(null);
                  }}
                  className="text-xs text-indigo-300 font-bold hover:text-white bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 px-3 py-1.5 rounded-xl transition"
                >
                  {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿Aún no estás registrado? Regístrate'}
                </button>
              </div>

              <form onSubmit={handleUserSubmit} className="space-y-4">
                {isRegister && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                        Nombre:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Tu nombre"
                        value={userNombre}
                        onChange={(e) => setUserNombre(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                        Apellidos:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Tus apellidos"
                        value={userApellidos}
                        onChange={(e) => setUserApellidos(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    Correo electrónico:
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="docente@crea-ef.es"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    Contraseña:
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 transition"
                    />
                  </div>
                </div>

                {isRegister && (
                  <div className="flex items-start gap-2.5 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                    <input 
                      type="checkbox" 
                      required 
                      className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" 
                    />
                    <label className="text-xs text-slate-300 leading-relaxed">
                      He leído y acepto los <a href="https://crea-ef.es/terminos-y-condiciones.html" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 hover:underline font-semibold">Términos y Condiciones</a> y la <a href="https://crea-ef.es/privacidad.html" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 hover:underline font-semibold">Política de Privacidad</a>.
                    </label>
                  </div>
                )}

                {userError && (
                  <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{userError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-black text-sm rounded-xl transition shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2"
                >
                  {isRegister ? (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Regístrame (Próximamente)</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Iniciar Sesión</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* VIA 3: ADMIN & DEVELOPERS */}
          {activeTab === 'admin' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Acceso Administradores / Testers</h3>
                  <p className="text-xs text-slate-400">
                    Acceso con credenciales autorizadas
                  </p>
                </div>
              </div>

              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    Email de Administrador / Tester:
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="Introduce tu correo de acceso..."
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                    Contraseña de Acceso:
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition"
                    />
                  </div>
                </div>

                {adminError && (
                  <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{adminError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Validar Credenciales Admin / Tester</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* STRIPE CHECKOUT MODAL SIMULATION */}
      {showStripeCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowStripeCheckout(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Pasarela de Pago Stripe</h3>
              <p className="text-xs text-slate-400">
                Estado de suscripción: <span className="text-amber-400 font-bold">Pendiente</span>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Pago Único por App Ilimitada Crea-Ef</span>
                <span className="font-extrabold text-amber-400 text-sm">(Próximamente)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Acceso completo e ilimitado para siempre a la herramienta de Situaciones de Aprendizaje de EF, Banco de Juegos, exportaciones y adaptaciones LOMLOE / DUA.
              </p>
            </div>

            {paymentSuccess ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-extrabold text-sm">¡Pago Confirmado por Stripe!</p>
                <p className="text-xs text-emerald-300">
                  Tu estado se ha actualizado a "Pagado". Puedes iniciar sesión con tu usuario y contraseña.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <a
                  href={stripeCheckoutUrl || `https://buy.stripe.com/test_dRm4gyaoG0Ft8gV7iy8Vi01?prefilled_email=${encodeURIComponent(currentUserPending || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-xl transition shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Abrir Pasarela de Pago Stripe</span>
                </a>
                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Una vez realizado el pago, Stripe notificará a la app y tu usuario quedará activo automáticamente para que puedas acceder con tus credenciales.
                </p>
                <button
                  type="button"
                  onClick={() => setShowStripeCheckout(false)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
                >
                  Volver al Inicio de Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMING SOON MODAL */}
      {showComingSoonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-2xl relative text-center">
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white">¡Próximamente!</h3>
            <p className="text-sm text-slate-400">
              El registro de nuevas cuentas estará disponible muy pronto. 
              Mientras tanto, puedes probar la app en el <strong>Periodo de Prueba</strong> (Vía 1).
            </p>
            <button
              type="button"
              onClick={() => {
                setShowComingSoonModal(false);
                setActiveTab('trial');
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition"
            >
              Ir al Periodo de Prueba
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-3">
          <p>Plataforma de Situaciones de Aprendizaje de EF Andalucía • Adaptado a LOMLOE & Instrucción 12/2022</p>
          <div className="flex flex-wrap justify-center gap-4 text-slate-400 font-medium">
            <a href="https://crea-ef.es/aviso-legal.html" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Aviso Legal</a>
            <a href="https://crea-ef.es/terminos-y-condiciones.html" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Términos y condiciones</a>
            <a href="https://crea-ef.es/privacidad.html" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Política de Privacidad</a>
            <a href="https://crea-ef.es/cookies.html" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Política de Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
