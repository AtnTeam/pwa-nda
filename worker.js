// console.log("Service Worker Loaded...");

// self.addEventListener("push", e => {
//     const data = e.data.json();
//     console.log("Push Recieved...");
//     self.registration.showNotification(data.title, {
//         body: "Notified by Traversy Media!",
//         icon: "http://image.ibb.co/frYOFd/tmlogo.png"
//     });
// });

// ==============

console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Received...");

    const options = {
        body: data.message || 'Default body',
        icon: data.icon || "http://image.ibb.co/frYOFd/tmlogo.png",
        badge: data.badge || "http://image.ibb.co/frYOFd/tmlogo.png"
    };

    e.waitUntil(
        self.registration.showNotification(data.title || 'Default title', options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});
