//const figurePriorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
const figurePriorities = [1, 6, 6, 1, 1, 1, 1, 6, 6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  8,  8, 10];

let TotalPoints = 0;
let SmallGridID;
let expandedList = [];
const cleanedGrids = new Set();
let figurePrioritiesFittable = figurePriorities;
let lastHighlightedCell = null; // Para rastrear la última celda impresa


function Copy(row, col, sourceGridId, Dumb) {
    cleanMainGridValuesInRange('gridContainer', 11, 19);

    if (row < 0 || col < 0) {
        if(!Dumb)console.log('The figure does not fit in that position');
        return;
    }

    if (!isValidSmallGrid(sourceGridId)) {
        console.log('Invalid Small Grid',sourceGridId);   
        return;
    }

    if (checkOverwrite(sourceGridId, 'gridContainer', row, col)) {
        if(!Dumb)console.log('The figure cannot overlap another');
        return;
    }

    if (checkOutOfBounds(sourceGridId, 'gridContainer', row, col)) {
        if(!Dumb)console.log('The figure does not fit in that position');
        return;
    }
    
    copyValuesFromGrid(sourceGridId, 'gridContainer', row, col, Dumb);

    if (!Dumb){
        clearGrid(sourceGridId);

        // Retrieve the figure number associated with the source grid
        const smallGrid = document.getElementById(sourceGridId);
        const figureNumber = parseInt(smallGrid.getAttribute('data-figure-number')) || 0;

        // Call PointSystem with the figure number
        PointSystem(figureNumber);

        let columnsToClear = analyzeColumns('gridContainer');
        let rowsToClear = analyzeRows('gridContainer');
        clearColumns('gridContainer', columnsToClear);
        clearRows('gridContainer', rowsToClear);

        if (checkAllGridsCleared(['smallGrid1', 'smallGrid2', 'smallGrid3'])) {
            cleanedGrids.clear();
            loadFigureOnPageLoad();
        }

        if(doAllFiguresNotFit('gridContainer',['smallGrid1', 'smallGrid2', 'smallGrid3'])){
            console.log('You lost');
        }
    }
    
}

function Select(id){
	SmallGridID = id;
};

function isValidSmallGrid(smallGridId) {
    const validIds = ['smallGrid1', 'smallGrid2', 'smallGrid3'];
    return validIds.includes(smallGridId);
}

function randomFigure() {
    if (expandedList.length === 0) {
        prepareExpandedList(figurePrioritiesFittable);
    }
    const randomIndex = Math.floor(Math.random() * expandedList.length);
    return expandedList[randomIndex];
}

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}
   
function copyValuesFromGrid(gridId, mainGridId, startRow, startCol, Dumb) {
    const figurematrix = getFigureFromSmallGrid(gridId);
    const coordinates = getFirstAndLastRowColWithValue(figurematrix);
    if (!coordinates) {
        console.error('No non-zero values found in the source grid.');
        return;
    }

    const sourceGrid = document.getElementById(gridId);
    const mainGrid = document.getElementById(mainGridId);

    const sourceItems = sourceGrid.children;
    const mainItems = mainGrid.children;

    const { FirstRow: sourceStartRow, FirstCol: sourceStartCol, LastRow: sourceEndRow, LastCol: sourceEndCol } = coordinates;
    const gridWidth = Math.sqrt(sourceItems.length);
    const mainGridWidth = Math.sqrt(mainItems.length);

    for (let row = 0; row <= (sourceEndRow - sourceStartRow); row++) {
        for (let col = 0; col <= (sourceEndCol - sourceStartCol); col++) {
            const sourceIndex = (sourceStartRow + row) * gridWidth + (sourceStartCol + col);
            const targetIndex = (startRow + row) * mainGridWidth + (startCol + col);
            let FinalValue;

            if (startRow + row < mainGridWidth && startCol + col < mainGridWidth) {
                const value = sourceItems[sourceIndex]?.getAttribute('data-value') || 0;

                if (value > 0) {
                    FinalValue = value;
                    if(Dumb){FinalValue = Math.abs(value) + 10;}
                    mainItems[targetIndex].setAttribute('data-value', FinalValue);
                    mainItems[targetIndex].textContent = FinalValue;
                }
            }
        }
    }
}

