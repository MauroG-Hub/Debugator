let LastFiguresLoaded = {
    FigureNumber1: 0, // Stores the last loaded figure number for small grid 1
    FigureNumber2: 0, // Stores the last loaded figure number for small grid 2
    FigureNumber3: 0  // Stores the last loaded figure number for small grid 3
};


// Loads the state of a grid container based on the provided figure number
function loadGridStateFromNumber(containerId, figureNumber) {
    // Get the grid element by its ID
    const grid = document.getElementById(containerId);

    // Store the figure number in the grid's data attribute
    grid.setAttribute('data-figure-number', figureNumber);

    // Get the grid's child elements (cells)
    const items = grid.children;

    try {
        // Retrieve the grid state (matrix) for the figure number
        let gridState = getFigureValues(figureNumber);

        // Generate a random color (number from 0 to 8)
        const color = randomNumber(9);

        let value;
        // Generate a random rotation value (-1 to 2)
        const Rotate = randomNumber(4) - 1;

        // Rotate the grid state as needed
        gridState = repeatFunction(rotateMatrix, Rotate, gridState);

        // Update the grid's state
        for (let row = 0; row < gridState.length; row++) {
            for (let col = 0; col < gridState[row].length; col++) {
                const index = row * gridState[row].length + col;
                value = gridState[row][col];
                // If the cell should be colored, assign the random color
                if (value == 1) { value = color; }
                // Set the cell's value and display text
                items[index].setAttribute('data-value', value);
                items[index].textContent = value;
            }
        }
    } catch (error) {
        // Log any error that occurs while loading the figure
        console.error('Error loading figure:', error);
    }
}


function loadFigureOnPageLoad(KeepOlds) {
    // Filter figures that fit in the main grid
    figureFittable = filterFittingFigures('gridContainer');

    // Prepare the list of figures that can be randomly selected
    prepareExpandedList(figureFittable);

    // If not keeping old figures, select new random figures for the three small grids
    if (!KeepOlds) {		
        LastFiguresLoaded.FigureNumber1 = randomFigure();
        LastFiguresLoaded.FigureNumber2 = randomFigure();
        // Ensure FigureNumber2 is not the same as FigureNumber1
        if (LastFiguresLoaded.FigureNumber1 == LastFiguresLoaded.FigureNumber2) {
            LastFiguresLoaded.FigureNumber2 = randomFigure();
        }
        LastFiguresLoaded.FigureNumber3 = randomFigure();
        // Ensure FigureNumber3 is not the same as the other two
        if ((LastFiguresLoaded.FigureNumber1 == LastFiguresLoaded.FigureNumber3) ||
            (LastFiguresLoaded.FigureNumber2 == LastFiguresLoaded.FigureNumber3)) {
            LastFiguresLoaded.FigureNumber3 = randomFigure();
        }
    }

    // Load the selected figures into the corresponding small grids
    loadGridStateFromNumber('smallGrid1', LastFiguresLoaded.FigureNumber1);
    loadGridStateFromNumber('smallGrid2', LastFiguresLoaded.FigureNumber2);
    loadGridStateFromNumber('smallGrid3', LastFiguresLoaded.FigureNumber3);
}


function initializeMainGrid(containerId, rows, cols, cellSize) {
    // Get the main grid container by its ID
    const gridContainer = document.getElementById(containerId);

    // Handler for dragover event on the main grid
    gridContainer.ondragover = function (event) {
        event.preventDefault(); // Allow dragging over the main grid

        // Calculate the mouse position inside the grid
        const mouseX = event.clientX - gridContainer.getBoundingClientRect().left;
        const mouseY = event.clientY - gridContainer.getBoundingClientRect().top;

        // Determine the row and column where the mouse is hovering
        const destinationRow = Math.floor(mouseY / cellSize);
        const destinationCol = Math.floor(mouseX / cellSize);
        // (destinationRow and destinationCol are calculated but not used here)
    };

    // Handler for drop event on the main grid
    gridContainer.ondrop = function (event) {
        event.preventDefault();
        lastHighlightedCell = null; // Reset the last tracked cell when dropping
    };

    // Create the grid cells and append them to the grid container
    for (let i = 0; i < rows * cols; i++) {
        const div = document.createElement('div');
        div.className = 'grid-item maingrid-item'; // Assign classes to each cell
        div.style.width = `${cellSize}px`;
        div.style.height = `${cellSize}px`;
        gridContainer.appendChild(div);
    }
}


