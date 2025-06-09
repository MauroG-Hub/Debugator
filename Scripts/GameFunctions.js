function Copy(row, col, sourceGridId, Dumb) {
    // Clean main grid values in a certain range
    cleanMainGridValuesInRange('gridContainer', 11, 19);

    // If the position is invalid, exit
    if (row < 0 || col < 0) {
        if (!Dumb) console.log('The figure does not fit in that position');
        return;
    }

    // Check if the small grid is valid
    if (!isValidSmallGrid(sourceGridId)) {
        console.log('Invalid Small Grid', sourceGridId);   
        return;
    }

    // Check if there would be an overlap
    if (checkOverwrite(sourceGridId, 'gridContainer', row, col)) {
        if (!Dumb) console.log('The figure cannot overlap another');
        return;
    }

    // Check if the figure would be out of bounds
    if (checkOutOfBounds(sourceGridId, 'gridContainer', row, col)) {
        if (!Dumb) console.log('The figure does not fit in that position');
        return;
    }
    
    // Backup current data state before making changes
    if (!Dumb) { SaveLastStep(); }
    copyValuesFromGrid(sourceGridId, 'gridContainer', row, col, Dumb);

    if (!Dumb) {
        // Retrieve the figure number associated with the source grid
        const smallGrid = document.getElementById(sourceGridId);
        const figureNumber = parseInt(smallGrid.getAttribute('data-figure-number')) || 0;
        clearGrid(sourceGridId);

        // Count the number of "mini blocks" in the figure and update points
        let AmountofMiniBlocks = countOnesInFigure(figureNumber);
        PointSystem(AmountofMiniBlocks);

        // Analyze which columns and rows need to be cleared and clear them
        let columnsToClear = analyzeColumns('gridContainer');
        let rowsToClear = analyzeRows('gridContainer');
        clearRowsAndColumns('gridContainer', rowsToClear, columnsToClear);

        // If all small grids are cleared, reload new figures
        if (checkAllGridsCleared(['smallGrid1', 'smallGrid2', 'smallGrid3'])) {
            cleanedGrids.clear();
            loadFigureOnPageLoad(NoNewFiguresAfterUndo);
            NoNewFiguresAfterUndo = false;
        }

        // Save the current game state
        saveCurrentState();

        // Play sound only if no rows or columns were cleared
        if ((columnsToClear == 0) && (rowsToClear == 0)) playSound(AmountofMiniBlocks);

        // Show Game Over if none of the figures fit
        if (doAllFiguresNotFit('gridContainer', ['smallGrid1', 'smallGrid2', 'smallGrid3'])) {
            const TipText = Translate(Language, 'GameOver');
            showTipPopup(TipText);

            (async () => {
                clearCurrentState();
                showNewGameButton();
            })();
        }

        // Show tip about rotation if it hasn't been shown enough times
        if (!DisableRotationTip) {
            NoRotationCount++;
            if (NoRotationCount > 5) {
                const TipText = Translate(Language, 'TipTX1');
                showTipPopup(TipText);
                DisableRotationTip = true;
                NoRotationCount = 0;
            }
        }
    }
}


function rotar(event) {
    NoDropWhileRotate = true;

    // Get the closest small grid element to the event target
    const smallGrid = event.currentTarget.closest('.small-grid');
    if (!smallGrid) return;

    const cells = Array.from(smallGrid.children);
    const gridSize = Math.sqrt(cells.length); // Assume square matrix
    const newGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

    NoRotationCount = 0;
    DisableRotationTip = true;

    // Build the new rotated matrix
    cells.forEach((cell, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Calculate the new position in the rotated matrix
        const newRow = col;
        const newCol = gridSize - row - 1;

        // Assign the cell to its new position
        newGrid[newRow][newCol] = cell;
    });

    // Update the DOM with the new arrangement
    newGrid.flat().forEach(cell => smallGrid.appendChild(cell));
}


