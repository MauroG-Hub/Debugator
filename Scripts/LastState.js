function SaveLastStep() {
    // Save the current game state by calling UpdateValues and assigning it to LastStep
    LastStep = UpdateValues();

    // Show the undo button to allow the user to undo the last step
    showUndoButton();
};


function backupGrid(Grid, GridBackup) {

    GridBackup = []; // Reset the backup array

    // Convert the grid's child nodes (cells) into an array
    const cells = Array.from(Grid.children);

    // Iterate over each cell to extract its value and text
    cells.forEach(cell => {
        GridBackup.push({
            value: parseInt(cell.getAttribute('data-value')) || 0, // Numeric value stored in 'data-value'
            text: cell.textContent || '0', // Cell text content, or '0' if empty
        });
    });

    // Return the backup array containing cell values and text
    return GridBackup;
};



function RecoverLastStep(){
    // Hide the undo button
    hideUndoButton();

    // Restore the main grid to its previous state
    ApplyGridSaveData("gridContainer", LastStep.MainGrid, 0);

    // Restore the three small grids to their previous state and figures
    ApplyGridSaveData("smallGrid1", LastStep.SmallGrid1, LastStep.FigureNumber1);
    ApplyGridSaveData("smallGrid2", LastStep.SmallGrid2, LastStep.FigureNumber2);
    ApplyGridSaveData("smallGrid3", LastStep.SmallGrid3, LastStep.FigureNumber3);

    // Restore the total points from the last step
    TotalPoints = LastStep.Score;
    
    // Clear the set of cleaned grids and add each one from the last step
    cleanedGrids.clear();
    LastStep.ClrGrids.forEach((item) => {
        cleanedGrids.add(item);
    });   

    // Update the point system display
    PointSystem(0);

    // Prevent new figures from appearing after undo
    NoNewFiguresAfterUndo = true;

    // Hide the "New Game" button
    hideNewGameButton();
};


function ApplyGridSaveData(GridID, SaveData, figureNumber){
    
    // Get the grid element by its ID
    const Grid = document.getElementById(GridID);

    // If the grid is not found, log an error and exit the function
    if (!Grid) {
        console.error(`Grid with ID ${Grid} not found.`);
        return null;
    };

    // Set the figure number as a data attribute on the grid
    Grid.setAttribute('data-figure-number', figureNumber);

    // Get the grid's child items (cells)
    const items = Grid.children;
    // Calculate grid width (assumes the grid is square)
    const gridWidth = Math.sqrt(items.length);

    // Iterate over each row and column of the grid
    for (let row = 0; row < gridWidth; row++) {
        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            // Restore cell's value and text from the saved data
            let Value = SaveData[index].Value; // Note: This variable is not used
            items[index].setAttribute('data-value', SaveData[index].value);
            items[index].textContent = SaveData[index].text;
        }
    }
};


function hideUndoButton() {
    // Select the undo button element by its class
    const undoButton = document.querySelector('.Undo-button');

    // If the undo button is not already hidden, add the "hidden" class
    if (!undoButton.classList.contains('hidden')) {
        undoButton.classList.add('hidden');
    }
};



function showUndoButton() {
    // Get the Undo button element
    const undoButton = document.querySelector('.Undo-button');

    if (undoButton.classList.contains('hidden')) {
        // Remove the "hidden" class to show the button
        undoButton.classList.remove('hidden');

        // Get the current screen width and height
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Position the Undo button based on screen size
        positionUndoButton(screenWidth, screenHeight);
    }
}



function positionUndoButton(screenWidth, screenHeight) {
    // Select relevant elements from the DOM
    const smallGridsContainer = document.querySelector('#smallgridoutsidewrapper');
    const undoButton = document.querySelector('.Undo-button');
    const maningrid = document.querySelector('.grid-wrapperOutside');
    const Menu = document.querySelector('#menu-toggle-btn');
    const Score = document.querySelector('#score-container');

    // Set the font size of the undo button based on cell size
    let fontSize = (cellSize < 30) ? (Math.max(10, cellSize - 10) + "px") : "20px";
    undoButton.style.fontSize = fontSize;

    // Get size and position for relevant elements
    const rect = smallGridsContainer.getBoundingClientRect();
    const SizeUndo = undoButton.getBoundingClientRect();
    const SizeMenu = Menu.getBoundingClientRect();
    const SizeMainGrid = maningrid.getBoundingClientRect();
    const SizeScore = Score.getBoundingClientRect();
    
    let ButtonX = 0;
    let ButtonY = 0;

    // Calculate gaps for positioning
    let BottomGap = screenHeight - rect.bottom;
    let RightGap = screenWidth - rect.right;
    let TopGap = SizeMainGrid.top - SizeMenu.bottom;
    let TopLeftGap = SizeScore.left;

    // Position the undo button depending on available space
    if ((SizeUndo.height*1.5) < BottomGap) {
        // Place button below, centered horizontally
        ButtonX = rect.right - (rect.width / 2);
        ButtonY = Math.min(
            screenHeight - ((screenHeight - rect.bottom) / 2),
            rect.bottom + cellSize
        );
    } else if (SizeUndo.width < (RightGap - 10)) {
        // Place button to the right, aligned vertically
        ButtonY = rect.top + (rect.height / 2);
        ButtonX = (RightGap > (SizeUndo.width * 2))
            ? SizeMainGrid.right + (SizeUndo.width / 2)
            : rect.right + (RightGap / 2);
    } else {
        // Default position near the menu if other positions don't fit
        ButtonY = SizeMenu.bottom + TopGap / 2;
        const gap = TopLeftGap - SizeMenu.right;
        ButtonX = gap < (SizeUndo.width * 1.3)
            ? TopLeftGap / 2
            : SizeMenu.right + (gap / 2);
    }    

    // Set the calculated position of the undo button
    undoButton.style.left = `${ButtonX}px`;
    undoButton.style.top = `${ButtonY}px`;
};
