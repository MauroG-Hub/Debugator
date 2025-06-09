function ClearData(){
    // Hide the "New Game" button
    hideNewGameButton();

    // Clear the main grid data
    ClearGridData("gridContainer");

    // Reset total points to zero
    TotalPoints = 0;

    // Update the point system to zero
    PointSystem(0);

    // Clear the set of cleaned grids
    cleanedGrids.clear();

    // Add all items from the last step's cleared grids to cleanedGrids
    LastStep.ClrGrids.forEach((item) => {
        cleanedGrids.add(item);
    });   

    // Load figures as if the page was loaded for the first time
    loadFigureOnPageLoad();

    // Hide the undo button
    hideUndoButton();
};


function hideNewGameButton() {
    // Select the "New Game" button by class
    const NewGameButton = document.querySelector('.NewGame-button');
    
    // If the button is not already hidden, add the "hidden" class
    if (!NewGameButton.classList.contains('hidden')) {
        NewGameButton.classList.add('hidden');
    }
};


function showNewGameButton() {
    // Get the New Game button element
    const newGameButton = document.querySelector('.NewGame-button');

    if (newGameButton.classList.contains('hidden')) {
        // Remove the "hidden" class to show the button
        newGameButton.classList.remove('hidden');

        // Get the current screen width and height
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Position the "New Game" button based on screen size
        positionNewGameButton(screenWidth, screenHeight);
    }
}


function ClearGridData(GridID){
    // Get the grid element by ID
    const Grid = document.getElementById(GridID);
    const GridWidth = 10; // Number of columns/rows in the grid

    // If grid is not found, log error and return
    if (!Grid) {
        console.error(`Grid with ID ${Grid} not found.`);
        return null;
    };
    
    // Get all children (cells) of the grid
    const items = Grid.children;
    
    // Loop through all rows and columns
    for (let row = 0; row < GridWidth; row++) {
        for (let col = 0; col < GridWidth; col++) {
            const index = row * GridWidth + col; // Calculate cell index
            let value = 0; // Default cell value
            // Reset cell value and content
            items[index].setAttribute('data-value', value);
            items[index].textContent = "";
        }
    }
};


function positionNewGameButton(screenWidth, screenHeight) {
    // Select score, button, level, and main grid elements
    const Score = document.querySelector('#score-container');
    const NewGameButton = document.querySelector('.NewGame-button');
    const Level = document.querySelector('#level-container');
    const maningrid = document.querySelector('.grid-wrapperOutside');
    
    // Adjust font size based on cell size (cellSize must be defined globally)
    let fontSize = (cellSize < 30) ? (Math.max(10, cellSize - 10) + "px") : "20px";
    NewGameButton.style.fontSize = fontSize;

    // Get size and position for relevant elements
    const SizeScore = Score.getBoundingClientRect();
    const SizeLevel = Level.getBoundingClientRect();
    const SizeNewGameButton = NewGameButton.getBoundingClientRect();
    const SizeMainGrid = maningrid.getBoundingClientRect();

    let ButtonX = 0;
    let ButtonY = 0;

    // Calculate right and top gaps
    let RightGap = screenWidth - SizeScore.right;
    let TopGap = SizeScore.top;
   
    // If there is enough space at the top, position the button above
    if(TopGap > (SizeNewGameButton.height + 10) ){
        ButtonY = TopGap/2;
        ButtonX = screenWidth/2;
    }
    // Otherwise, position the button between level and grid
    else{
        ButtonY = SizeLevel.bottom + (SizeMainGrid.top - SizeLevel.bottom) / 2;
        const gap = RightGap - SizeLevel.left;
        ButtonX = gap < (SizeNewGameButton.width * 1.3)
            ? (RightGap / 2) + SizeScore.right // If gap is too small, move closer to score
            : SizeLevel.left + (gap / 2);      // Else, center between level and right edge
    }

    // Set the button's left and top position in pixels
    NewGameButton.style.left = `${ButtonX}px`;
    NewGameButton.style.top = `${ButtonY}px`;
};
