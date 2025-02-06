
function loadGridStateFromNumber(containerId, figureNumber) {
    const grid = document.getElementById(containerId);
    grid.setAttribute('data-figure-number', figureNumber); // Almacena el número de figura en el grid
    const items = grid.children;

    try {
        let gridState = getFigureValues(figureNumber);
        const color = randomNumber(9);
        let value;
        const Rotate = randomNumber(4)-1;
        
        gridState = repeatFunction(rotateMatrix, Rotate, gridState);

        // Actualizar el estado de la cuadrícula
        for (let row = 0; row < gridState.length; row++) {
            for (let col = 0; col < gridState[row].length; col++) {
                const index = row * gridState[row].length + col;
                value = gridState[row][col];
                if (value == 1) { value = color; }
                items[index].setAttribute('data-value', value);
                items[index].textContent = value;
            }
        }
    } catch (error) {
        console.error('Error loading figure:', error);
    }
}

function loadFigureOnPageLoad() {
    figureFittable = filterFittingFigures('gridContainer');
    prepareExpandedList(figureFittable);

    let figureNumber = randomFigure();
    loadGridStateFromNumber('smallGrid1', figureNumber);
	figureNumber = randomFigure();
    loadGridStateFromNumber('smallGrid2', figureNumber);
	figureNumber = randomFigure();
    loadGridStateFromNumber('smallGrid3', figureNumber);
}

function initializeMainGrid(containerId, rows, cols, cellSize) {
    const gridContainer = document.getElementById(containerId);

    gridContainer.ondragover = function (event) {
        event.preventDefault(); // Permitir el arrastre sobre el main grid

        // Calcular la posición dentro del grid
        const mouseX = event.clientX - gridContainer.getBoundingClientRect().left;
        const mouseY = event.clientY - gridContainer.getBoundingClientRect().top;

        const destinationRow = Math.floor(mouseY / cellSize);
        const destinationCol = Math.floor(mouseX / cellSize);

    
    };

    gridContainer.ondrop = function (event) {
        event.preventDefault();
        lastHighlightedCell = null; // Reiniciar la celda rastreada al soltar
    };

    for (let i = 0; i < rows * cols; i++) {
        const div = document.createElement('div');
        div.className = 'grid-item maingrid-item';
        div.style.width = `${cellSize}px`;
        div.style.height = `${cellSize}px`;
        gridContainer.appendChild(div);
    }
}

function initializeSmallGrids(containerIds, rows, cols, cellSize) {
    containerIds.forEach(id => {
        const gridContainer = document.getElementById(id);

        for (let i = 0; i < rows * cols; i++) {
            const div = document.createElement('div');
            div.className = 'grid-item smallgrid-item';
            div.style.width = `${cellSize}px`;
            div.style.height = `${cellSize}px`;
            div.setAttribute('draggable', true); // Make the element draggable

            let isDragging = false;

            // Detect drag start
            div.addEventListener('dragstart', () => {
                isDragging = true;
            });

            // Detect drag end
            div.addEventListener('dragend', () => {
                isDragging = false;
            });

            // Handle click
            div.addEventListener('click', () => {
            });

            // Handle touch
            div.addEventListener('touchstart', () => {
                isDragging = false;
            });

            div.addEventListener('touchmove', () => {
                isDragging = true;
            });

            div.addEventListener('touchend', (event) => {
                if (!isDragging) rotar(event);
            });

            gridContainer.appendChild(div);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // ** Main grid and small grids containers **
    const gridContainer = document.getElementById('gridContainer');
    const smallgrid1Container = document.getElementById('smallGrid1');
    const smallgrid2Container = document.getElementById('smallGrid2');
    const smallgrid3Container = document.getElementById('smallGrid3');
    const scoreContainer = document.getElementById('total-score');

    // ** Screen dimensions **
    const screenWidth = window.innerWidth;  // Screen width
    const screenHeight = window.innerHeight; // Screen height

 
    const CellSizeW = Math.round(((screenWidth * 0.98) - 21.6)/10.7);
    const CellSizeH = Math.round(((screenHeight*0.95)-46.83-17.8-41.8)/(2+10.7+2.31));

    let cellSize = Math.min(CellSizeW, CellSizeH);
    cellSize = Math.min(cellSize, 45);

    // ** Apply grid dimensions and gaps **
    gridContainer.style.gridTemplateColumns = `repeat(10, ${cellSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(10, ${cellSize}px)`;
    gridContainer.style.gap = `${Math.trunc((((3 / 40) * cellSize) + (-3 / 8)) * 10) / 10}px`;

    [smallgrid1Container, smallgrid2Container, smallgrid3Container].forEach(container => {
        container.style.gridTemplateColumns = `repeat(5, ${(cellSize / 2.25)}px)`;
        container.style.gridTemplateRows = `repeat(5, ${(cellSize / 2.25)}px)`;
        container.style.gap = `${Math.trunc((((1 / 35) * cellSize) + (-2 / 7)) * 10) / 10}px`;
    });

    // ** Adjust score container dynamically **
    const scoreFontSize = Math.round((cellSize * 5) / 45); // Font size proportional to cellSize
    const scorePadding = Math.round((cellSize * 20) / 45); // Padding proportional to cellSize
    const borderRadius = Math.round((cellSize * 12) / 45); // Border-radius proportional to cellSize

    scoreContainer.style.fontSize = `${scoreFontSize}rem`;
    scoreContainer.style.padding = `${scorePadding}px`;
	scoreContainer.style.paddingBottom =  `${0}px`;
	scoreContainer.style.paddingTop = `${0}px`;
    scoreContainer.style.borderRadius = `${borderRadius}px`;

    // ** Initialize grids **
    initializeMainGrid('gridContainer', 10, 10, cellSize);
    initializeSmallGrids(['smallGrid1', 'smallGrid2', 'smallGrid3'], 5, 5, cellSize / 2.25);

    // ** Enable touch support for grids **
    ['smallGrid1', 'smallGrid2', 'smallGrid3'].forEach(id => {
        enableTouchSupportSmall(document.getElementById(id));
    });

    // ** Apply dynamic border-radius **
    const borderRadiusMain = `${Math.round(cellSize * 0.2)}px`;
    const borderRadiusSmall = `${Math.round((cellSize / 2.25) * 0.2)}px`;

    document.querySelectorAll('.grid-item').forEach(item => {
        item.style.borderRadius = borderRadiusMain;
    });

    document.querySelectorAll('.smallgrid-item').forEach(item => {
        item.style.borderRadius = borderRadiusSmall;
    });

    const params = new URLSearchParams(window.location.search);
    Language = params.get('lang') || 'EN';

    const UnduButtonText = Translate(Language, "Undo");
    const UnduButton = document.getElementById("Undo-button");
    UnduButton.innerText=  UnduButtonText;

    const LevelTranslated = Translate(Language, 'Level');
    const LevelBanner = document.getElementById("level-container");
    LevelBanner.innerText=  `${LevelTranslated}: 1`;


    // ** Load initial figures **
    loadFigureOnPageLoad();
    positionUndoButton(screenWidth, screenHeight);
});

function prepareExpandedList(figureFittable) {
  
    expandedList = []; // Clear the list before populating
    figurePriorities.forEach((priority, number) => {
        if (figureFittable[number] > 0) { // Skip zeros
            for (let i = 0; i < priority; i++) {
                expandedList.push(number + 1); // Numbers start at 1
            }
        }
    });
}