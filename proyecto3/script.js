<script>
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Selección flexible: si tienes ids, se usan; si no, se buscan los links dentro de .btn
    const btnSi = document.querySelector('#btn-si') || document.querySelector('.btn a:first-child');
    const btnNo = document.querySelector('#btn-random') || document.querySelector('.btn a:last-child');

    if (!btnSi || !btnNo) {
      console.error('No se encontraron los botones (btnSi o btnNo). Asegúrate que haya dos <a> dentro de .btn.');
      return;
    }

    // estilo base para que transform/position funcionen bien
    [btnSi, btnNo].forEach(b => {
      b.style.display = b.style.display || 'inline-block';
      b.style.position = b.style.position || 'relative';
      b.style.transition = 'transform 0.35s ease, top 0.25s ease, left 0.25s ease, all 0.6s ease';
      b.style.cursor = 'pointer';
      b.style.userSelect = 'none';
    });

    // evita movimientos demasiado seguidos
    let lastMove = 0;
    const MOVE_MIN_INTERVAL = 300; // ms

    function moverAleatoriamente(el) {
      const now = Date.now();
      if (now - lastMove < MOVE_MIN_INTERVAL) return;
      lastMove = now;

      el.style.position = 'fixed'; // para moverse por toda la pantalla sin depender del contenedor
      const w = el.offsetWidth || 80;
      const h = el.offsetHeight || 40;
      const pad = 8;
      const maxTop = Math.max(window.innerHeight - h - pad, pad);
      const maxLeft = Math.max(window.innerWidth - w - pad, pad);
      const top = Math.random() * maxTop;
      const left = Math.random() * maxLeft;

      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
      el.style.fontWeight = '700';
    }

    // crecimiento del botón "SI"
    function agrandarBtnSi(factor = 1.15) {
      let scale = parseFloat(btnSi.dataset.scale || '1');
      scale = scale * factor;
      // Límites para no explotar el navegador; cuando alcance cierto tamaño, la convertimos a pantalla completa
      btnSi.dataset.scale = String(scale);
      btnSi.style.transformOrigin = 'center';
      btnSi.style.transform = `scale(${scale})`;

      // comprobar si con este scale ya cubre la ventana; si es así, expandir a full-screen
      const rect = btnSi.getBoundingClientRect();
      const approxW = rect.width * 1; // transform ya aplicado visualmente
      const approxH = rect.height * 1;
      if (approxW * scale >= window.innerWidth * 0.9 || approxH * scale >= window.innerHeight * 0.9) {
        expandToFullScreen();
      }
    }

    let expanding = false;
    function expandToFullScreen() {
      if (expanding) return;
      expanding = true;

      // aplicar estilos para cubrir pantalla
      btnSi.style.position = 'fixed';
      btnSi.style.left = '0';
      btnSi.style.top = '0';
      btnSi.style.width = '100vw';
      btnSi.style.height = '100vh';
      btnSi.style.display = 'flex';
      btnSi.style.alignItems = 'center';
      btnSi.style.justifyContent = 'center';
      btnSi.style.fontSize = '2.4rem';
      btnSi.style.borderRadius = '0';
      btnSi.style.margin = '0';
      btnSi.style.transform = 'none';
      btnSi.style.transition = 'all 0.6s ease';
      btnSi.style.zIndex = '9999';

      // después de la animación, seguir el enlace (si tiene href)
      const href = btnSi.getAttribute('href');
      setTimeout(() => {
        if (href) window.location.href = href;
      }, 750);
    }

    // Proximidad del ratón: si el puntero se acerca a 'NO', se mueve
    const PROXIMITY = 120; // px
    function handleMouseMove(e) {
      const r = btnNo.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < PROXIMITY) {
        moverAleatoriamente(btnNo);
        agrandarBtnSi(1.10); // crecer un 10% cada vez
      }
    }
    document.addEventListener('mousemove', handleMouseMove);

    // Touch (móvil): cuando el dedo se acerca/mueve se escapa y crece SI
    function handleTouchMove(e) {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      const r = btnNo.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = t.clientX - cx;
      const dy = t.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < PROXIMITY) {
        e.preventDefault(); // evita que el touch se convierta en click/navegación
        moverAleatoriamente(btnNo);
        agrandarBtnSi(1.12);
      }
    }
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // clicks / touches directos sobre NO: impedir navegación y moverse
    btnNo.addEventListener('click', (e) => {
      e.preventDefault();
      moverAleatoriamente(btnNo);
      agrandarBtnSi(1.12);
    });
    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      moverAleatoriamente(btnNo);
      agrandarBtnSi(1.12);
    }, { passive: false });

    // Si el usuario hace click/tap en SI: animar a pantalla completa antes de seguir
    btnSi.addEventListener('click', (e) => {
      e.preventDefault();
      expandToFullScreen();
    });
    btnSi.addEventListener('touchstart', (e) => {
      e.preventDefault();
      expandToFullScreen();
    }, { passive: false });

    // Si quieres, puedes ajustar PROXIMITY, MOVE_MIN_INTERVAL o el factor de agrandarBtnSi.
    console.log('Script de botones activo. btnSi, btnNo encontrados y listeners asignados.');
  } catch (err) {
    console.error('Error en el script de botones:', err);
  }
});
</script>
