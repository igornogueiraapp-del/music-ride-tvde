importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBpWrfH5nECbZQifP0EYXw2d8m31ChfsZo",
  authDomain: "ridetune-2cecc.firebaseapp.com",
  projectId: "ridetune-2cecc",
  storageBucket: "ridetune-2cecc.firebasestorage.app",
  messagingSenderId: "731412434399",
  appId: "1:731412434399:web:92bf1bd7a4fef516f1486a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification?.title || "🎵 Nova solicitação no RideTune",
    {
      body:
        payload.notification?.body ||
        "Um passageiro acabou de pedir uma música.",
      icon: "/logo.png"
    }
  );
});
