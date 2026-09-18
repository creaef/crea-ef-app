import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, '../firebase-applet-config.json');
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, '(default)');

const PROTECTED_EMAILS = new Set([
  'admin@crea-ef.es',
  'tester@crea-ef.es',
  'tester1@crea-ef.es',
  'tester2@crea-ef.es',
  'tester3@crea-ef.es',
  'tester4@crea-ef.es',
  'tester5@crea-ef.es',
  'tester6@crea-ef.es',
  'tester7@crea-ef.es',
  'tester8@crea-ef.es',
  'tester9@crea-ef.es',
  'tester10@crea-ef.es',
]);

async function cleanTestUsers() {
  console.log('Iniciando limpieza de usuarios de prueba en Firestore...');

  // 1. Limpiar colección 'users'
  const usersRef = collection(db, 'users');
  const userDocs = await getDocs(usersRef);
  let deletedUsers = 0;

  for (const docSnap of userDocs.docs) {
    const email = docSnap.id.toLowerCase();
    if (!PROTECTED_EMAILS.has(email)) {
      await deleteDoc(doc(db, 'users', docSnap.id));
      console.log(`- Usuario eliminado de 'users': ${email}`);
      deletedUsers++;
    }
  }

  // 2. Limpiar colección 'trial_users'
  const trialUsersRef = collection(db, 'trial_users');
  const trialUserDocs = await getDocs(trialUsersRef);
  let deletedTrialUsers = 0;

  for (const docSnap of trialUserDocs.docs) {
    const email = docSnap.id.toLowerCase();
    if (!PROTECTED_EMAILS.has(email)) {
      await deleteDoc(doc(db, 'trial_users', docSnap.id));
      console.log(`- Usuario eliminado de 'trial_users': ${email}`);
      deletedTrialUsers++;
    }
  }

  // 3. Limpiar colección 'trial_devices' de prueba
  const trialDevicesRef = collection(db, 'trial_devices');
  const deviceDocs = await getDocs(trialDevicesRef);
  let deletedDevices = 0;

  for (const docSnap of deviceDocs.docs) {
    const deviceId = docSnap.id;
    if (deviceId.includes('test') || deviceId.includes('unique_pc')) {
      await deleteDoc(doc(db, 'trial_devices', docSnap.id));
      console.log(`- Dispositivo de prueba eliminado de 'trial_devices': ${deviceId}`);
      deletedDevices++;
    }
  }

  console.log(`\nLimpieza completada con éxito:`);
  console.log(`• Usuarios eliminados: ${deletedUsers}`);
  console.log(`• Registros trial eliminados: ${deletedTrialUsers}`);
  console.log(`• Dispositivos de test eliminados: ${deletedDevices}`);
  console.log(`• Cuentas protegidas (Admin y Testers) conservadas intactas.`);
}

cleanTestUsers().catch(console.error);
