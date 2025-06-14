let playerX = 0;
let playerY = 0;
let moveDir = null;
let isMoving = false;
let goalReached = false;
let showFirstGoal = true;   // 🔵 pelota negra en la meta
let showSecondGoal = false; // 🔴 pelota roja en el inicio

const epsilon = 0.3; // margen aceptable de error decimal


function startSmoothMove(direction) {
  let baseCol = Math.round(playerX / cellSize);
  let baseRow = Math.round(playerY / cellSize);


  if (isMoving) return;
  isMoving = true;
  moveDir = direction;

  const speed = 10; // píxeles por frame

  function animate() {
    const cell = grid[index(baseCol, baseRow)];
    if (baseCol < 0 || baseCol >= cols || baseRow < 0 || baseRow >= rows) {
    isMoving = false;
    return;
    }


    let wallAhead = false;

const targetY = baseRow * cellSize;
const targetX = baseCol * cellSize;



switch (direction) {
  case 'up':

    if (baseRow <= 0 || cell.walls[0]) {

      wallAhead = true;
    } else {
  
      playerY -= speed;
      if (playerY <= targetY - cellSize + epsilon) {
  
        baseRow--;
        const nextCell = grid[index(baseCol, baseRow)];

        if (handleVisitedMemory(nextCell)) {
   
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
      if (playerY >= targetY + cellSize - epsilon) {
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
      if (playerX <= targetX - cellSize + epsilon) {
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
      if (playerX >= targetX + cellSize - epsilon) {
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
  
      // Ajustar a grilla exacta
      playerX = baseCol * cellSize;
      playerY = baseRow * cellSize;
      isMoving = false;
console.log("X: " + baseCol + " Y: " + baseRow);

      const finalCell = grid[index(baseCol, baseRow)];
      if (finalCell.visitedMemory === true) {
        finalCell.visitedMemory = false; // desmarca si se detuvo ahí
      }

       // 🎯 Verificar si llegó al objetivo
       if (!goalReached && baseCol === cols - 1 && baseRow === 0) {
        goalReached = true;
        showFirstGoal = false;
        showSecondGoal = true;
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


