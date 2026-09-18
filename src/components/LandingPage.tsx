import React, { useState, useEffect } from 'react';
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
  Crown,
  Zap,
  Check,
  Flame,
  Clock,
  RotateCw,
  Eye,
  EyeOff,
} from 'lucide-react';
import { CreaEfLogo } from './CreaEfLogo';
import { ThemeSelectorModal } from './ThemeSelectorModal';
import { useColorTheme } from '../utils/theme';
import { db, analytics } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { getDeviceFingerprint } from '../utils/fingerprint';

export type PlanType = 'mensual' | 'anual' | 'fundador';

export interface PlanConfig {
  id: PlanType;
  name: string;
  subtitle: string;
  priceDisplay: string;
  periodDisplay: string;
  taxNote: string;
  pill1?: string;
  pill2?: string;
  badge?: string;
  badgeColor?: string;
  features: string[];
  footerNote: string;
  stripeUrl: string;
}

export const STRIPE_LINKS: Record<PlanType, string> = {
  mensual: 'https://buy.stripe.com/dRm14mcs7gmd6TW5tW3Nm00',
  anual: 'https://buy.stripe.com/7sYaEWbo3ee5a685tW3Nm01',
  fundador: 'https://buy.stripe.com/bJe28qcs7gmd4LO1dG3Nm02',
};

export const PLANS: PlanConfig[] = [
  {
    id: 'mensual',
    name: 'Mensual',
    subtitle: 'Puedes probar un mes y seguir suscrito el tiempo que lo desees.',
    priceDisplay: '13 €',
    periodDisplay: 'al mes',
    taxNote: 'Impuestos incluidos',
    features: [
      'Creación de SdA ilimitadas durante un mes',
      '8 SdA guardadas en tu usuario',
      'Descarga en PDF y Documento de texto editable',
    ],
    footerNote: 'Se renueva cada mes a no ser que lo canceles antes del pago.',
    stripeUrl: STRIPE_LINKS.mensual,
  },
  {
    id: 'anual',
    name: 'Anual',
    subtitle: 'Disfruta todo el año de Crea-Ef',
    priceDisplay: '75 €',
    periodDisplay: 'al año',
    taxNote: 'Impuestos incluidos',
    pill1: '6,25 € al mes',
    pill2: 'Ahorras 81 € al año',
    badge: 'RECOMENDADO',
    badgeColor: 'bg-blue-600 text-white shadow-lg shadow-blue-500/30',
    features: [
      'Creación de SdA ilimitadas durante un año',
      '8 SdA guardadas en tu usuario',
      'Descarga en PDF y Documento de texto editable',
    ],
    footerNote: 'Se renueva cada año a no ser que lo canceles antes del pago.',
    stripeUrl: STRIPE_LINKS.anual,
  },
  {
    id: 'fundador',
    name: 'Suscripción Fundador Crea-Ef',
    subtitle: 'Disfruta como fundador cada año de Crea-Ef al mismo precio',
    priceDisplay: '59 €',
    periodDisplay: 'al año',
    taxNote: 'Impuestos incluidos',
    pill1: '4,92 € al mes',
    pill2: 'Ahorras 97 € al año',
    badge: 'SÓLO LOS 30 PRIMEROS',
    badgeColor: 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black',
    features: [
      'Creación de SdA ilimitadas durante un año',
      '8 SdA guardadas en tu usuario',
      'Descarga en PDF y Documento de texto editable',
      'Precio Fundador para siempre',
    ],
    footerNote: 'Se renueva cada año a no ser que lo canceles antes del pago.',
    stripeUrl: STRIPE_LINKS.fundador,
  },
];

export interface UserSession {
  type: 'trial' | 'user' | 'admin';
  email: string;
  estadoPago?: 'Pendiente' | 'Pagado' | 'Caducado';
  plan?: PlanType;
  currentPeriodEnd?: string | null;
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
  const [trialLoading, setTrialLoading] = useState(false);

  // Via 2: User / Stripe State & Plans
  const [isRegister, setIsRegister] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('fundador');
  const [founderStats, setFounderStats] = useState({
    totalFundadores: 0,
    maxFundadores: 30,
    plazasRestantes: 30,
    agotado: false,
  });
  const [userNombre, setUserNombre] = useState('');
  const [userApellidos, setUserApellidos] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const [stripeCheckoutUrl, setStripeCheckoutUrl] = useState('');
  const [currentUserPending, setCurrentUserPending] = useState<string | null>(null);
  const [selectedPendingPlan, setSelectedPendingPlan] = useState<PlanType>('fundador');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [expiredNotice, setExpiredNotice] = useState<string | null>(null);

