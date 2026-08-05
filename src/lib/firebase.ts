import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

declare global {
  interface Window {
    google?: any;
  }
}

// Initialize Firebase App instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const requestDriveTokenViaGIS = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const clientId = firebaseConfig.oAuthClientId || '62631616198-vrjm6rud4oeah317qg70blvp5lquhvag.apps.googleusercontent.com';
    const scope = 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file';

    const triggerTokenClient = () => {
      try {
        if (window.google?.accounts?.oauth2) {
          const client = window.google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: scope,
            prompt: 'select_account',
            callback: (response: any) => {
              if (response.error) {
                reject(new Error(response.error_description || response.error));
              } else if (response.access_token) {
                resolve(response.access_token);
              } else {
                reject(new Error('No se recibió token de acceso de Google.'));
              }
            },
            error_callback: (err: any) => {
              reject(new Error(err?.message || 'Error al solicitar token de Google.'));
            }
          });
          client.requestAccessToken();
        } else {
          reject(new Error('Google Identity Services no está listo.'));
        }
      } catch (err: any) {
        reject(err);
      }
    };

    if (window.google?.accounts?.oauth2) {
      triggerTokenClient();
    } else {
      const existingScript = document.getElementById('google-gis-script') as HTMLScriptElement | null;
      if (existingScript) {
        existingScript.addEventListener('load', triggerTokenClient);
        if (window.google?.accounts?.oauth2) {
          triggerTokenClient();
        }
        return;
      }
      const script = document.createElement('script');
      script.id = 'google-gis-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => triggerTokenClient();
      script.onerror = () => reject(new Error('No se pudo cargar el script de autenticación de Google.'));
      document.head.appendChild(script);
    }
  });
};

export const loginWithGoogleDrive = async (): Promise<{ user: User | null; token: string }> => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/drive.readonly');
  provider.addScope('https://www.googleapis.com/auth/drive.file');
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google Drive.');
    }

    return { user: result.user, token: credential.accessToken };
  } catch (err: any) {
    if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
      const friendlyErr = new Error('La ventana de inicio de sesión se cerró antes de completar el acceso a Google Drive. Por favor, inténtalo de nuevo.');
      (friendlyErr as any).code = err.code;
      throw friendlyErr;
    }

    console.warn('Firebase login failed, trying direct Google Identity Services (GIS) fallback...', err);
    try {
      const gisToken = await requestDriveTokenViaGIS();
      return { user: auth.currentUser, token: gisToken };
    } catch (gisErr: any) {
      console.error('GIS fallback error:', gisErr);
      if (err?.code === 'auth/network-request-failed') {
        const customErr = new Error('El navegador o el marco incrustado bloqueó la red de autenticación de Firebase (auth/network-request-failed). Por favor reintenta o abre la aplicación en una nueva pestaña.');
        (customErr as any).code = 'auth/network-request-failed';
        throw customErr;
      }
      throw err;
    }
  }
};

export const logoutGoogle = async () => {
  await signOut(auth);
};
