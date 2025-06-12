let playerX = 0;
let playerY = 0;
let moveDir = null;
let isMoving = false;

function startSmoothMove(direction) {
  console.log("1");
  let baseCol = Math.floor(playerX / cellSize);
  let baseRow = Math.floor(playerY / cellSize);


  if (isMoving) return;
  isMoving = true;
  moveDir = direction;
  console.log("2");
  const speed = 10; // píxeles por frame

  function animate() {
    const cell = grid[index(baseCol, baseRow)];
    if (baseCol < 0 || baseCol >= cols || baseRow < 0 || baseRow >= rows) {
    isMoving = false;
    return;
    }


    let wallAhead = false;

switch (direction) {
  case 'up':
    console.log("4");
    if (baseRow <= 0 || cell.walls[0]) {
      console.log("5");
      wallAhead = true;
    } else {
      console.log("6");
      playerY -= speed;
      if (playerY <= (baseRow - 1) * cellSize) {
        console.log("7");
        baseRow--;
        const nextCell = grid[index(baseCol, baseRow)];

        if (handleVisitedMemory(nextCell)) {
          console.log("8");
          wallAhead = true;
        }
      }
    }
    break;

  case 'down':
    if (baseRow >= rows - 1 || cell.walls[2]) {
      wallAhead = true;
    } else {
      playerY += speed;
      if (playerY >= (baseRow + 1) * cellSize) {
        baseRow++;
        const nextCell = grid[index(baseCol, baseRow)];

        if (handleVisitedMemory(nextCell)) {
          wallAhead = true;
        }
      }
    }
    break;

  case 'left':
    if (baseCol <= 0 || cell.walls[3]) {
      wallAhead = true;
    } else {
      playerX -= speed;
      if (playerX <= (baseCol - 1) * cellSize) {
        baseCol--;
        const nextCell = grid[index(baseCol, baseRow)];

        if (handleVisitedMemory(nextCell)) {
          wallAhead = true;
        }
      }
    }
    break;

  case 'right':
    if (baseCol >= cols - 1 || cell.walls[1]) {
      wallAhead = true;
    } else {
      playerX += speed;
      if (playerX >= (baseCol + 1) * cellSize) {
        baseCol++;
        const nextCell = grid[index(baseCol, baseRow)];

        if (handleVisitedMemory(nextCell)) {
          wallAhead = true;
        }

      }
    }
    break;

  default:
      wallAhead = true;
      break;


  }
    drawMaze();
    drawStartAndEnd();
    if (!wallAhead) {
      requestAnimationFrame(animate);
    } else {
      console.log("12");
      // Ajustar a grilla exacta
      playerX = baseCol * cellSize;
      playerY = baseRow * cellSize;
      isMoving = false;

      const finalCell = grid[index(baseCol, baseRow)];
      if (finalCell.visitedMemory === true) {
        finalCell.visitedMemory = false; // desmarca si se detuvo ahí
      }
    }
  }

  animate();
}


function handleVisitedMemory(cell) {
  const wasAlreadyVisited = cell.visitedMemory === true;

  if (cell.visitedMemory === false) {
    cell.visitedMemory = true;
  }

  return wasAlreadyVisited;
}


