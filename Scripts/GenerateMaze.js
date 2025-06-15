  class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.walls = [true, true, true, true]; // top, right, bottom, left
      this.visited = false;

      // Nueva propiedad de memoria lógica
      this.visitedMemory = null; // solo se marcará si es multiway
    }

    draw() {
  const x = this.x * cellSize;
  const y = this.y * cellSize;

  const skin = getSkin(currentSkin);

  // Fondo de la celda
  ctx.fillStyle = skin.backgroundColor;
  ctx.fillRect(x, y, cellSize, cellSize);

  // Paredes del laberinto
  ctx.strokeStyle = skin.wallColor;
  ctx.lineWidth = skin.lineWidth;

  if (this.walls[0]) line(x, y, x + cellSize, y); // top
  if (this.walls[1]) line(x + cellSize, y, x + cellSize, y + cellSize); // right
  if (this.walls[2]) line(x + cellSize, y + cellSize, x, y + cellSize); // bottom
  if (this.walls[3]) line(x, y + cellSize, x, y); // left
}


    getNeighbor() {
      const neighbors = [];

      const top = grid[index(this.x, this.y - 1)];
      const right = grid[index(this.x + 1, this.y)];
      const bottom = grid[index(this.x, this.y + 1)];
      const left = grid[index(this.x - 1, this.y)];

      if (top && !top.visited) neighbors.push(top);
      if (right && !right.visited) neighbors.push(right);
      if (bottom && !bottom.visited) neighbors.push(bottom);
      if (left && !left.visited) neighbors.push(left);

      if (neighbors.length > 0) {
        return neighbors[Math.floor(Math.random() * neighbors.length)];
      }

      return undefined;
    }
  }

function index(x, y) {
    if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
    return x + y * cols;
  }


function generateAndShowMaze() {
    cols = mazeSizes[Level].rows;
    rows = mazeSizes[Level].cols;
    ResizeCanvas();
    generateMaze();
    markMultiWayCells();
    playerRow = rows - 1;
    playerCol = 0;
    playerX = 0;
    playerY = (rows - 1) * cellSize;
    moveDir = null;
    isMoving = false;
    goalReached = false;
    showFirstGoal = true;   // 🔵 pelota negra en la meta
    showSecondGoal = false; // 🔴 pelota roja en el inicio

    drawMaze();
    drawStartAndEnd();

        // inicia el loop si aún no está corriendo
    if (!window._gameLoopStarted) {
        window._gameLoopStarted = true;
        gameLoop();
    }
  }



function generateMaze() {
    initGrid();

    while (true) {
      current.visited = true;
      const next = current.getNeighbor();

      if (next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
      } else if (stack.length > 0) {
        current = stack.pop();
      } else {
        break;
      }
    }
  }


function initGrid() {
    grid = [];
    stack = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        grid.push(new Cell(x, y));
      }
    }

    current = grid[index(0, rows - 1)];
  }


function removeWalls(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    if (dx === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (dx === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }

    if (dy === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (dy === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
  }

function markMultiWayCells() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = grid[index(x, y)];
      const wallCount = cell.walls.filter(Boolean).length;

      if (wallCount <= 1) {
        cell.visitedMemory = false; // inicializa como no visitada
      }
    }
  }
}
