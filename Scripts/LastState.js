

function SaveLastStep() {

	LastStep = UpdateValues();
    showUndoButton();

};



function backupGrid(Grid, GridBackup) {

    GridBackup = []; // Reset the backup
    const cells = Array.from(Grid.children);

    cells.forEach(cell => {
        GridBackup.push({
            value: parseInt(cell.getAttribute('data-value')) || 0,
            text: cell.textContent || '0',
        });
    });

    return GridBackup;
};


function RecoverLastStep(){
    hideUndoButton();
    ApplyGridSaveData("gridContainer", LastStep.MainGrid, 0);
    ApplyGridSaveData("smallGrid1", LastStep.SmallGrid1, LastStep.FigureNumber1);
    ApplyGridSaveData("smallGrid2", LastStep.SmallGrid2, LastStep.FigureNumber2);
    ApplyGridSaveData("smallGrid3", LastStep.SmallGrid3, LastStep.FigureNumber3);
    TotalPoints = LastStep.Score;
    
    cleanedGrids.clear();
    LastStep.ClrGrids.forEach((item) => {
        cleanedGrids.add(item);
    });   

    PointSystem(0);
	NoNewFiguresAfterUndo = true;
	hideNewGameButton();

};

function ApplyGridSaveData(GridID, SaveData, figureNumber){
    
    const Grid = document.getElementById(GridID);

    if (!Grid) {
        console.error(`Grid with ID ${Grid} not found.`);
        return null;
    };

    Grid.setAttribute('data-figure-number', figureNumber);

    const items = Grid.children;
    const gridWidth = Math.sqrt(items.length); // Assuming the small grid is square

    for (let row = 0; row < gridWidth; row++) {
        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            let Value = SaveData[index].Value;
            items[index].setAttribute('data-value', SaveData[index].value);
            items[index].textContent = SaveData[index].text;
        }
    }
};

function hideUndoButton() {
    const undoButton = document.querySelector('.Undo-button');
    if (!undoButton.classList.contains('hidden')) {
        undoButton.classList.add('hidden');
    }
};


function showUndoButton() {
    document.querySelector('.Undo-button').classList.remove('hidden');
};


function positionUndoButton(screenWidth, screenHeight) {
    const smallGridsContainer = document.querySelector('#smallgridoutsidewrapper');
    const undoButton = document.querySelector('.Undo-button');
    const maningrid = document.querySelector('.grid-wrapperOutside');
    const Menu = document.querySelector('#menu-toggle-btn');
    const Score = document.querySelector('#score-container');

    let fontSize = (cellSize < 30) ? (Math.max(10, cellSize - 10) + "px") : "20px";
    undoButton.style.fontSize = fontSize;

    const rect = smallGridsContainer.getBoundingClientRect();
    const SizeUndo = undoButton.getBoundingClientRect();
    const SizeMenu = Menu.getBoundingClientRect();
    const SizeMainGrid = maningrid.getBoundingClientRect();
    const SizeScore = Score.getBoundingClientRect();
    
    let ButtonX = 0;
    let ButtonY = 0;
    

    let BottomGap = screenHeight - rect.bottom;
    let RightGap = screenWidth - rect.right;
    let TopGap = SizeMainGrid.top - SizeMenu.bottom;
    let TopLeftGap = SizeScore.left;


    if (SizeUndo.height < (BottomGap - 10)) {
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
        // Default position near the menu
        ButtonY = SizeMenu.bottom + TopGap / 2;
        const gap = TopLeftGap - SizeMenu.right;
        ButtonX = gap < (SizeUndo.width * 1.3)
            ? TopLeftGap / 2
            : SizeMenu.right + (gap / 2);
    }    

    undoButton.style.left = `${ButtonX}px`;
    undoButton.style.top = `${ButtonY}px`;

};