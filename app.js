document.getElementById('message-form').addEventListener('submit', (e) => {
  e.preventDefault(); // Empêcher l'envoi du formulaire classique
  const message = document.getElementById('message').value;
  sendMessage(message);  // Envoie le message à Firebase
});