function clearGrid(gridId) {
    const grid = document.getElementById(gridId);

    if (!grid) {
        console.error(`Element with ID ${gridId} not found.`);
        return;
    }

    const items = grid.children;

    // Set all cells to 0 and clear their text content
    for (let item of items) {
        item.setAttribute('data-value', 0);
        item.textContent = 0;
    }
    grid.setAttribute('data-figure-number', 0);
    cleanedGrids.add(gridId); // Mark this grid as cleared
}


function Select(id){
    // Set the global SmallGridID to the selected grid's id
    SmallGridID = id;
};

function isValidSmallGrid(smallGridId) {
    // Return true if the id is one of the three valid small grid ids
    const validIds = ['smallGrid1', 'smallGrid2', 'smallGrid3'];
    return validIds.includes(smallGridId);
}

function randomFigure() {
    // Select a random figure number from the expanded list
    const randomIndex = Math.floor(Math.random() * expandedList.length);
    return expandedList[randomIndex];
}

function randomNumber(max) {
    // Generate a random integer between 1 and max (inclusive)
    return Math.floor(Math.random() * max) + 1;
}
   
function copyValuesFromGrid(gridId, mainGridId, startRow, startCol, Dumb) {
    // Get the figure matrix from the selected small grid
    const figurematrix = getFigureFromSmallGrid(gridId);
    // Get the coordinates of the non-zero area in the matrix
    const coordinates = getFirstAndLastRowColWithValue(figurematrix);
    if (!coordinates) {
        console.error('No non-zero values found in the source grid.');
        return;
    }

    const sourceGrid = document.getElementById(gridId);
    const mainGrid = document.getElementById(mainGridId);

    const sourceItems = sourceGrid.children;
    const mainItems = mainGrid.children;

    // Extract boundaries from the coordinates object
    const { FirstRow: sourceStartRow, FirstCol: sourceStartCol, LastRow: sourceEndRow, LastCol: sourceEndCol } = coordinates;
    const gridWidth = Math.sqrt(sourceItems.length);
    const mainGridWidth = Math.sqrt(mainItems.length);

    // Copy values from the source grid to the main grid at the specified position
    for (let row = 0; row <= (sourceEndRow - sourceStartRow); row++) {
        for (let col = 0; col <= (sourceEndCol - sourceStartCol); col++) {
            const sourceIndex = (sourceStartRow + row) * gridWidth + (sourceStartCol + col);
            const targetIndex = (startRow + row) * mainGridWidth + (startCol + col);
            let FinalValue;

            if (startRow + row < mainGridWidth && startCol + col < mainGridWidth) {
                const value = sourceItems[sourceIndex]?.getAttribute('data-value') || 0;

                if (value > 0) {
                    FinalValue = value;
                    // If Dumb is true, adjust the value for visualization/debugging
                    if(Dumb){FinalValue = Math.abs(value) + 10;}
                    mainItems[targetIndex].setAttribute('data-value', parseInt(FinalValue));
                    mainItems[targetIndex].textContent = FinalValue;
                }
            }
        }
    }
}


function getFirstAndLastRowColWithValue(figure) {
    // Check if the input is a valid 2D array
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

    // Iterate through rows to find the first and last rows with a nonzero value
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

    // Iterate through columns to find the first and last columns with a nonzero value
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

    // If nothing found, default to 0
    if (FirstRow === 10) { FirstRow = 0; }
    if (FirstCol === 10) { FirstCol = 0; }

    return { FirstRow, FirstCol, LastRow, LastCol };
}


// Checks if placing the figure from gridId at the given position would overwrite existing values in the main grid
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

    // Loop over the area the figure would occupy
    for (let row = 0; row <= (sourceEndRow - sourceStartRow); row++) {
        for (let col = 0; col <= (sourceEndCol - sourceStartCol); col++) {
            const sourceIndex = (sourceStartRow + row) * gridWidth + (sourceStartCol + col);
            const targetIndex = (startRow + row) * mainGridWidth + (startCol + col);

            if (startRow + row < mainGridWidth && startCol + col < mainGridWidth) {
                const sourceValue = parseInt(sourceItems[sourceIndex]?.getAttribute('data-value')) || 0;
                const targetValue = parseInt(mainItems[targetIndex]?.getAttribute('data-value')) || 0;

                // If both have nonzero values in the overlap area, return true (conflict)
                if (sourceValue > 0 && (targetValue > 0 && targetValue < 10)) {
                    return true;
                }
            }
        }
    }

    return false;
}


