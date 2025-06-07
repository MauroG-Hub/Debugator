

async function saveCurrentState() {
		
	CurrentState = UpdateValues();
	
    const { Preferences } = window.Capacitor.Plugins;

    // Convert Set to Array before saving
    const dataToSave = {
        ...CurrentState,
        ClrGrids: Array.from(CurrentState.ClrGrids)
    };

    await Preferences.set({
        key: 'CurrentState',
        value: JSON.stringify(dataToSave)
    });

}


function UpdateValues() {
	
    const MainGridItem = document.getElementById('gridContainer');
    const SmallGrid1Item = document.getElementById('smallGrid1');
    const SmallGrid2Item = document.getElementById('smallGrid2');
    const SmallGrid3Item = document.getElementById('smallGrid3');

    const newLastStep = {
        MainGrid: backupGrid(MainGridItem, []),
        SmallGrid1: backupGrid(SmallGrid1Item, []),
        SmallGrid2: backupGrid(SmallGrid2Item, []),
        SmallGrid3: backupGrid(SmallGrid3Item, []),
        FigureNumber1: parseInt(SmallGrid1Item.getAttribute('data-figure-number') || 0),
        FigureNumber2: parseInt(SmallGrid2Item.getAttribute('data-figure-number') || 0),
        FigureNumber3: parseInt(SmallGrid3Item.getAttribute('data-figure-number') || 0),
        Score: TotalPoints,
        language: Language,
        Sound: CurrentState.Sound,
        ClrGrids: new Set(cleanedGrids)
    };

    return newLastStep;
}

function clrGrid(Grid, GridBackup) {

    GridBackup = []; // Reset the backup
    const cells = Array.from(Grid.children);

    cells.forEach(cell => {
        GridBackup.push({
            value: 0,
            text: '0',
        });
    });

    return GridBackup;
};

async function clearCurrentState() {

     const MainGridItem = document.getElementById('gridContainer');
     const SmallGrid1Item = document.getElementById('smallGrid1');
     const SmallGrid2Item = document.getElementById('smallGrid2');
     const SmallGrid3Item = document.getElementById('smallGrid3');


    const newLastStep = new GameState(
        clrGrid(MainGridItem, []),
        clrGrid(SmallGrid1Item, []),
        clrGrid(SmallGrid2Item, []),
        clrGrid(SmallGrid3Item, []),
        0, // FigureNumber1
        0, // FigureNumber2
        0, // FigureNumber3
        0, // Score
        'EN',
        true,
        new Set(cleanedGrids),
        
    );


    CurrentState = newLastStep;

        const { Preferences } = window.Capacitor.Plugins;

        // Convert Set to Array before saving
        const dataToSave = {
            ...CurrentState,
            ClrGrids: Array.from(CurrentState.ClrGrids)
        };

        await Preferences.set({
            key: 'CurrentState',
            value: JSON.stringify(dataToSave)
        });

 
}




async function loadCurrentState() {
    try {

        const { Preferences } = await waitForCapacitor();

        const { value } = await Preferences.get({ key: 'CurrentState' });

        if (value) {
            const parsed = JSON.parse(value);

            return {
                ...parsed,
                ClrGrids: new Set(parsed.ClrGrids)
            };
        } else {
            return new GameState();

        }
    } catch (error) {
        console.error('Error al cargar estado:', error);
        return new GameState();
    }
}


async function waitForCapacitor() {
    return new Promise((resolve, reject) => {
        const maxAttempts = 1;
        let attempts = 0;

        function check() {
            if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Preferences) {
                resolve(window.Capacitor.Plugins);
            } else if (attempts >= maxAttempts) {
                reject('Capacitor no se cargó a tiempo');
            } else {
                attempts++;
                setTimeout(check, 50);
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', check);
        } else {
            check();
        }
    });
}

function ApplyRecoverState(){
    ApplyGridSaveData("gridContainer", CurrentState.MainGrid, 0);
    ApplyGridSaveData("smallGrid1", CurrentState.SmallGrid1, CurrentState.FigureNumber1);
    ApplyGridSaveData("smallGrid2", CurrentState.SmallGrid2, CurrentState.FigureNumber2);
    ApplyGridSaveData("smallGrid3", CurrentState.SmallGrid3, CurrentState.FigureNumber3);
    TotalPoints = CurrentState.Score;

    cleanedGrids.clear();
        CurrentState.ClrGrids.forEach((item) => {
            cleanedGrids.add(item);
        });

    PointSystem(0);
};