const publicVapidKey = 'BCRndj3xy22bI2uTzqXcUXDYretU47YZ84gPxctPQh258wgo6E-LNs54mXpYWLwxrTG53MiPk6ad3hdvqy48Qoc';

// Check for service worker
if ('serviceWorker' in navigator) {
    registerServiceWorkerAndSubscribe().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function registerServiceWorkerAndSubscribe() {
    // Register Service Worker
    console.log('Registering service worker...');
    const registration = await navigator.serviceWorker.register('/pwa-nda/worker.js', {
        scope: '/pwa-nda/'
    });

    console.log('Service Worker Registered...');

    // Wait for the service worker to be ready
    const serviceWorkerReady = await navigator.serviceWorker.ready;

    // Register Push
    console.log("Registering Push...");
    const subscription = await serviceWorkerReady.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered...");

    // Send Push Notification
    console.log("Sending Push...");
    await fetch("/pwa-nda/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
    console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