// Checks if placing the figure from gridId at the given position would be out of bounds in the main grid
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

    // If the figure would extend beyond the grid, return true (out of bounds)
    if (startRow + (sourceEndRow - sourceStartRow) >= mainGridWidth || startCol + (sourceEndCol - sourceStartCol) >= mainGridWidth) {
        return true;
    }

    return false;
}


function checkAllGridsCleared(gridIds) {
    // Check if every gridId in the array is present in the cleanedGrids set
    for (let gridId of gridIds) {
        if (!cleanedGrids.has(gridId)) {
            return false;
        }
    }
    return true;
}


// Analyze all rows of the main grid and return a list of rows that are completely filled (no zeros or high values)
function analyzeRows(mainGridId) {
    const mainGrid = document.getElementById(mainGridId);
    const rowsToClear = [];

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return rowsToClear;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    // Loop over each row
    for (let row = 0; row < gridWidth; row++) {
        let fullRow = true;

        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            const value = parseInt(items[index].getAttribute('data-value')) || 0;

            // If the value is 0 or 10 or higher, the row is not full
            if ((value === 0)||(value >= 10)) {
                fullRow = false;
                break;
            }
        }

        // If the row is completely filled, add its index to the list
        if (fullRow) {
            rowsToClear.push(row);
        }
    }

    return rowsToClear;
}


// Clears the specified rows and columns in the main grid, then updates the score and plays sound
function clearRowsAndColumns(mainGridId, rowsToClear, columnsToClear) {
    const mainGrid = document.getElementById(mainGridId);

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    // Clear specified rows
    rowsToClear.forEach(row => {
        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            items[index].setAttribute('data-value', 0);
            items[index].textContent = 0;
        }
    });

    // Clear specified columns
    columnsToClear.forEach(col => {
        for (let row = 0; row < gridWidth; row++) {
            const index = row * gridWidth + col;
            items[index].setAttribute('data-value', 0);
            items[index].textContent = 0;
        }
    });

    // Calculate how many miniblocks were cleared for scoring
    let Miniblockscleared = (rowsToClear.length + columnsToClear.length) * 10;
    PointSystem(Miniblockscleared);

    // Play the line clear sound the corresponding number of times
    playSoundLoop(Miniblockscleared / 10, 'LineCleared');
}

function analyzeColumns(mainGridId) {
    // Find all columns in the main grid that are completely filled (no zeros or high values)
    const mainGrid = document.getElementById(mainGridId);
    const columnsToClear = [];

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return columnsToClear;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    // Loop over each column
    for (let col = 0; col < gridWidth; col++) {
        let fullColumn = true;

        for (let row = 0; row < gridWidth; row++) {
            const index = row * gridWidth + col;
            const value = parseInt(items[index].getAttribute('data-value')) || 0;

            // If the value is 0 or 10 or higher, the column is not full
            if ((value === 0) || (value >= 10)) {
                fullColumn = false;
                break;
            }
        }

        // If the column is completely filled, add its index to the list
        if (fullColumn) {
            columnsToClear.push(col);
        }
    }

    return columnsToClear;
}


function getFigureFromSmallGrid(smallGridId) {
    // Build a 2D array (matrix) representing the small grid's current state
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
    // Return an array where each index has the figure number if it fits, or 0 if it does not
    const updatedFigureFits = [];
    let figureMatrix;

    for(let index = 1; index <= 22; index++) {

        // Get the figure's matrix using getFigureValues
        figureMatrix = getFigureValues(index);

        // Check if the figure fits in the main grid in any rotation
        if (doesAnyRotationFit(mainGridId, figureMatrix)) {
            updatedFigureFits.push(index); // Keep the original priority
        } else {
            updatedFigureFits.push(0); // Replace the priority with 0
        }
    };

    return updatedFigureFits;
}
