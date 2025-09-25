<script>
const btnNo = document.querySelector("#btn-random");
const btnSi = document.querySelector("#btn-si"); // agrega id="btn-si" al botón de Sí

function moverAleatoriamente(btn) {
    btn.style.position = "absolute";
    btn.style.fontWeight = "bolder";
    btn.style.top = Math.floor(Math.random() * 80 + 5) + "%";
    btn.style.left = Math.floor(Math.random() * 80 + 5) + "%";
}

// función para ir creciendo el botón de "Sí"
function agrandarBtnSi() {
    let currentScale = btnSi.dataset.scale ? parseFloat(btnSi.dataset.scale) : 1;
    if (currentScale < 10) { // hasta 10 veces su tamaño original (puede cubrir pantalla)
        currentScale += 0.5;
        btnSi.style.transform = `scale(${currentScale})`;
        btnSi.dataset.scale = currentScale;
    }
}

// --- EVENTOS ---
// Computadora: cuando el mouse se acerca
btnNo.addEventListener("mouseenter", function (e) {
    moverAleatoriamente(e.target);
    agrandarBtnSi();
});

// Celular: cuando intentan presionar
btnNo.addEventListener("touchstart", function (e) {
    moverAleatoriamente(e.target);
    agrandarBtnSi();
});
</script>
