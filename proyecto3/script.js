const btnSi = document.querySelector("#btn-si");
const btnNo = document.querySelector("#btn-random");

function moverAleatoriamente(btn) {
  btn.style.position = "absolute";
  btn.style.fontWeight = "bolder";

  const w = btn.offsetWidth;
  const h = btn.offsetHeight;
  const pad = 10;

  const maxTop = Math.max(window.innerHeight - h - pad, pad);
  const maxLeft = Math.max(window.innerWidth - w - pad, pad);

  btn.style.top = Math.floor(Math.random() * maxTop) + "px";
  btn.style.left = Math.floor(Math.random() * maxLeft) + "px";
}

function agrandarBtnSi() {
  let scale = parseFloat(btnSi.dataset.scale || "1");
  if (scale < 8) { // límite para no colgar la página
    scale += 0.3;
    btnSi.dataset.scale = scale;
    btnSi.style.transform = `scale(${scale})`;
  } else {
    // cuando ya está enorme, cubrir pantalla
    btnSi.style.position = "fixed";
    btnSi.style.left = "0";
    btnSi.style.top = "0";
    btnSi.style.width = "100vw";
    btnSi.style.height = "100vh";
    btnSi.style.display = "flex";
    btnSi.style.alignItems = "center";
    btnSi.style.justifyContent = "center";
    btnSi.style.fontSize = "2rem";
    btnSi.style.zIndex = "9999";

    setTimeout(() => {
      window.location.href = btnSi.getAttribute("href");
    }, 800);
  }
}

// PC → cuando el mouse se acerca
btnNo.addEventListener("mouseenter", () => {
  moverAleatoriamente(btnNo);
  agrandarBtnSi();
});

// Celular → cuando intentan tocar
btnNo.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moverAleatoriamente(btnNo);
  agrandarBtnSi();
});

// Al hacer click en SI → crecer pantalla completa
btnSi.addEventListener("click", (e) => {
  e.preventDefault();
  agrandarBtnSi();
});
