function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let cell of grid) {
      cell.draw();
    }
  }

function drawStartAndEnd() {
  const radius = cellSize * 0.3;

  // 🎯 Primer objetivo (pelota negra en esquina superior derecha)
  if (showFirstGoal) {
    const endX = (cols - 0.5) * cellSize;
    const endY = cellSize / 2;
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(endX, endY, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // 🎁 Segundo objetivo (pelota roja en esquina inferior izquierda)
  if (showSecondGoal) {
    const redX = cellSize / 2;
    const redY = (rows - 0.5) * cellSize;
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(redX, redY, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // 🔵 Pelota azul (jugador)
  ctx.beginPath();
  ctx.fillStyle = 'blue';
  ctx.arc(playerX + cellSize / 2, playerY + cellSize / 2, radius, 0, Math.PI * 2);
  ctx.fill();
}

function gameLoop() {
  drawMaze();
  drawStartAndEnd();
  requestAnimationFrame(gameLoop);
}


