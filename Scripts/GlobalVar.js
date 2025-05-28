
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

let LastStep = {
    MainGrid: [],
    SmallGrid1: [],
    SmallGrid2: [],
    SmallGrid3: [],
    FigureNumber1: 0,
    FigureNumber2: 0,
    FigureNumber3: 0,
    Score: 0,
    ClrGrids: new Set()
};

let CurrentState = {
    MainGrid: [],
    SmallGrid1: [],
    SmallGrid2: [],
    SmallGrid3: [],
    FigureNumber1: 0,
    FigureNumber2: 0,
    FigureNumber3: 0,
    Score: 0,
    ClrGrids: new Set()
};