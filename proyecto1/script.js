function mostrarMensaje() {
  alert("Te amo muchísimo ❤️ Gracias por este primer mes juntos 🥰");
}

// Generar corazones flotando
function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.classList.add("corazon");
  corazon.innerHTML = "❤️";
  corazon.style.left = Math.random() * window.innerWidth + "px";
  corazon.style.top = window.innerHeight + "px";
  document.body.appendChild(corazon);

  setTimeout(() => { corazon.remove(); }, 5000);
}

setInterval(crearCorazon, 500);
