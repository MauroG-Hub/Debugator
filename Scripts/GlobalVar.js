let TotalPoints = 0; // Holds the total points of the current game
let SmallGridID; // Stores the ID of the currently active small grid
let expandedList = []; // Used for weighted random selection of figures
let cleanedGrids = new Set(); // Tracks the grids that have been cleaned
let lastHighlightedCell = null; // Tracks the last cell that was highlighted/printed
let NoRotationCount = 0; // Counts the number of times rotation is not used
let DisableRotationTip = false; // Indicates if the rotation tip should be disabled
const levelContainer = document.getElementById('level-container'); // Reference to the level container element
const scoreElement = document.getElementById('total-score'); // Reference to the score display element
let Level = 1; // Current level of the game
let figurePriorities = figurePrioritiesLevels[Level - 1]; // Priority array for figures, based on current level
let figurePrioritiesFittable = figurePriorities; // Stores priorities for figures that can fit
let NoDropWhileRotate = false; // Prevents dropping while a figure is being rotated
let NoNewFiguresAfterUndo = false; // Prevents new figures from appearing after an undo
let cellSize = 0; // Size of a single grid cell


// Class representing the state of the game at any given point
class GameState {
    constructor(
        mainGrid = [],        // Array representing the main grid
        smallGrid1 = [],      // Array for small grid 1
        smallGrid2 = [],      // Array for small grid 2
        smallGrid3 = [],      // Array for small grid 3
        figure1 = 0,          // Number of the first figure
        figure2 = 0,          // Number of the second figure
        figure3 = 0,          // Number of the third figure
        score = 0,            // Current score
        language = 'EN',      // Selected language
        Sound = true,         // Indicates if sound is enabled
        clrGrids = new Set(), // Set of cleared grids
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

let LastStep = new GameState(); // Stores the previous state for undo functionality
let CurrentState = new GameState(); // Stores the current game state