function getFirstAndLastRowColWithValue(figure) {
 
    if (!Array.isArray(figure) || !Array.isArray(figure[0])) {
        console.error('The provided figure is not a valid 2D array.');
        return null;
    }

    const numRows = figure.length;
    const numCols = figure[0].length;

    let FirstRow = 10;
    let FirstCol = 10;
    let LastRow = 0;
    let LastCol = 0;

    // Iterate through rows
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numRows; col++) {
            const index = row * numRows + col;
            const value = figure[row][col];

            if (value !== 0 && FirstRow === 10) {
                FirstRow = row;
            }
            if (value !== 0) {
                LastRow = row;
            }
        }
    }

    // Iterate through columns
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numCols; row++) {
            const index = row * numCols + col;
            const value = figure[row][col];

            if (value !== 0 && FirstCol === 10) {
                FirstCol = col;
            }
            if (value !== 0) {
                LastCol = col;
            }
        }
    }

    if (FirstRow === 10) { FirstRow = 0; }
    if (FirstCol === 10) { FirstCol = 0; }

    return { FirstRow, FirstCol, LastRow, LastCol };
}

function checkOverwrite(gridId, mainGridId, startRow, startCol) {
    const figurematrix = getFigureFromSmallGrid(gridId);
    const coordinates = getFirstAndLastRowColWithValue(figurematrix);
    if (!coordinates) {
        console.error('No non-zero values found in the source grid.');
        return false;
    }

    const sourceGrid = document.getElementById(gridId);
    const mainGrid = document.getElementById(mainGridId);

    const sourceItems = sourceGrid.children;
    const mainItems = mainGrid.children;

    const { FirstRow: sourceStartRow, FirstCol: sourceStartCol, LastRow: sourceEndRow, LastCol: sourceEndCol } = coordinates;
    const gridWidth = Math.sqrt(sourceItems.length);
    const mainGridWidth = Math.sqrt(mainItems.length);

    for (let row = 0; row <= (sourceEndRow - sourceStartRow); row++) {
        for (let col = 0; col <= (sourceEndCol - sourceStartCol); col++) {
            const sourceIndex = (sourceStartRow + row) * gridWidth + (sourceStartCol + col);
            const targetIndex = (startRow + row) * mainGridWidth + (startCol + col);

            if (startRow + row < mainGridWidth && startCol + col < mainGridWidth) {
                const sourceValue = parseInt(sourceItems[sourceIndex]?.getAttribute('data-value')) || 0;
                const targetValue = parseInt(mainItems[targetIndex]?.getAttribute('data-value')) || 0;

                if (sourceValue > 0 && (targetValue > 0 && targetValue < 10)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function checkOutOfBounds(gridId, mainGridId, startRow, startCol) {
    const figurematrix = getFigureFromSmallGrid(gridId);
    const coordinates = getFirstAndLastRowColWithValue(figurematrix);
    if (!coordinates) {
        console.error('No non-zero values found in the source grid.');
        return false;
    }

    const mainGrid = document.getElementById(mainGridId);
    const mainItems = mainGrid.children;

    const { FirstRow: sourceStartRow, FirstCol: sourceStartCol, LastRow: sourceEndRow, LastCol: sourceEndCol } = coordinates;
    const mainGridWidth = Math.sqrt(mainItems.length);

    if (startRow + (sourceEndRow - sourceStartRow) >= mainGridWidth || startCol + (sourceEndCol - sourceStartCol) >= mainGridWidth) {
        return true;
    }

    return false;
}

function clearGrid(gridId) {
    const grid = document.getElementById(gridId);

    if (!grid) {
        console.error(`Element with ID ${gridId} not found.`);
        return;
    }

    const items = grid.children;

    for (let item of items) {
        item.setAttribute('data-value', 0);
        item.textContent = 0;
    }

    cleanedGrids.add(gridId);
}

function checkAllGridsCleared(gridIds) {
    for (let gridId of gridIds) {
        if (!cleanedGrids.has(gridId)) {
            return false;
        }
    }
    return true;
}

function analyzeRows(mainGridId) {
    const mainGrid = document.getElementById(mainGridId);
    const rowsToClear = [];

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return rowsToClear;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    for (let row = 0; row < gridWidth; row++) {
        let fullRow = true;

        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            const value = parseInt(items[index].getAttribute('data-value')) || 0;

            if ((value === 0)||(value >= 10)) {
                fullRow = false;
                break;
            }
        }

        if (fullRow) {
            rowsToClear.push(row);
        }
    }

    return rowsToClear;
}

function clearRows(mainGridId, rowsToClear) {
    const mainGrid = document.getElementById(mainGridId);

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    rowsToClear.forEach(row => {
        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            items[index].setAttribute('data-value', 0);
            items[index].textContent = 0;
            PointSystem(0);
        }
    });
}

function analyzeColumns(mainGridId) {
    const mainGrid = document.getElementById(mainGridId);
    const columnsToClear = [];

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return columnsToClear;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    for (let col = 0; col < gridWidth; col++) {
        let fullColumn = true;

        for (let row = 0; row < gridWidth; row++) {
            const index = row * gridWidth + col;
            const value = parseInt(items[index].getAttribute('data-value')) || 0;

            if ((value === 0)||(value >= 10)) {
                fullColumn = false;
                break;
            }
        }

        if (fullColumn) {
            columnsToClear.push(col);
        }
    }

    return columnsToClear;
}

function clearColumns(mainGridId, columnsToClear) {
    const mainGrid = document.getElementById(mainGridId);

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    columnsToClear.forEach(col => {
        for (let row = 0; row < gridWidth; row++) {
            const index = row * gridWidth + col;
            items[index].setAttribute('data-value', 0);
            items[index].textContent = 0;
            PointSystem(0);
        }
    });
}

function PointSystem(figureNumber) {
    let PointsToAdd = 0;

    if (figureNumber !== 0) {
        PointsToAdd = countOnesInFigure(figureNumber);
    } else {
        PointsToAdd = 1;
    }

    TotalPoints += PointsToAdd;

    // Update the score in the interface
    const scoreElement = document.getElementById('total-score');
    if (scoreElement) {
        scoreElement.textContent = TotalPoints;
    } else {
        console.error('Element #total-score not found in the DOM.');
    }
}

function doesFigureFitInGrid(mainGridId, figureMatrix) {
    const mainGrid = document.getElementById(mainGridId);

    if (!mainGrid) {
        console.error(`Grid with ID ${mainGridId} not found.`);
        return false;
    }

    const mainGridItems = mainGrid.children;
    const mainGridWidth = Math.sqrt(mainGridItems.length); // Assuming the main grid is square

    const coordinates = getFirstAndLastRowColWithValue(figureMatrix);
    const { FirstRow: FirstRow, FirstCol: FirstCol, LastRow: LastRow, LastCol: LastCol } = coordinates;


    // Handle the case where no rows have non-zero values
    if (FirstRow === -1 || LastRow === -1) {
        return false;
    }

    // Handle the case where no columns have non-zero values
    if (FirstCol === -1 || LastCol === -1) {
        return false;
    }

    let figure2 = extractFigureFromGrid(mainGridId, 0, 0, figureMatrix.length, figureMatrix[0].length);
    // If it fits at any position, return true
    if (doesFigureFitInPartialGrid(figureMatrix, figure2)) return true;


    // If no valid position is found, return false
    return false;
}

function doAllFiguresNotFit(mainGridId, smallGridIds) {
    // Iterate over each small grid ID
    for (let smallGridId of smallGridIds) {
        if (doesFigureFitInGrid(mainGridId, getFigureFromSmallGrid(smallGridId))) {
            // If any figure fits, return false
            return false;
        }
    }
    // If none of the figures fit, return true
    return true;
}

function getFigureFromSmallGrid(smallGridId) {
    const smallGrid = document.getElementById(smallGridId);

    if (!smallGrid) {
        console.error(`Grid with ID ${smallGridId} not found.`);
        return null;
    }

    const items = smallGrid.children;
    const gridWidth = Math.sqrt(items.length); // Assuming the small grid is square

    // Initialize an empty 2D array
    const figureMatrix = [];
    for (let row = 0; row < gridWidth; row++) {
        figureMatrix[row] = []; // Initialize each row as an empty array
        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            const value = parseInt(items[index]?.getAttribute('data-value')) || 0;
            figureMatrix[row][col] = value; // Populate the 2D array
        }
    }

    return figureMatrix;
}

function filterFittingFigures(mainGridId) {
    const updatedFigurePriorities = [];

    // Iterate through each figure in figurePriorities
    figurePriorities.forEach((priority, index) => {
        // Get the figure's matrix using getFigureValues
        const figureMatrix = getFigureValues(index + 1); // Assuming figures start at 1

        // Check if the figure fits in the main grid
        if (doesFigureFitInGrid(mainGridId, figureMatrix)) {
            updatedFigurePriorities.push(priority); // Keep the original priority
        } else {
            updatedFigurePriorities.push(0); // Replace the priority with 0
        }
    });

    return updatedFigurePriorities;
}

function doesFigureFitInPartialGrid(figure1, figure2) {
    if (!Array.isArray(figure1) || !Array.isArray(figure2)) {
        console.error('Both inputs must be valid 2D arrays.');
        return false;
    }

    if (figure1.length !== figure2.length || figure1[0].length !== figure2[0].length) {
        console.error('The two arrays must have the same dimensions.');
        return false;
    }

    for (let row = 0; row < figure1.length; row++) {
        for (let col = 0; col < figure1[row].length; col++) {
            if (figure1[row][col] === 1 && figure2[row][col] !== 0) {
                return false; // Conflict: A 1 in figure1 corresponds to a non-0 in figure2
            }
        }
    }

    return true; // All 1s in figure1 correspond to 0s in figure2
}

function extractFigureFromGrid(mainGridId, startRow, startCol, height, width) {
    const mainGrid = document.getElementById(mainGridId);

    if (!mainGrid) {
        console.error(`Main grid with ID ${mainGridId} not found.`);
        return null;
    }

    const mainItems = mainGrid.children;
    const gridWidth = Math.sqrt(mainItems.length);

    // Initialize an empty figure matrix with the given dimensions
    const figureMatrix = Array.from({ length: height }, () => Array(width).fill(0));

    // Loop through the specified section of the grid and copy values
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const mainGridRow = startRow + row;
            const mainGridCol = startCol + col;

            // Check bounds
            if (mainGridRow < gridWidth && mainGridCol < gridWidth) {
                const mainIndex = mainGridRow * gridWidth + mainGridCol;
                const value = parseInt(mainItems[mainIndex]?.getAttribute('data-value')) || 0;
                figureMatrix[row][col] = value;
            }
        }
    }

    return figureMatrix;
}

