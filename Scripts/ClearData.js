

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
    const Score = document.querySelector('#score-container');
    const NewGameButton = document.querySelector('.NewGame-button');
    const Level = document.querySelector('#level-container');
    const maningrid = document.querySelector('.grid-wrapperOutside');
    

    let fontSize = (cellSize < 30) ? (Math.max(10, cellSize - 10) + "px") : "20px";
    NewGameButton.style.fontSize = fontSize;

    const SizeScore = Score.getBoundingClientRect();
    const SizeLevel = Level.getBoundingClientRect();
    const SizeNewGameButton = NewGameButton.getBoundingClientRect();
    const SizeMainGrid = maningrid.getBoundingClientRect();

    let ButtonX = 0;
    let ButtonY = 0;

    let RightGap = screenWidth - SizeScore.right;
    let TopGap = SizeScore.top;
   
    
    if(TopGap > (SizeNewGameButton.height + 10) ){
        ButtonY = TopGap/2;
        ButtonX = screenWidth/2;
    }
    else{
        ButtonY = SizeLevel.bottom + (SizeMainGrid.top-SizeLevel.bottom) / 2;
        const gap = RightGap - SizeLevel.left;
        ButtonX = gap < (SizeNewGameButton.width * 1.3)
            ? (RightGap / 2) + SizeScore.right
            : SizeLevel.left + (gap / 2);
    }
	



    NewGameButton.style.left = `${ButtonX}px`;
    NewGameButton.style.top = `${ButtonY}px`;

};