function initializeSmallGrids(containerIds, rows, cols, cellSize) {
    // Loop through each container ID for the small grids
    containerIds.forEach(id => {
        const gridContainer = document.getElementById(id);

        // Create the specified number of cells for each small grid
        for (let i = 0; i < rows * cols; i++) {
            const div = document.createElement('div');
            div.className = 'grid-item smallgrid-item'; // Assign classes to each cell
            div.style.width = `${cellSize}px`;
            div.style.height = `${cellSize}px`;
            div.setAttribute('draggable', true); // Make the cell draggable

            let isDragging = false; // Track if the cell is being dragged

            // Detect drag start event
            div.addEventListener('dragstart', () => {
                isDragging = true;
            });

            // Detect drag end event
            div.addEventListener('dragend', () => {
                isDragging = false;
            });

            // Handle click event (currently does nothing)
            div.addEventListener('click', () => {
            });

            // Handle touch start event
            div.addEventListener('touchstart', () => {
                isDragging = false;
            });

            // Handle touch move event
            div.addEventListener('touchmove', () => {
                isDragging = true;
            });

            // Handle touch end event; if not dragging, rotate the cell
            div.addEventListener('touchend', (event) => {
                if (!isDragging) rotar(event);
            });

            // Append the created cell to the small grid container
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

    // ** Calculate cell sizes for main and small grids **
    const CellSizeW = Math.round(((screenWidth * 0.98) - 21.6)/10.7);
    const CellSizeH = Math.round(((screenHeight*0.95)-46.83-17.8-41.8)/(2+10.7+2.31));

    cellSize = Math.min(CellSizeW, CellSizeH);
    cellSize = Math.min(cellSize, 45); // Limit cell size to max 45px

    // ** Apply grid dimensions and gaps **
    gridContainer.style.gridTemplateColumns = `repeat(10, ${cellSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(10, ${cellSize}px)`;
    gridContainer.style.gap = `${Math.trunc((((3 / 40) * cellSize) + (-3 / 8)) * 10) / 10}px`;

    // Set up the three small grids with their own template and gap
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
        enableTouchSupportSmall(document.getElementById(id), document);
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

    // ** Set language based on URL parameter or default to English **
    const params = new URLSearchParams(window.location.search);
    Language = params.get('lang') || 'EN';

    // ** Set Undo button text according to language **
    const UnduButtonText = Translate(Language, "Undo");
    const UnduButton = document.getElementById("Undo-button");
    UnduButton.innerText = UnduButtonText;
    
    // ** Set New Game button text according to language **
    const NewGameButtonText = Translate(Language, "NewGame");
    const NewGameButton = document.getElementById("NewGame-button");
    NewGameButton.innerText = NewGameButtonText;

    // ** Set Level banner text according to language **
    const LevelTranslated = Translate(Language, 'Level');
    const LevelBanner = document.getElementById("level-container");
    LevelBanner.innerText = `${LevelTranslated}: 1`;

    // ** Load initial figures (async for state recovery) **
    (async () => {
        CurrentState = await loadCurrentState();

        // If there are no saved figures, load new ones; otherwise, recover saved state
        if (!(CurrentState.FigureNumber1 > 0) &&
            !(CurrentState.FigureNumber2 > 0) &&
            !(CurrentState.FigureNumber3 > 0)) {
            loadFigureOnPageLoad();
        }
        else
        {
            ApplyRecoverState();
        }
        // Position Undo and New Game buttons according to screen size
        positionUndoButton(screenWidth, screenHeight);
        positionNewGameButton(screenWidth, screenHeight);
    })();

    // ** Initialize and render menu buttons and level **
    updateMenuButtonLabel();
    renderMenuButtons(menuButtons);
    UpdateLevel();
});


function prepareExpandedList(figureFittable) {
    // Clear the expanded list before populating it
    expandedList = [];

    // Iterate through each figure's priority
    figurePriorities.forEach((priority, number) => {
        // Only include figures that are fittable (skip if zero)
        if (figureFittable[number] > 0) {
            // Add the figure's number to the list as many times as its priority
            for (let i = 0; i < priority; i++) {
                expandedList.push(number + 1); // Figure numbers start at 1
            }
        }
    });
}


function updateMenuButtonLabel() {
    // Get the menu toggle button element by its ID
    const btn = document.getElementById('menu-toggle-btn');

    // If the button exists, update its text content using the translated "Menu" label
    if (btn) {
        btn.textContent = Translate(Language, 'Menu');
    }
}
