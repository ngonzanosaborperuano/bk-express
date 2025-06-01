import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let initialized = false;

export async function initializeFirebase() {
    if (initialized) return;

    const serviceAccountPath = path.resolve('serviceAccountKey.json');
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('✅ Firebase Admin inicializado correctamente.');
    }

    initialized = true;
}
