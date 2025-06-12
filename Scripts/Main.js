const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const mazeSizes = [
  { rows: 3, cols: 5 },
  { rows: 4, cols: 6 },
  { rows: 5, cols: 8 },
  { rows: 6, cols: 9 },
  { rows: 7, cols: 11 },
  { rows: 8, cols: 12 },
  { rows: 9, cols: 14 },
  { rows: 10, cols: 16 },
  { rows: 11, cols: 17 },
  { rows: 12, cols: 19 },
  { rows: 13, cols: 20 },
  { rows: 14, cols: 22 },
  { rows: 15, cols: 23 },
  { rows: 16, cols: 25 },
  { rows: 17, cols: 26 },
  { rows: 18, cols: 28 },
  { rows: 19, cols: 30 },
  { rows: 20, cols: 31 },
  { rows: 21, cols: 33 },
  { rows: 22, cols: 34 },
  { rows: 23, cols: 36 },
  { rows: 24, cols: 37 },
  { rows: 25, cols: 39 },
  { rows: 26, cols: 40 },
  { rows: 27, cols: 42 },
  { rows: 28, cols: 43 },
  { rows: 29, cols: 45 },
  { rows: 30, cols: 46 }
];

  let Level = 0;
    let cols = mazeSizes[Level].rows;
    let rows = mazeSizes[Level].cols;
    let cellSize = canvas.width / rows;
 

let grid = [];
let stack = [];
let current;
let playerRow = rows - 1; // empieza abajo
let playerCol = 0;        // empieza a la izquierda


  function generateAndShowMaze() {
    cols = mazeSizes[Level].rows;
    rows = mazeSizes[Level].cols;
    ResizeCanvas();
    Level++;
    generateMaze();
    markMultiWayCells();
    playerRow = rows - 1;
    playerCol = 0;
    playerX = 0;
    playerY = (rows - 1) * cellSize;
    moveDir = null;
    isMoving = false;

    drawMaze();
    drawStartAndEnd();

        // inicia el loop si aún no está corriendo
    if (!window._gameLoopStarted) {
        window._gameLoopStarted = true;
        gameLoop();
    }
  }

detectSwipe(direction => {
    if(direction == "up" || direction == "down" || direction == "left" || direction == "right") startSmoothMove(direction);
});
