import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_APIKEY!,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTHDOMAIN!,
    projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECTID!,
    storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGEBUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSAGINGSENDERID!,
    appId: process.env.NEXT_PUBLIC_GOOGLE_APPID!,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = getMessaging(app);
const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY!

export { messaging, onMessage, getToken, vapidKey };