

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

    const rect = smallGridsContainer.getBoundingClientRect();
    let Buttonwith = rect.right + 60;
    let Buttonhigth = rect.top + (rect.height/2);
    

    if(screenWidth < 570){
        Buttonwith = rect.right + 40;
    }

    if(screenWidth < 550){
        Buttonwith = rect.right - (rect.width/2);
        Buttonhigth = rect.top + rect.height + 50;

        if(screenHeight < 1000){
            Buttonhigth = rect.top + rect.height + 40;
            if(screenHeight < 530){
                Buttonwith = rect.right + 40;
                Buttonhigth = rect.top + (rect.height/2);
            }
        }
    }

    undoButton.style.left = `${Buttonwith}px`;
    undoButton.style.top = `${Buttonhigth}px`;

};