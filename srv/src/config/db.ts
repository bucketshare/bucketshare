import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

import { config } from "dotenv";
config();

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.GOOGLE_PROJECTID,
            clientEmail: process.env.GOOGLE_CLIENTEMAIL,
            privateKey: process.env.GOOGLE_PRIVATEKEY?.replace(/\\n/g, "\n"),
        } as ServiceAccount),
    });
}

const db = admin.firestore();

export { db };
