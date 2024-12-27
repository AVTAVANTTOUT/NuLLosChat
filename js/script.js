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
  const pseudo = document.getElementById("pseudo-input").value.trim();

  if (!messageText || !pseudo) {
    alert("Le message et le pseudo ne peuvent pas être vides !");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      pseudo: pseudo,
      message: messageText,
      date: new Date().toISOString(),
    });
    messageInput.value = "";
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
  }
});

onSnapshot(collection(db, "messages"), (snapshot) => {
  messageHistory.innerHTML = "";

  snapshot.forEach((doc) => {
    const { pseudo, message, date } = doc.data();
    const messageElement = document.createElement("p");
    messageElement.textContent = `[${new Date(date).toLocaleTimeString()}] ${pseudo} : ${message}`;
    messageHistory.appendChild(messageElement);
  });
});
