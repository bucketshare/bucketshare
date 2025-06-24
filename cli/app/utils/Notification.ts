import { getToken, messaging, vapidKey } from "./../config/messaging";

export const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey });
        console.log('FCM Token:', token);

        // Token an Backend senden, z.B. via fetch oder Axios
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/save-fcm-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

    } else {
        console.warn('Notification permission not granted');
    }
};
