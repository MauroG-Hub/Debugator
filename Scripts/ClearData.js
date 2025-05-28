

function ClearData(){
    hideNewGameButton();
	ClearGridData("gridContainer");
    TotalPoints = 0;
    PointSystem(0);
	
    cleanedGrids.clear();
    LastStep.ClrGrids.forEach((item) => {
        cleanedGrids.add(item);
    });   

    
	loadFigureOnPageLoad();
	hideUndoButton();

};

function hideNewGameButton() {
    const NewGameButton = document.querySelector('.NewGame-button');
    if (!NewGameButton.classList.contains('hidden')) {
        NewGameButton.classList.add('hidden');
    }
};


function showNewGameButton() {
	const screenWidth = window.innerWidth;  // Screen width
    const screenHeight = window.innerHeight; // Screen height
	positionNewGameButton(screenWidth, screenHeight);
    document.querySelector('.NewGame-button').classList.remove('hidden');
};

function ClearGridData(GridID){
    
    const Grid = document.getElementById(GridID);
	const GridWidth = 10;

    if (!Grid) {
        console.error(`Grid with ID ${Grid} not found.`);
        return null;
    };
	
	const items = Grid.children;
	
    for (let row = 0; row < GridWidth; row++) {
        for (let col = 0; col < GridWidth; col++) {
            const index = row * GridWidth + col;
            let value = 0;
            items[index].setAttribute('data-value', value);
            items[index].textContent = "";
        }
    }
};

function positionNewGameButton(screenWidth, screenHeight) {
    const ReferenceContainer = document.querySelector('#score-container');
    const NewGameButton = document.querySelector('.NewGame-button');

    const rect = ReferenceContainer.getBoundingClientRect();
    let Buttonwith = rect.left + ((rect.right-rect.left)/2);
    let Buttonhigth = rect.top - 15;
  
	if (screenHeight < 900) {
		Buttonwith = rect.right + 80;
		Buttonhigth = rect.top + ((rect.bottom - rect.top)/2) + 10;
	}

    NewGameButton.style.left = `${Buttonwith}px`;
    NewGameButton.style.top = `${Buttonhigth}px`;

};

