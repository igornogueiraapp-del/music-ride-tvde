import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpWrfH5nECbZQifP0EYXw2d8m31ChfsZo",
  authDomain: "ridetune-2cecc.firebaseapp.com",
  projectId: "ridetune-2cecc",
  storageBucket: "ridetune-2cecc.firebasestorage.app",
  messagingSenderId: "731412434399",
  appId: "1:731412434399:web:92bf1bd7a4fef516f1486a"
};

const VAPID_KEY =
  "BMfQjIQxxpY2zzagi3N2aKSRl0R1PN9aAjh96f2nPYHGoaUDDjKYUUtTwX8KyE56Va2vQEL34KA7U1g8fuPbUaA";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

const botao = document.getElementById("ativarNotificacoes");

if (botao) {
  botao.addEventListener("click", ativarNotificacoes);
}

async function ativarNotificacoes() {
  try {
    if (!("Notification" in window)) {
      alert("Este dispositivo não suporta notificações.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("As notificações não foram autorizadas.");
      return;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (!token) {
      alert("Não foi possível ativar as notificações.");
      return;
    }

    await setDoc(doc(db, "fcmTokens", token), {
      token: token,
      criadoEm: new Date().toISOString(),
      dispositivo: "motorista"
    });

    botao.textContent = "🔔 Notificações ativadas";
    botao.disabled = true;

    alert("Notificações ativadas com sucesso! ✅");

    console.log("Token FCM:", token);

 } catch (erro) {
    console.error("Erro ao ativar notificações:", erro);

    alert(
      "ERRO REAL:\n\n" +
      (erro?.code || "") +
      "\n\n" +
      (erro?.message || erro)
    );
  }
}

onMessage(messaging, (payload) => {
  console.log("Nova notificação recebida:", payload);

  if (Notification.permission === "granted") {
    new Notification(
      payload.notification?.title ||
        "🎵 Nova solicitação no RideTune",
      {
        body:
          payload.notification?.body ||
          "Um passageiro acabou de pedir uma música.",
        icon: "/logo.png"
      }
    );
  }
});

