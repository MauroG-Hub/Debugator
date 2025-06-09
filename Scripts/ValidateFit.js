
function doAllFiguresNotFit(mainGridId, smallGridIds) {
    let AllEmpty = true; // Track if all small grids are empty
    
    // Iterate over each small grid ID
    for (let smallGridId of smallGridIds) {
        
        // Get the figure matrix from the small grid
        let figure = getFigureFromSmallGrid(smallGridId);
        
        // Skip if figure is empty or contains only zeros
        let flatFigure = figure.flat();
        
        if (Array.isArray(figure) && !flatFigure.every(val => val === 0)) {
            AllEmpty = false;
            // Check if any rotation of the figure fits in the main grid
            if (doesAnyRotationFit(mainGridId, figure)) {
                // If any figure fits, return false
                return false;
            } 
        }  
    }
    // If none of the figures fit but at least one is not empty, return true
    if (AllEmpty) { 
        return false; 
    } else { 
        return true; 
    }
}


// Check if any rotation of the figure fits in the main grid
function doesAnyRotationFit(mainGridId, figureMatrix) {
    if (!Array.isArray(figureMatrix) || !Array.isArray(figureMatrix[0])) {
        console.error('figureMatrix is not a valid 2D array.');
        return false;
    }

    const mainGrid = document.getElementById(mainGridId);

    if (!mainGrid) {
        console.error(`Grid with ID "${mainGridId}" not found.`);
        return false;
    }

    let rotatedMatrix = figureMatrix;

    // Try up to 4 rotations (0°, 90°, 180°, 270°)
    for (let i = 0; i < 4; i++) {
        const coordinates = getFirstAndLastRowColWithValue(rotatedMatrix);
        const rotatedSubFigure = extractSubFigure(rotatedMatrix, coordinates);
        
        if (doesFigureFitInGrid(mainGrid, rotatedSubFigure)) {
            return true; // If any rotation fits, return true
        }
        rotatedMatrix = rotateMatrix(rotatedMatrix); // Rotate 90° clockwise for next attempt
    }
    
    return false; // No rotation fits
}


// Rotate a matrix 90 degrees clockwise
function rotateMatrix(figureMatrix) {
    if (!Array.isArray(figureMatrix) || !Array.isArray(figureMatrix[0])) {
        console.error('figureMatrix is not a valid 2D array.');
        return null;
    }

    const gridSize = figureMatrix.length; // Assuming the matrix is square
    const rotatedMatrix = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

    // Perform the rotation
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const newRow = col;
            const newCol = gridSize - row - 1;
            rotatedMatrix[newRow][newCol] = figureMatrix[row][col];
        }
    }

    return rotatedMatrix;
}

function doesFigureFitInGrid(mainGrid, figureSubFigure) {
    // Check that the input is a valid 2D array
    if (!Array.isArray(figureSubFigure) || !Array.isArray(figureSubFigure[0])) {
        console.error('figureSubFigure is not a valid 2D array.');
        return false;
    }

    const mainGridItems = mainGrid.children;
    const gridSize = Math.sqrt(mainGridItems.length); // Assuming the grid is square

    const subGridHeight = figureSubFigure.length;
    const subGridWidth = figureSubFigure[0].length;

    // Iterate over every valid starting position in the main grid
    for (let startRow = 0; startRow <= gridSize - subGridHeight; startRow++) {
        for (let startCol = 0; startCol <= gridSize - subGridWidth; startCol++) {
            // Check if the figure can fit in the main grid at this position
            if (compareSubmatrices(mainGrid, figureSubFigure, startRow, startCol)) {
                return true; // Return true on the first valid position
            }
        }
    }

    return false; // No valid position found
}


// Compares a figure's submatrix with a subgrid of the main grid
function compareSubmatrices(mainGrid, figureSubFigure, startRow, startCol) {
    // Validate that figureSubFigure is a 2D array
    if (!Array.isArray(figureSubFigure) || !Array.isArray(figureSubFigure[0])) {
        console.error('figureSubFigure is not a valid 2D array.');
        return false;
    }

    const subGridHeight = figureSubFigure.length;
    const subGridWidth = figureSubFigure[0].length;

    // Extract the corresponding subgrid from the main grid
    const subGrid = extractSubgrid(mainGrid, startRow, startCol, subGridHeight, subGridWidth);

    // Ensure the subgrid is a valid 2D array
    if (!Array.isArray(subGrid) || !Array.isArray(subGrid[0])) {
        console.error('Failed to extract a valid subgrid.');
        return false;
    }

    // Compare each position in the matrices for conflicts
    for (let row = 0; row < subGridHeight; row++) {
        for (let col = 0; col < subGridWidth; col++) {
            // If both the figure and the subgrid have a nonzero value, they conflict
            if (figureSubFigure[row][col] !== 0 && subGrid[row][col] !== 0) {
                return false; // Conflict found, so the figure cannot fit here
            }
        }
    }

    return true; // All ones in figureSubFigure correspond to zeros in subGrid
}


// Extracts a submatrix from a figure matrix using given boundaries
function extractSubFigure(figureMatrix, boundaries) {
    const { FirstRow, FirstCol, LastRow, LastCol } = boundaries;

    // Validate that figureMatrix is a 2D array
    if (!Array.isArray(figureMatrix) || !Array.isArray(figureMatrix[0])) {
        console.error('The provided figureMatrix is not a valid 2D array.');
        return null;
    }

    // Validate that boundaries are within the matrix
    if (
        FirstRow < 0 || FirstCol < 0 || 
        LastRow >= figureMatrix.length || LastCol >= figureMatrix[0].length
    ) {
        console.error('Boundaries are out of range of the provided matrix.');
        return null;
    }

    // Extract the submatrix
    const subMatrix = [];
    for (let row = FirstRow; row <= LastRow; row++) {
        const newRow = figureMatrix[row].slice(FirstCol, LastCol + 1); // Extract columns in range
        subMatrix.push(newRow);
    }

    return subMatrix;
}


// Extracts a rectangular subgrid from the main grid based on start position and size
function extractSubgrid(mainGrid, startRow, startCol, subGridHeight, subGridWidth) {
    const mainGridItems = mainGrid.children;
    const gridSize = Math.sqrt(mainGridItems.length); // Assuming the grid is square

    // Validate the requested subgrid is within the grid bounds
    if (startRow < 0 || startCol < 0 || startRow + subGridHeight > gridSize || startCol + subGridWidth > gridSize) {
        console.error('Invalid subgrid dimensions or starting position.');
        return null;
    }

    // Initialize an empty subgrid with the specified dimensions
    const subGrid = Array.from({ length: subGridHeight }, () => Array(subGridWidth).fill(0));

    // Populate the subgrid with values from the main grid
    for (let row = 0; row < subGridHeight; row++) {
        for (let col = 0; col < subGridWidth; col++) {
            const mainGridRow = startRow + row;
            const mainGridCol = startCol + col;

            // Calculate the 1D index of the main grid
            const mainGridIndex = mainGridRow * gridSize + mainGridCol;
            const cellValue = parseInt(mainGridItems[mainGridIndex]?.getAttribute('data-value')) || 0;
            subGrid[row][col] = cellValue;
        }
    }

    return subGrid;
}