function enableTouchSupportSmall(gridContainer) {
    let activeElement = null;
    let touchOffsetX = 0;
    let touchOffsetY = 0;
    let figurematrix;

    gridContainer.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        const target = event.target;
    
        if (!target.classList.contains('smallgrid-item')) return;
    
        // Clona el elemento visual para el arrastre
        const smallGrid = document.getElementById(gridContainer.id);
        const originalItems = Array.from(smallGrid.children);
        let dragImage = smallGrid.cloneNode(true); // Clone the entire small grid

        activeElement = dragImage;
        activeElement.style.position = 'absolute';
        activeElement.style.pointerEvents = 'none';
        activeElement.style.transform = 'scale(2.25)'; // Scale the clone to twice its size
        activeElement.style.zIndex = '9999';
        activeElement.setAttribute('data-source-grid-id', gridContainer.id); // Asocia el ID del grid
        document.body.appendChild(activeElement);
    

        // Calcula el offset inicial
        const rect = target.getBoundingClientRect();
        touchOffsetX = touch.clientX - rect.left;
        touchOffsetY = touch.clientY - rect.top;
    
        // Posiciona el clon inicialmente
        activeElement.style.left = `${touch.clientX - touchOffsetX}px`;
        activeElement.style.top = `${touch.clientY - touchOffsetY}px`;
    
        // Calcula y almacena las coordenadas iniciales relativas al small grid
        const sourceRect = gridContainer.getBoundingClientRect();
        const smallCellSize = sourceRect.width / 5; // Tamaño de la celda del small grid (5x5)
        const initialSmallRow = Math.floor((touch.clientY - sourceRect.top) / smallCellSize);
        const initialSmallCol = Math.floor((touch.clientX - sourceRect.left) / smallCellSize);
    
        // Almacena las coordenadas relativas en el elemento activo
        activeElement.setAttribute('data-initial-row', initialSmallRow);
        activeElement.setAttribute('data-initial-col', initialSmallCol);

        figurematrix = getFigureFromSmallGrid(gridContainer.id);
    
    });
    

    gridContainer.addEventListener('touchmove', (event) => {
        if (!activeElement) return;

        const touch = event.touches[0];
        const initialSmallRow = parseInt(activeElement.getAttribute('data-initial-row'), 10);
        const initialSmallCol = parseInt(activeElement.getAttribute('data-initial-col'), 10);
        const { FirstRow, FirstCol, LastRow, LastCol } = getFirstAndLastRowColWithValue(figurematrix);
        const mainGrid = document.getElementById('gridContainer');
        const rect = mainGrid.getBoundingClientRect();
        const cellSize = rect.width / 10; // Tamaño de la celda del main grid
        const destinationRow = Math.floor((touch.clientY - rect.top) / cellSize);
        const destinationCol = Math.floor((touch.clientX - rect.left) / cellSize);

        activeElement.style.left = `${touch.clientX - ((initialSmallCol-1)*cellSize)}px`;
        activeElement.style.top = `${touch.clientY - ((initialSmallRow-1)*cellSize)}px`;

        let sourceGridId = activeElement.getAttribute('data-source-grid-id');
        let adjustedRow = Math.max(-1, Math.min(destinationRow - initialSmallRow + FirstRow, 10));
        let adjustedCol = Math.max(-1, Math.min(destinationCol - initialSmallCol + FirstCol, 10));
        if(adjustedRow < 0 ||
            adjustedCol < 0||
            adjustedRow > 9 ||
            adjustedCol > 9
        ){cleanMainGridValuesInRange('gridContainer', 11, 19);
        }

        // Imprimir en consola si la celda ha cambiado
        if (lastHighlightedCell === null || lastHighlightedCell.row !== destinationRow || lastHighlightedCell.col !== destinationCol) {
            Copy(adjustedRow, adjustedCol, sourceGridId, 1);   
            lastHighlightedCell = { row: destinationRow, col: destinationCol }; // Actualizar la última celda rastreada
        }
    });


    gridContainer.addEventListener('touchend', (event) => {
        if (!activeElement) return;
    
        const touch = event.changedTouches[0];
        const destinationElement = document.elementFromPoint(touch.clientX, touch.clientY);
    
        if (destinationElement && destinationElement.classList.contains('maingrid-item')) {
            const mainGrid = document.getElementById('gridContainer');
            const rect = mainGrid.getBoundingClientRect();
            const cellSize = rect.width / 10; // Tamaño de la celda del main grid
            const sourceGridId = activeElement.getAttribute('data-source-grid-id');
    
            // Calcula la posición en el main grid
            const destinationRow = Math.floor((touch.clientY - rect.top) / cellSize);
            const destinationCol = Math.floor((touch.clientX - rect.left) / cellSize);
    
            // Recupera las coordenadas iniciales relativas al small grid
            const initialSmallRow = parseInt(activeElement.getAttribute('data-initial-row'), 10);
            const initialSmallCol = parseInt(activeElement.getAttribute('data-initial-col'), 10);
    
            let { FirstRow, FirstCol, LastRow, LastCol } = getFirstAndLastRowColWithValue(figurematrix);

            // Ajusta las coordenadas de destino basadas en la posición relativa inicial
            const adjustedRow = Math.max(-1, Math.min(destinationRow - initialSmallRow + FirstRow, 10));
            const adjustedCol = Math.max(-1, Math.min(destinationCol - initialSmallCol + FirstCol, 10));

    
            // Llama a Copy con las coordenadas ajustadas
            Copy(adjustedRow, adjustedCol, sourceGridId);
        }
    
        // Limpia el elemento visual del arrastre
        document.body.removeChild(activeElement);
        activeElement = null;
        cleanMainGridValuesInRange('gridContainer', 11, 19);
    });
    
    
}

