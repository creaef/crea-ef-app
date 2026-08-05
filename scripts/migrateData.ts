import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse config from the json file directly
const configPath = path.resolve(__dirname, '../firebase-applet-config.json');
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

console.log('Inicializando Firebase con projectId:', firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, '(default)');

const runMigration = async () => {
  try {
    // 1. Migrate Users
    const usersPath = path.resolve(__dirname, '../auth_users.json');
    if (fs.existsSync(usersPath)) {
      console.log('Migrando usuarios...');
      const authData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
      
      const usersRef = collection(db, 'users');
      for (const user of authData.usersStore || []) {
        const userDoc = doc(usersRef, user.email);
        await setDoc(userDoc, {
          email: user.email,
          password: user.password,
          nombre: user.nombre || null,
          apellidos: user.apellidos || null,
          estadoPago: user.estadoPago || 'Pendiente'
        }, { merge: true });
        console.log(`Usuario migrado: ${user.email}`);
      }
      
      const devsRef = collection(db, 'devs');
      for (const dev of authData.devsStore || []) {
        const devDoc = doc(devsRef, dev.email);
        await setDoc(devDoc, {
          email: dev.email,
          password: dev.password,
          estado: dev.estado || 'Activo'
        }, { merge: true });
        console.log(`Dev migrado: ${dev.email}`);
      }
    } else {
      console.log('No se encontró auth_users.json, saltando migración de usuarios.');
    }

    // 2. Migrate SdAs
    const sdasPath = path.resolve(__dirname, '../user_sdas.json');
    if (fs.existsSync(sdasPath)) {
      console.log('Migrando SdAs...');
      const sdasData = JSON.parse(fs.readFileSync(sdasPath, 'utf-8'));
      
      for (const [email, sdasList] of Object.entries(sdasData)) {
        if (!Array.isArray(sdasList)) continue;
        console.log(`Migrando ${sdasList.length} SdAs para ${email}...`);
        
        for (const sda of sdasList) {
          if (!sda.id) continue;
          // Guardamos cada SdA como un documento independiente en la subcolección 'user_sdas' del usuario
          const sdaDocRef = doc(db, 'users', email, 'user_sdas', sda.id);
          await setDoc(sdaDocRef, sda, { merge: true });
        }
      }
    } else {
      console.log('No se encontró user_sdas.json, saltando migración de SdAs.');
    }

    console.log('¡Migración completada con éxito!');
    process.exit(0);
  } catch (error) {
    console.error('Error durante la migración:', error);
    process.exit(1);
  }
};

runMigration();
