function detectSwipe(callback) {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const threshold = 30; // Mínima distancia válida
  const directionalFactor = 1.5; // Requiere que un eje sea 1.5x más fuerte que el otro

  document.addEventListener('touchstart', function (e) {
    const touch = e.changedTouches[0];
    touchStartX = touch.screenX;
    touchStartY = touch.screenY;
  });

  document.addEventListener('touchend', function (e) {
    const touch = e.changedTouches[0];
    touchEndX = touch.screenX;
    touchEndY = touch.screenY;

    handleSwipe();
  });

  function handleSwipe() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx < threshold && absDy < threshold) {
      callback('none'); // muy corto
      return;
    }

    if (absDx > absDy * directionalFactor) {
      callback(dx > 0 ? 'right' : 'left');
    } else if (absDy > absDx * directionalFactor) {
      callback(dy > 0 ? 'down' : 'up');
    } else {
      callback('none'); // demasiado diagonal
    }
  }
}
