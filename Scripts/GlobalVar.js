
let TotalPoints = 0;
let SmallGridID;
let expandedList = [];
const cleanedGrids = new Set();
let lastHighlightedCell = null; // Para rastrear la última celda impresa
let NoRotationCount = 0;
let DisableRotationTip = false;
const levelContainer = document.getElementById('level-container');
const scoreElement = document.getElementById('total-score');
let Level = 1;
let figurePriorities = figurePrioritiesLevels[Level - 1];
let figurePrioritiesFittable = figurePriorities;