function rotar(event) {
    const smallGrid = event.currentTarget.closest('.small-grid'); // Obtén la small grid asociada
    if (!smallGrid) return;

    const cells = Array.from(smallGrid.children);
    const gridSize = Math.sqrt(cells.length); // Asumimos que es una matriz cuadrada
    const newGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

    // Construimos la nueva matriz rotada
    cells.forEach((cell, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Calculamos la nueva posición de la celda en la matriz rotada
        const newRow = col;
        const newCol = gridSize - row - 1;

        // Asignamos la celda a su nueva posición
        newGrid[newRow][newCol] = cell;
    });

    // Actualizamos el DOM con la nueva disposición
    newGrid.flat().forEach(cell => smallGrid.appendChild(cell));
}

function cleanMainGridValuesInRange(containerId, minValue, maxValue) {
    const gridContainer = document.getElementById(containerId);

    if (!gridContainer) {
        console.error(`Grid container with ID "${containerId}" not found.`);
        return;
    }

    const cells = Array.from(gridContainer.children);

    cells.forEach(cell => {
        const cellValue = parseInt(cell.getAttribute('data-value')) || 0;

        if (cellValue >= minValue && cellValue <= maxValue) {
            cell.setAttribute('data-value', 0); // Resetea el valor
            cell.textContent = ''; // Limpia el contenido visible
        }
    });
}

