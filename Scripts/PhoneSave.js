

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
        ClrGrids: new Set(cleanedGrids)
    };

    return newLastStep;
}

async function clearCurrentState() {
    const { Preferences } = window.Capacitor.Plugins;

    // Convert Set to Array before saving
    const dataToSave = {
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
            return {
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
        }
    } catch (error) {
        console.error('Error al cargar estado:', error);
        return {
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
    }
}


async function waitForCapacitor() {
    return new Promise((resolve, reject) => {
        const maxAttempts = 100;
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
