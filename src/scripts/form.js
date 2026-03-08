const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    access_key: "af3d6793-bf4d-4e01-8376-10ab8723c51b", // <- Mets ta clé ici
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };
  status.textContent = "⏳ Envoi en cours...";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      status.textContent = "✅ Message envoyé ! Merci 🙏";
      form.reset();
    } 
    else {
      status.textContent = "❌ Erreur lors de l'envoi.";
    }
  } catch (err) {
    status.textContent = "⚠️ Impossible de contacter le service.";
  }
});