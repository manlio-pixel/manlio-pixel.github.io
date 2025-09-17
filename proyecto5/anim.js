// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Mira las estrellas", time: 32 },
  { text: "Mira cómo brillan por ti", time: 35 },
  { text: "Y por todo lo que haces", time: 41 },
  { text: "Sí, eran todas amarillas", time: 46 },
  { text: "Vine desde lejos", time: 49 },
  { text: "Escribí una canción para ti", time: 52 },
  { text: "Y para todas las cosas que haces", time: 58 },
  { text: "Y se llama Amarillo", time: 62 },
  { text: "Así que tomé mi turno", time: 68 },
  { text: "Oh, qué cosa hice", time: 74 },
  { text: "Y era todo amarillo", time: 80 },
  { text: "Tu piel", time: 88 },
  { text: "Oh, sí, tu piel y tus huesos", time: 91 },
  { text: "Se convirtieron en algo hermoso", time: 94 },
  { text: "¿Sabes?", time: 100 },
  { text: "Sabes que te amo tanto?", time: 102 },
  { text: "Sabes que te amo tanto?", time: 107 },
  { text: "Crucé el océano", time: 133 },
  { text: "Salté barreras por ti", time: 135 },
  { text: "Oh, qué cosa que hacer", time: 140 },
  { text: "Porque estabas toda amarilla", time: 146 },
  { text: "Dibujé una línea", time: 149 },
  { text: "Dibujé una línea para ti", time: 151 },
  { text: "Oh, qué cosa que hacer", time: 157 },
  { text: "Y era todo amarillo", time: 164 },
  { text: "Tu piel", time: 172 },
  { text: "Oh, sí, tu piel y tus huesos", time: 173 },
  { text: "Se convirtieron en algo hermoso", time: 177 },
  { text: "¿Sabes que?", time: 183 },
  { text: "¿Por ti, me desangraría?", time: 185 },
  { text: "Por ti, me desangraría", time: 190 },
  { text: "Es verdad", time: 216 },
  { text: "Mira cómo brillan por ti", time: 218 },
  { text: "Mira cómo brillan por ti", time: 224 },
  { text: "Mira cómo brillan por ti", time: 229 },
  { text: "Mira cómo brillan por ti", time: 235 },
  { text: "Mira cómo brillan por ti", time: 240 },
  { text: "Mira cómo brillan", time: 246 },
  { text: "Mira las estrellas", time: 249 },
  { text: "Mira cómo brillan por ti", time: 251 },
  { text: "Y por todas las cosas que haces", time: 258 },
  { text: "Te amo mucho... 😘😍🥰", time: 260 },
  { text: "Te amo mucho... 😘😍🥰", time: 262 },
  { text: "Te amo mucho... 😘😍🥰", time: 264 }, 
];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 3
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 270000);