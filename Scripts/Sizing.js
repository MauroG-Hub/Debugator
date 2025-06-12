  

  function ResizeCanvas(){
    // ** Screen dimensions **
    const screenWidth = window.innerWidth;  // Screen width
    const screenHeight = window.innerHeight; // Screen height


    const CellSizeW = (screenWidth*0.9) / cols;
    const CellSizeH = (screenWidth*0.9) / rows;

    cellSize = Math.min(CellSizeW, CellSizeH);

    const Canvas = document.getElementById('mazeCanvas');


    // Ajusta el tamaño del canvas al laberinto
    Canvas.width = cols * cellSize;
    Canvas.height = rows * cellSize;
  
  }
  
