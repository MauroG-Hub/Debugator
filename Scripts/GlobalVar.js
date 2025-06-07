
let TotalPoints = 0;
let SmallGridID;
let expandedList = [];
let cleanedGrids = new Set();
let lastHighlightedCell = null; // Para rastrear la última celda impresa
let NoRotationCount = 0;
let DisableRotationTip = false;
const levelContainer = document.getElementById('level-container');
const scoreElement = document.getElementById('total-score');
let Level = 1;
let figurePriorities = figurePrioritiesLevels[Level - 1];
let figurePrioritiesFittable = figurePriorities;
let NoDropWhileRotate = false;
let NoNewFiguresAfterUndo = false;


class GameState {
       constructor(
        mainGrid = [],
        smallGrid1 = [],
        smallGrid2 = [],
        smallGrid3 = [],
        figure1 = 0,
        figure2 = 0,
        figure3 = 0,
        score = 0,
        language = 'EN',
        Sound = true,
        clrGrids = new Set(),
        
    ) {
        this.MainGrid = mainGrid;
        this.SmallGrid1 = smallGrid1;
        this.SmallGrid2 = smallGrid2;
        this.SmallGrid3 = smallGrid3;
        this.FigureNumber1 = figure1;
        this.FigureNumber2 = figure2;
        this.FigureNumber3 = figure3;
        this.Score = score;
        this.language = language;
        this.Sound = Sound;
        this.ClrGrids = clrGrids;
        
    }
}

let LastStep = new GameState();
let CurrentState = new GameState();

