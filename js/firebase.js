// Importer Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNjGnAFRQ9atJLG2qDVP3e9_1mgQDbs5s",
  authDomain: "nullchat-6193e.firebaseapp.com",
  projectId: "nullchat-6193e",
  storageBucket: "nullchat-6193e.firebasestorage.app",
  messagingSenderId: "608139378042",
  appId: "1:608139378042:web:0d04e690f86afc9afd2ac3",
  measurementId: "G-6F6RX38SK5"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fonction pour envoyer un message
async function sendMessage(messageText) {
  try {
    // Ajouter le message dans Firestore
    await addDoc(collection(db, "messages"), {
      message: messageText,
      date: new Date().toISOString()
    });
    console.log("Message envoyé avec succès!");
  } catch (e) {
    console.error("Erreur lors de l'envoi du message: ", e);
  }
}

// Fonction pour récupérer et afficher les messages en temps réel
function getMessages() {
  const messagesContainer = document.getElementById('message-history');
  const messagesCollection = collection(db, "messages");

  // Écouter les mises à jour en temps réel dans la collection Firestore
  onSnapshot(messagesCollection, (snapshot) => {
    messagesContainer.innerHTML = ''; // Effacer les messages précédents

    snapshot.forEach((doc) => {
      const messageData = doc.data();
      const messageElement = document.createElement('p');
      messageElement.textContent = `${messageData.date}: ${messageData.message}`;
      messagesContainer.appendChild(messageElement);
    });
  });
}

// Appeler la fonction pour démarrer l'écoute des messages
getMessages();

