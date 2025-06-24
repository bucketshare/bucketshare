// Required for background notifications
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyB4ijoJi6fAMtDU4M3YV9NL5X1TSLFqVpQ",
    authDomain: "friendsbucket-296b9.firebaseapp.com",
    projectId: "friendsbucket-296b9",
    storageBucket: "friendsbucket-296b9.firebasestorage.app",
    messagingSenderId: "919134675148",
    appId: "1:919134675148:web:ef3e1e7199581f91a1e269"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
