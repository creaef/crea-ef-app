import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const CONSENT_KEY = 'creaef_cookie_consent';

  useEffect(() => {
    const currentConsent = localStorage.getItem(CONSENT_KEY);
    if (!currentConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setIsVisible(false);
    // updateAnalyticsConsent(true);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setIsVisible(false);
    // updateAnalyticsConsent(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[950px] bg-white text-slate-800 p-4 sm:p-5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)] z-[9990] flex flex-col md:flex-row items-center justify-between gap-5 font-sans animate-slideUpBanner"
      role="region" 
      aria-label="Gestión de Cookies"
    >
      <div className="text-[0.9rem] leading-relaxed text-slate-600">
        <strong className="text-slate-900">Uso de Cookies en Crea-Ef:</strong> Utilizamos cookies técnicas necesarias para el funcionamiento de la app, pagos seguros con Stripe y analítica para mejorar el servicio. Puedes consultar nuestra{' '}
        <a href="https://crea-ef.es/cookies.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Política de Cookies
        </a>.
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
        <button 
          onClick={handleAccept}
          className="bg-slate-900 text-white border-none py-2 px-4 rounded-lg text-[0.85rem] font-semibold cursor-pointer hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          Aceptar todas
        </button>
        <button 
          onClick={handleReject}
          className="bg-slate-100 text-slate-900 border border-slate-300 py-2 px-4 rounded-lg text-[0.85rem] font-semibold cursor-pointer hover:bg-slate-200 transition-colors w-full sm:w-auto"
        >
          Rechazar no esenciales
        </button>
      </div>
    </div>
  );
};
