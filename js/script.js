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

// Références DOM
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messageHistory = document.getElementById("message-history");

// Envoi de message
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const messageText = messageInput.value.trim();

  if (!messageText) {
    alert("Le message ne peut pas être vide !");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      message: messageText,
      date: new Date().toISOString(),
    });
    messageInput.value = ""; // Réinitialiser le champ de texte
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
  }
});

// Récupération et affichage des messages
onSnapshot(collection(db, "messages"), (snapshot) => {
  messageHistory.innerHTML = ""; // Réinitialiser l'affichage

  snapshot.forEach((doc) => {
    const { message, date } = doc.data();
    const messageElement = document.createElement("p");
    messageElement.textContent = `[${new Date(date).toLocaleTimeString()}] ${message}`;
    messageHistory.appendChild(messageElement);
  });
});
