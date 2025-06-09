

async function saveCurrentState() {
    // Update CurrentState with the latest values
    CurrentState = UpdateValues();
	
    const { Preferences } = window.Capacitor.Plugins;

    // Convert Set to Array before saving for serialization
    const dataToSave = {
        ...CurrentState,
        ClrGrids: Array.from(CurrentState.ClrGrids)
    };

    // Save the current state as a JSON string in preferences storage
    await Preferences.set({
        key: 'CurrentState',
        value: JSON.stringify(dataToSave)
    });
}


// Create an object representing the current state of the game
function UpdateValues() {
    const MainGridItem = document.getElementById('gridContainer');
    const SmallGrid1Item = document.getElementById('smallGrid1');
    const SmallGrid2Item = document.getElementById('smallGrid2');
    const SmallGrid3Item = document.getElementById('smallGrid3');

    const newLastStep = {
        MainGrid: backupGrid(MainGridItem, []), // Backup of main grid
        SmallGrid1: backupGrid(SmallGrid1Item, []), // Backup of small grid 1
        SmallGrid2: backupGrid(SmallGrid2Item, []), // Backup of small grid 2
        SmallGrid3: backupGrid(SmallGrid3Item, []), // Backup of small grid 3
        FigureNumber1: parseInt(SmallGrid1Item.getAttribute('data-figure-number') || 0),
        FigureNumber2: parseInt(SmallGrid2Item.getAttribute('data-figure-number') || 0),
        FigureNumber3: parseInt(SmallGrid3Item.getAttribute('data-figure-number') || 0),
        Score: TotalPoints, // Current score
        language: Language, // Current language
        Sound: CurrentState.Sound, // Current sound setting
        ClrGrids: new Set(cleanedGrids) // Set of cleaned grids
    };

    return newLastStep;
}


// Clear all values in a grid, used to reset grid state
function clrGrid(Grid, GridBackup) {
    GridBackup = []; // Reset the backup array
    const cells = Array.from(Grid.children);

    // Set each cell's value and text to zero
    cells.forEach(cell => {
        GridBackup.push({
            value: 0,
            text: '0',
        });
    });

    return GridBackup;
};


// Completely reset and save the current game state as empty/initial
async function clearCurrentState() {
    const MainGridItem = document.getElementById('gridContainer');
    const SmallGrid1Item = document.getElementById('smallGrid1');
    const SmallGrid2Item = document.getElementById('smallGrid2');
    const SmallGrid3Item = document.getElementById('smallGrid3');

    // Create a new game state with all grids cleared and values reset
    const newLastStep = new GameState(
        clrGrid(MainGridItem, []),
        clrGrid(SmallGrid1Item, []),
        clrGrid(SmallGrid2Item, []),
        clrGrid(SmallGrid3Item, []),
        0, // FigureNumber1
        0, // FigureNumber2
        0, // FigureNumber3
        0, // Score
        'EN', // Language
        true, // Sound enabled
        new Set(cleanedGrids), // Cleaned grids set
    );

    // Assign the new state as the current state
    CurrentState = newLastStep;

    const { Preferences } = window.Capacitor.Plugins;

    // Convert Set to Array before saving for serialization
    const dataToSave = {
        ...CurrentState,
        ClrGrids: Array.from(CurrentState.ClrGrids)
    };

    // Save the cleared state in preferences storage
    await Preferences.set({
        key: 'CurrentState',
        value: JSON.stringify(dataToSave)
    });
}




async function loadCurrentState() {
    try {
        // Wait for Capacitor plugins to be available
        const { Preferences } = await waitForCapacitor();

        // Get the saved game state from preferences storage
        const { value } = await Preferences.get({ key: 'CurrentState' });

        if (value) {
            // Parse the saved value and convert ClrGrids array back to a Set
            const parsed = JSON.parse(value);

            return {
                ...parsed,
                ClrGrids: new Set(parsed.ClrGrids)
            };
        } else {
            // If nothing is saved, return a new game state
            return new GameState();
        }
    } catch (error) {
        // Log error and return a new game state as fallback
        console.error('Error loading state:', error);
        return new GameState();
    }
}


// Wait for Capacitor and its Preferences plugin to be available before using them
async function waitForCapacitor() {
    return new Promise((resolve, reject) => {
        const maxAttempts = 1; // Maximum number of retry attempts
        let attempts = 0;

        function check() {
            if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Preferences) {
                // Resolve with the Plugins object if available
                resolve(window.Capacitor.Plugins);
            } else if (attempts >= maxAttempts) {
                // If maximum attempts reached, reject the promise
                reject('Capacitor did not load in time');
            } else {
                attempts++;
                setTimeout(check, 50); // Try again after 50ms
            }
        }

        if (document.readyState === 'loading') {
            // If DOM is still loading, wait for DOMContentLoaded event
            document.addEventListener('DOMContentLoaded', check);
        } else {
            // Otherwise, start checking immediately
            check();
        }
    });
}


// Apply the recovered game state to the UI and variables
function ApplyRecoverState(){
    // Restore the main grid and all three small grids using the saved state
    ApplyGridSaveData("gridContainer", CurrentState.MainGrid, 0);
    ApplyGridSaveData("smallGrid1", CurrentState.SmallGrid1, CurrentState.FigureNumber1);
    ApplyGridSaveData("smallGrid2", CurrentState.SmallGrid2, CurrentState.FigureNumber2);
    ApplyGridSaveData("smallGrid3", CurrentState.SmallGrid3, CurrentState.FigureNumber3);

    // Restore the total score from the recovered state
    TotalPoints = CurrentState.Score;

    // Restore the set of cleaned grids
    cleanedGrids.clear();
    CurrentState.ClrGrids.forEach((item) => {
        cleanedGrids.add(item);
    });

    // Update the point system display
    PointSystem(0);
};
