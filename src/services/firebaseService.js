import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let initialized = false;

export async function initializeFirebase() {
    if (initialized) return;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Ruta absoluta al archivo YAML
    const swaggerPath = path.resolve(__dirname, '../../serviceAccountKey.json');
    const serviceAccountPath = path.resolve(swaggerPath);
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('✅ Firebase Admin inicializado correctamente.');
    }

    initialized = true;
}