  // Via 3: Admin / Developer State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Detect URL Params for direct landing / preselection (Opción 1)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const shouldRegister =
        params.get('registro') === 'true' ||
        params.get('action') === 'register' ||
        params.get('alta') === 'true';
      const planParam = (params.get('plan') || '').toLowerCase();

      if (shouldRegister || planParam) {
        setActiveTab('user');
        setIsRegister(true);
        if (planParam === 'mensual' || planParam === 'anual' || planParam === 'fundador') {
          setSelectedPlan(planParam as PlanType);
        }
      }
    } catch (e) {
      console.warn('Error parsing URL parameters:', e);
    }
  }, []);

  // Fetch Founder Stats on Mount & on Tab Change
  useEffect(() => {
    const fetchFounderStats = async () => {
      try {
        const res = await fetch('/api/auth/founder-stats');
        if (res.ok) {
          const data = await res.json();
          setFounderStats(data);
          if (data.agotado && selectedPlan === 'fundador') {
            setSelectedPlan('anual');
          }
        }
      } catch (err) {
        console.warn('Could not fetch founder stats:', err);
      }
    };
    fetchFounderStats();
  }, [activeTab]);

  // Local storage checks for quick client fallback
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

  // Handle Trial Submission (Vía 1 con Huella Digital anti-incógnito)
  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrialError(null);
    setTrialLoading(true);

    const cleanEmail = trialEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setTrialError('Por favor, introduce un correo electrónico válido.');
      setTrialLoading(false);
      return;
    }

    try {
      // 1. Obtener huella digital determinista de hardware/canvas (idéntica en incógnito)
      const deviceId = await getDeviceFingerprint();
      const localCount = getDeviceTrialCount();

      // 2. Validación en backend respaldada por Firestore
      const res = await fetch('/api/auth/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          deviceId,
          deviceCount: localCount,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.blocked) {
        setTrialError(
          data.message ||
            'Has alcanzado el límite máximo de 3 SdAs de prueba en este dispositivo. Te invitamos a suscribirte en la Vía 2.'
        );
        setTrialLoading(false);
        return;
      }

      // Guardar estado local
      localStorage.setItem('trial_device_email', cleanEmail);
      localStorage.setItem('trial_device_id', deviceId);
      localStorage.setItem('trial_device_count', String(data.generacionesUsadas || localCount));

      if (analytics) {
        logEvent(analytics, 'trial_started', { email: cleanEmail });
      }

      onStartSession({
        type: 'trial',
        email: cleanEmail,
        generacionesUsadas: data.generacionesUsadas || localCount,
        generacionesRestantes: data.generacionesRestantes || Math.max(0, 3 - localCount),
      });
    } catch (err) {
      console.error('Error submitting trial session:', err);
      // Fallback local seguro
      const localCount = getDeviceTrialCount();
      if (localCount >= 3) {
        setTrialError('Límite de prueba alcanzado en este dispositivo (3/3). Registrate para continuar.');
        setTrialLoading(false);
        return;
      }
      onStartSession({
        type: 'trial',
        email: cleanEmail,
        generacionesUsadas: localCount,
        generacionesRestantes: Math.max(0, 3 - localCount),
      });
    } finally {
      setTrialLoading(false);
    }
  };

  // Handle User Registration & Login (Vía 2)
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError(null);
    setExpiredNotice(null);
    setUserLoading(true);

    const cleanEmail = userEmail.trim().toLowerCase();
    if (!cleanEmail || !userPassword) {
      setUserError('Por favor, introduce tu correo electrónico y contraseña.');
      setUserLoading(false);
      return;
    }

    if (isRegister && (!userNombre.trim() || !userApellidos.trim())) {
      setUserError('Por favor, completa tu nombre y apellidos.');
      setUserLoading(false);
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
          setUserLoading(false);
          return;
        }
      }

      if (isRegister) {
        // Validación de cupo Fundador
        if (selectedPlan === 'fundador' && founderStats.agotado) {
          setUserError('Lo sentimos, las 30 plazas del Plan Fundador ya han sido completadas. Por favor, selecciona el Plan Anual.');
          setSelectedPlan('anual');
          setUserLoading(false);
          return;
        }

        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserError('El correo ya se encuentra registrado. Por favor, inicia sesión con tu contraseña.');
          setUserLoading(false);
          return;
        }

        // Crear usuario con estado Pendiente y su plan seleccionado
        await setDoc(userRef, {
          email: cleanEmail,
          password: userPassword,
          nombre: userNombre.trim(),
          apellidos: userApellidos.trim(),
          plan: selectedPlan,
          estadoPago: 'Pendiente',
          createdAt: new Date().toISOString(),
        });

        if (analytics) {
          logEvent(analytics, 'register_attempt', { email: cleanEmail, plan: selectedPlan });
        }

        // Preparar pasarela Stripe correspondiente
        const baseUrl = STRIPE_LINKS[selectedPlan] || STRIPE_LINKS.mensual;
        const checkoutUrl = `${baseUrl}?prefilled_email=${encodeURIComponent(cleanEmail)}`;

        setCurrentUserPending(cleanEmail);
        setSelectedPendingPlan(selectedPlan);
        setStripeCheckoutUrl(checkoutUrl);
        setPaymentSuccess(false);
        setShowStripeCheckout(true);

        // Abrir pestaña de Stripe
        window.open(checkoutUrl, '_blank');
      } else {
        // Modo Inicio de Sesión
        if (analytics) {
          logEvent(analytics, 'login_attempt', { email: cleanEmail });
        }

        const userSnap = await getDoc(userRef);
        if (!userSnap.exists() || userSnap.data().password !== userPassword) {
          setUserError('Credenciales incorrectas o cuenta no registrada.');
          setUserLoading(false);
          return;
        }

        const data = userSnap.data();
        const userPlan: PlanType = data.plan || 'mensual';

        // Comprobación de ciclo de vida / expiración
        let effectiveEstado = data.estadoPago || 'Pendiente';
        if (effectiveEstado === 'Pagado' && data.currentPeriodEnd) {
          const periodEnd = new Date(data.currentPeriodEnd).getTime();
          if (Date.now() > periodEnd) {
            effectiveEstado = 'Caducado';
            await setDoc(userRef, { estadoPago: 'Caducado' }, { merge: true });
          }
        }

        if (effectiveEstado === 'Pendiente' || effectiveEstado === 'Caducado') {
          setCurrentUserPending(cleanEmail);
          setSelectedPendingPlan(userPlan);
          const baseUrl = STRIPE_LINKS[userPlan] || STRIPE_LINKS.mensual;
          setStripeCheckoutUrl(`${baseUrl}?prefilled_email=${encodeURIComponent(cleanEmail)}`);
          setPaymentSuccess(false);
          setExpiredNotice(
            effectiveEstado === 'Caducado'
              ? 'Tu suscripción ha completado su periodo y se encuentra vencida. Por favor, renueva tu suscripción para continuar con acceso ilimitado.'
              : 'Tu cuenta está registrada pero aún no se ha confirmado el pago. Puedes completar el pago ahora en Stripe.'
          );
          setShowStripeCheckout(true);
        } else {
          onStartSession({
            type: 'user',
            email: cleanEmail,
            estadoPago: 'Pagado',
            plan: userPlan,
            currentPeriodEnd: data.currentPeriodEnd || null,
          });
        }
      }
    } catch (err) {
      setUserError('Error conectando con la base de datos.');
      console.error(err);
    } finally {
      setUserLoading(false);
    }
  };

  // Función para simular pago completado en entorno de desarrollo
  const handleSimulatePaymentLocal = async () => {
    if (!currentUserPending) return;
    try {
      const res = await fetch('/api/dev/simulate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUserPending,
          plan: selectedPendingPlan,
        }),
      });
      if (res.ok) {
        setPaymentSuccess(true);
        setExpiredNotice(null);
      }
    } catch (e) {
      console.error('Error simulando pago local:', e);
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
                  LOMLOE Autonómica
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
              Prueba gratuita (máx. 3 SdAs) con protección por huella de dispositivo y correo.
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
              <div className="flex items-center space-x-1">
                <Crown className="w-4 h-4 text-amber-400" />
                <CreditCard className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <h3 className="font-extrabold text-base text-white">Registro y Suscripción</h3>
            <p className="text-xs text-slate-400 mt-1">
              3 planes disponibles (Mensual, Anual y Fundador). Acceso ilimitado.
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
              Acceso restringido para administradores y testers autorizados.
            </p>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className={`w-full ${activeTab === 'user' && isRegister ? 'max-w-4xl' : 'max-w-xl'} bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative transition-all duration-300`}>
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
                    Control por huella digital única de computadora y cuenta de correo
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Límite estricto:</strong> Puedes generar hasta <strong>3 Situaciones de Aprendizaje</strong> de prueba por computadora. El sistema detecta este dispositivo incluso en modo incógnito. Al consumir las 3 SdAs, se requiere suscripción.
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
                        className="inline-flex items-center space-x-1 font-extrabold text-amber-300 hover:text-amber-200 underline text-xs cursor-pointer"
                      >
                        <span>Ir a Registro y Suscripción (Vía 2)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={trialLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {trialLoading ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Verificando dispositivo...</span>
                    </>
                  ) : (
                    <>
                      <span>Comenzar periodo de prueba</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {isRegister ? 'Registro de Nueva Cuenta' : 'Iniciar Sesión'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isRegister ? 'Elige tu plan y completa tus datos de acceso' : 'Ingresa con tu correo y contraseña registrados'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setUserError(null);
                    setExpiredNotice(null);
                  }}
                  className="text-xs text-indigo-300 font-bold hover:text-white bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 px-3 py-1.5 rounded-xl transition self-start sm:self-auto cursor-pointer"
                >
                  {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Crear cuenta nueva'}
                </button>
              </div>

              {/* Selector de Planes (Visible en Registro) */}
              {isRegister && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                      1. Elige tu Modalidad de Suscripción:
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Pasarela oficial y segura vía Stripe
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
                    {PLANS.map((plan) => {
                      const isSelected = selectedPlan === plan.id;
                      const isFounder = plan.id === 'fundador';
                      const isAnual = plan.id === 'anual';
                      const isAgotado = isFounder && founderStats.agotado;

                      return (
                        <div
                          key={plan.id}
                          onClick={() => {
                            if (!isAgotado) {
                              setSelectedPlan(plan.id);
                            }
                          }}
                          className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                            isAgotado
                              ? 'bg-slate-900/30 border-slate-800 opacity-60 cursor-not-allowed'
                              : isSelected
                              ? isFounder
                                ? 'bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-950 border-amber-400 shadow-2xl shadow-amber-500/15 ring-2 ring-amber-400/50 scale-[1.01]'
                                : isAnual
                                ? 'bg-gradient-to-b from-blue-500/15 via-slate-900 to-slate-950 border-blue-500 shadow-2xl shadow-blue-500/15 ring-2 ring-blue-500/50 scale-[1.01]'
                                : 'bg-gradient-to-b from-indigo-500/15 via-slate-900 to-slate-950 border-indigo-400 shadow-2xl shadow-indigo-500/15 ring-2 ring-indigo-400/50 scale-[1.01]'
                              : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {/* Badge Flotante Superior */}
                          <div className="min-h-[26px] mb-2 flex items-center justify-between">
                            {isAgotado ? (
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40">
                                Agotado (30/30)
                              </span>
                            ) : plan.badge ? (
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${plan.badgeColor || 'bg-blue-600 text-white border-blue-400'}`}>
                                {plan.badge}
                              </span>
                            ) : (
                              <span />
                            )}

                            {isSelected && !isAgotado && (
                              <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Seleccionado</span>
                              </span>
                            )}
                          </div>

                          {/* Encabezado: Título y Subtítulo */}
                          <div className="space-y-1 mb-4">
                            <div className="flex items-center space-x-1.5">
                              {isFounder && <Crown className="w-5 h-5 text-amber-400 shrink-0" />}
                              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                {plan.name}
                              </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400 leading-snug min-h-[36px]">
                              {plan.subtitle}
                            </p>
                          </div>

                          {/* Bloque de Precio Gigante */}
                          <div className="mb-4 pb-4 border-b border-slate-800/80">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                                {plan.priceDisplay}
                              </span>
                              <span className="text-sm sm:text-base font-bold text-slate-300">
                                {plan.periodDisplay}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 font-medium">
                              {plan.taxNote}
                            </p>

                            {/* Píldoras de Ahorro */}
                            {(plan.pill1 || plan.pill2) && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {plan.pill1 && (
                                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-extrabold">
                                    {plan.pill1}
                                  </span>
                                )}
                                {plan.pill2 && (
                                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                                    {plan.pill2}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Badge de Plazas para Fundador */}
                            {isFounder && !isAgotado && (
                              <div className="mt-3 px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center space-x-2">
                                <Flame className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                                <span className="text-xs font-black text-amber-300">
                                  ¡Quedan {founderStats.plazasRestantes} de {founderStats.maxFundadores} plazas!
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Lista de Características con Checks */}
                          <div className="space-y-2.5 mb-6 flex-1">
                            {plan.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-start space-x-2.5">
                                <div className="mt-0.5 p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                                <span className={`text-xs sm:text-sm leading-tight ${feature === 'Precio Fundador para siempre' ? 'font-black text-amber-300' : 'text-slate-200'}`}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Botón Suscribirme dentro de la tarjeta */}
                          <div className="space-y-2 pt-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isAgotado) {
                                  setSelectedPlan(plan.id);
                                }
                              }}
                              className={`w-full py-3 rounded-xl font-black text-sm transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer ${
                                isAgotado
                                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                  : isSelected
                                  ? isFounder
                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-110'
                                    : isAnual
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                              }`}
                            >
                              <span>{isSelected ? 'Plan Seleccionado' : 'Suscribirme'}</span>
                              {isSelected && <ArrowRight className="w-4 h-4" />}
                            </button>

                            {/* Nota de Renovación al pie */}
                            <p className="text-[11px] text-slate-400 text-center leading-tight">
                              {plan.footerNote}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <form onSubmit={handleUserSubmit} className="space-y-4">
                {isRegister && (
                  <div className="border-t border-slate-800/80 pt-4">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-3">
                      2. Datos del Docente:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
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
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
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
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition cursor-pointer"
                      title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isRegister && (
                  <div className="flex items-start gap-2.5 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                    <input 
                      type="checkbox" 
                      required 
                      className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer" 
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
                  disabled={userLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-black text-sm rounded-xl transition shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {userLoading ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Procesando...</span>
                    </>
                  ) : isRegister ? (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>
                        Continuar al Pago Seguro con Stripe • {PLANS.find((p) => p.id === selectedPlan)?.priceDisplay}
                      </span>
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
                      type={showAdminPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition cursor-pointer"
                      title={showAdminPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      {showAdminPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
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
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Validar Credenciales Admin / Tester</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* STRIPE CHECKOUT MODAL & SIMULATION */}
      {showStripeCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowStripeCheckout(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">Pasarela de Pago Stripe</h3>
              <p className="text-xs text-slate-400">
                Plan seleccionado:{' '}
                <span className="text-indigo-300 font-extrabold">
                  {PLANS.find((p) => p.id === selectedPendingPlan)?.name || 'Suscripción Crea-EF'}
                </span>
              </p>
            </div>

            {expiredNotice && (
              <div className="p-3 bg-amber-950/70 border border-amber-500/40 rounded-2xl text-xs text-amber-200 flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>{expiredNotice}</p>
              </div>
            )}

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Importe a abonar:</span>
                <span className="font-black text-white text-base">
                  {PLANS.find((p) => p.id === selectedPendingPlan)?.priceDisplay}{' '}
                  <span className="text-xs text-slate-400 font-normal">
                    {PLANS.find((p) => p.id === selectedPendingPlan)?.periodDisplay}
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-slate-800/80 pt-2">
                <span className="text-slate-400">Usuario registrado:</span>
                <span className="font-mono text-indigo-300 text-xs truncate max-w-[200px]">
                  {currentUserPending}
                </span>
              </div>
            </div>

            {paymentSuccess ? (
              <div className="p-5 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="font-extrabold text-base text-white">¡Pago Confirmado Exitosamente!</p>
                <p className="text-xs text-emerald-300 leading-relaxed">
                  Tu suscripción ha quedado activa en el sistema. Ya puedes iniciar sesión con tu correo y contraseña para disfrutar de acceso ilimitado.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowStripeCheckout(false);
                    setIsRegister(false);
                    setUserEmail(currentUserPending || '');
                  }}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Iniciar Sesión Ahora
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <a
                  href={stripeCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm rounded-xl transition shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Abrir Pasarela de Pago Seguro Stripe</span>
                </a>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Una vez realizado el pago, Stripe notificará a la plataforma y tu suscripción quedará activa automáticamente.
                </p>

                {/* Simulador de Pago para Entorno Local / Desarrollo */}
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center space-y-2 mt-2">
                  <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                    Herramienta de Prueba Local
                  </div>
                  <button
                    type="button"
                    onClick={handleSimulatePaymentLocal}
                    className="w-full py-2 bg-slate-800 hover:bg-emerald-950/60 hover:text-emerald-300 hover:border-emerald-500/40 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Simular Pago Confirmado (Prueba Local)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowStripeCheckout(false)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-3">
          <p>Plataforma de Situaciones de Aprendizaje de EF • Adaptado a LOMLOE y Normativa Autonómica</p>
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
