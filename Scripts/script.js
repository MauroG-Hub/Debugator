

function Copy(row, col, sourceGridId, Dumb) {
    cleanMainGridValuesInRange('gridContainer', 11, 19);

    if (row < 0 || col < 0) {
        if(!Dumb)console.log('The figure does not fit in that position');
        return;
    }

    if (!isValidSmallGrid(sourceGridId)) {
        console.log('Invalid Small Grid',sourceGridId);   
        return;
    }

    if (checkOverwrite(sourceGridId, 'gridContainer', row, col)) {
        if(!Dumb)console.log('The figure cannot overlap another');
        return;
    }

    if (checkOutOfBounds(sourceGridId, 'gridContainer', row, col)) {
        if(!Dumb)console.log('The figure does not fit in that position');
        return;
    }
    
    //Backup current data state
    if (!Dumb){SaveLastStep()};
    copyValuesFromGrid(sourceGridId, 'gridContainer', row, col, Dumb);

    if (!Dumb){

        // Retrieve the figure number associated with the source grid
        const smallGrid = document.getElementById(sourceGridId);
        const figureNumber = parseInt(smallGrid.getAttribute('data-figure-number')) || 0;
        clearGrid(sourceGridId);
        // Call PointSystem with the figure number
        let AmountofMiniBlocks = countOnesInFigure(figureNumber);

        PointSystem(AmountofMiniBlocks);

        let columnsToClear = analyzeColumns('gridContainer');
        let rowsToClear = analyzeRows('gridContainer');
        clearRowsAndColumns('gridContainer', rowsToClear, columnsToClear);

        if (checkAllGridsCleared(['smallGrid1', 'smallGrid2', 'smallGrid3'])) {
            cleanedGrids.clear();
            loadFigureOnPageLoad(NoNewFiguresAfterUndo);
			NoNewFiguresAfterUndo = false;
        }

        saveCurrentState();
        if ((columnsToClear == 0)&&(rowsToClear == 0)) playSound(AmountofMiniBlocks);
    

        if(doAllFiguresNotFit('gridContainer',['smallGrid1', 'smallGrid2', 'smallGrid3'])){
            const TipText = Translate(Language, 'GameOver')
            showTipPopup(TipText);

            (async () => {
                clearCurrentState();
            	showNewGameButton();
            })();

        }
		


        if (!DisableRotationTip) {
            NoRotationCount++;

            if (NoRotationCount > 5) {
                const TipText = Translate(Language, 'TipTX1')
                showTipPopup(TipText);
                DisableRotationTip = true;
                NoRotationCount = 0;
            }
        }

    }
	
}

function Select(id){
	SmallGridID = id;
};

function isValidSmallGrid(smallGridId) {
    const validIds = ['smallGrid1', 'smallGrid2', 'smallGrid3'];
    return validIds.includes(smallGridId);
}

function randomFigure() {
    
    const randomIndex = Math.floor(Math.random() * expandedList.length);
    return expandedList[randomIndex];
}

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}
   
function copyValuesFromGrid(gridId, mainGridId, startRow, startCol, Dumb) {
    const figurematrix = getFigureFromSmallGrid(gridId);
    const coordinates = getFirstAndLastRowColWithValue(figurematrix);
    if (!coordinates) {
        console.error('No non-zero values found in the source grid.');
        return;
    }

    const sourceGrid = document.getElementById(gridId);
    const mainGrid = document.getElementById(mainGridId);

    const sourceItems = sourceGrid.children;
    const mainItems = mainGrid.children;

    const { FirstRow: sourceStartRow, FirstCol: sourceStartCol, LastRow: sourceEndRow, LastCol: sourceEndCol } = coordinates;
    const gridWidth = Math.sqrt(sourceItems.length);
    const mainGridWidth = Math.sqrt(mainItems.length);

    for (let row = 0; row <= (sourceEndRow - sourceStartRow); row++) {
        for (let col = 0; col <= (sourceEndCol - sourceStartCol); col++) {
            const sourceIndex = (sourceStartRow + row) * gridWidth + (sourceStartCol + col);
            const targetIndex = (startRow + row) * mainGridWidth + (startCol + col);
            let FinalValue;

            if (startRow + row < mainGridWidth && startCol + col < mainGridWidth) {
                const value = sourceItems[sourceIndex]?.getAttribute('data-value') || 0;

                if (value > 0) {
                    FinalValue = value;
                    if(Dumb){FinalValue = Math.abs(value) + 10;}
                    mainItems[targetIndex].setAttribute('data-value', parseInt(FinalValue));
                    mainItems[targetIndex].textContent = FinalValue;
                }
            }
        }
    }
}

function getFirstAndLastRowColWithValue(figure) {
 
    if (!Array.isArray(figure) || !Array.isArray(figure[0])) {
        console.error('The provided figure is not a valid 2D array.');
        return null;
    }

    const numRows = figure.length;
    const numCols = figure[0].length;

    let FirstRow = 10;
    let FirstCol = 10;
    let LastRow = 0;
    let LastCol = 0;

    // Iterate through rows
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numRows; col++) {
            const index = row * numRows + col;
            const value = figure[row][col];

            if (value !== 0 && FirstRow === 10) {
                FirstRow = row;
            }
            if (value !== 0) {
                LastRow = row;
            }
        }
    }

    // Iterate through columns
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numCols; row++) {
            const index = row * numCols + col;
            const value = figure[row][col];

            if (value !== 0 && FirstCol === 10) {
                FirstCol = col;
            }
            if (value !== 0) {
                LastCol = col;
            }
        }
    }

    if (FirstRow === 10) { FirstRow = 0; }
    if (FirstCol === 10) { FirstCol = 0; }

    return { FirstRow, FirstCol, LastRow, LastCol };
}

function checkOverwrite(gridId, mainGridId, startRow, startCol) {
    const figurematrix = getFigureFromSmallGrid(gridId);
    const coordinates = getFirstAndLastRowColWithValue(figurematrix);
    if (!coordinates) {
        console.error('No non-zero values found in the source grid.');
        return false;
    }

    const sourceGrid = document.getElementById(gridId);
    const mainGrid = document.getElementById(mainGridId);

    const sourceItems = sourceGrid.children;
    const mainItems = mainGrid.children;

    const { FirstRow: sourceStartRow, FirstCol: sourceStartCol, LastRow: sourceEndRow, LastCol: sourceEndCol } = coordinates;
    const gridWidth = Math.sqrt(sourceItems.length);
    const mainGridWidth = Math.sqrt(mainItems.length);

    for (let row = 0; row <= (sourceEndRow - sourceStartRow); row++) {
        for (let col = 0; col <= (sourceEndCol - sourceStartCol); col++) {
            const sourceIndex = (sourceStartRow + row) * gridWidth + (sourceStartCol + col);
            const targetIndex = (startRow + row) * mainGridWidth + (startCol + col);

            if (startRow + row < mainGridWidth && startCol + col < mainGridWidth) {
                const sourceValue = parseInt(sourceItems[sourceIndex]?.getAttribute('data-value')) || 0;
                const targetValue = parseInt(mainItems[targetIndex]?.getAttribute('data-value')) || 0;

                if (sourceValue > 0 && (targetValue > 0 && targetValue < 10)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function checkOutOfBounds(gridId, mainGridId, startRow, startCol) {
    const figurematrix = getFigureFromSmallGrid(gridId);
    const coordinates = getFirstAndLastRowColWithValue(figurematrix);
    if (!coordinates) {
        console.error('No non-zero values found in the source grid.');
        return false;
    }

    const mainGrid = document.getElementById(mainGridId);
    const mainItems = mainGrid.children;

    const { FirstRow: sourceStartRow, FirstCol: sourceStartCol, LastRow: sourceEndRow, LastCol: sourceEndCol } = coordinates;
    const mainGridWidth = Math.sqrt(mainItems.length);

    if (startRow + (sourceEndRow - sourceStartRow) >= mainGridWidth || startCol + (sourceEndCol - sourceStartCol) >= mainGridWidth) {
        return true;
    }

    return false;
}

function clearGrid(gridId) {
    const grid = document.getElementById(gridId);

    if (!grid) {
        console.error(`Element with ID ${gridId} not found.`);
        return;
    }

    const items = grid.children;

    for (let item of items) {
        item.setAttribute('data-value', 0);
        item.textContent = 0;
    }
    grid.setAttribute('data-figure-number', 0);
    cleanedGrids.add(gridId);
   
}

function checkAllGridsCleared(gridIds) {
    for (let gridId of gridIds) {
        if (!cleanedGrids.has(gridId)) {
            return false;
        }
    }
    return true;
}

function analyzeRows(mainGridId) {
    const mainGrid = document.getElementById(mainGridId);
    const rowsToClear = [];

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return rowsToClear;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    for (let row = 0; row < gridWidth; row++) {
        let fullRow = true;

        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            const value = parseInt(items[index].getAttribute('data-value')) || 0;

            if ((value === 0)||(value >= 10)) {
                fullRow = false;
                break;
            }
        }

        if (fullRow) {
            rowsToClear.push(row);
        }
    }

    return rowsToClear;
}

function clearRowsAndColumns(mainGridId, rowsToClear, columnsToClear) {
    const mainGrid = document.getElementById(mainGridId);

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    rowsToClear.forEach(row => {
        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            items[index].setAttribute('data-value', 0);
            items[index].textContent = 0;
        }
    });
	
	columnsToClear.forEach(col => {
        for (let row = 0; row < gridWidth; row++) {
            const index = row * gridWidth + col;
            items[index].setAttribute('data-value', 0);
            items[index].textContent = 0;
        }
    });
    let Miniblockscleared = (rowsToClear.length + columnsToClear.length)*10;
	PointSystem(Miniblockscleared);
    playSoundLoop(Miniblockscleared/10,'LineCleared');

	
	
}

function analyzeColumns(mainGridId) {
    const mainGrid = document.getElementById(mainGridId);
    const columnsToClear = [];

    if (!mainGrid) {
        console.error(`Element with ID ${mainGridId} not found.`);
        return columnsToClear;
    }

    const items = mainGrid.children;
    const gridWidth = Math.sqrt(items.length);

    for (let col = 0; col < gridWidth; col++) {
        let fullColumn = true;

        for (let row = 0; row < gridWidth; row++) {
            const index = row * gridWidth + col;
            const value = parseInt(items[index].getAttribute('data-value')) || 0;

            if ((value === 0)||(value >= 10)) {
                fullColumn = false;
                break;
            }
        }

        if (fullColumn) {
            columnsToClear.push(col);
        }
    }

    return columnsToClear;
}

function getFigureFromSmallGrid(smallGridId) {
    const smallGrid = document.getElementById(smallGridId);

    if (!smallGrid) {
        console.error(`Grid with ID ${smallGridId} not found.`);
        return null;
    }

    const items = smallGrid.children;
    const gridWidth = Math.sqrt(items.length); // Assuming the small grid is square

    // Initialize an empty 2D array
    const figureMatrix = [];
    for (let row = 0; row < gridWidth; row++) {
        figureMatrix[row] = []; // Initialize each row as an empty array
        for (let col = 0; col < gridWidth; col++) {
            const index = row * gridWidth + col;
            const value = parseInt(items[index]?.getAttribute('data-value')) || 0;
            figureMatrix[row][col] = value; // Populate the 2D array
        }
    }

    return figureMatrix;
}

function filterFittingFigures(mainGridId) {
    const updatedFigureFits = [];
    let figureMatrix;

    for(let index = 1; index <= 22; index++){

        // Get the figure's matrix using getFigureValues
        figureMatrix = getFigureValues(index);

        // Check if the figure fits in the main grid
        if (doesAnyRotationFit(mainGridId, figureMatrix)) {
            updatedFigureFits.push(index); // Keep the original priority
        } else {
            updatedFigureFits.push(0); // Replace the priority with 0
        }

    };

    return updatedFigureFits;
}

function enableTouchSupportSmall(gridContainer, document) {
    let activeElement = null;
    let touchOffsetX = 0;
    let touchOffsetY = 0;
    let figurematrix;

    gridContainer.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        const target = event.target;

    
        if (!target.classList.contains('smallgrid-item')) return;
    
            // Clona el elemento visual para el arrastre
            const smallGrid = document.getElementById(gridContainer.id);
            const originalItems = Array.from(smallGrid.children);
            let dragImage = smallGrid.cloneNode(true); // Clone the entire small grid

            activeElement = dragImage;
            activeElement.classList.add('drag-clone');
            activeElement.style.position = 'absolute';
            activeElement.style.pointerEvents = 'none';
            activeElement.style.transform = 'scale(2.25)'; // Scale the clone to twice its size
            activeElement.style.zIndex = '9999';
            activeElement.setAttribute('data-source-grid-id', gridContainer.id); // Asocia el ID del grid
            document.body.appendChild(activeElement);
        

        
            // Calcula y almacena las coordenadas iniciales relativas al small grid
            const sourceRect = gridContainer.getBoundingClientRect();
            const smallCellSize = sourceRect.width / 5; // Tamaño de la celda del small grid (5x5)
            const initialSmallRow = Math.floor((touch.clientY - sourceRect.top) / smallCellSize);
            const initialSmallCol = Math.floor((touch.clientX - sourceRect.left) / smallCellSize);

            
            // Calcula el offset inicial
            const Grid = document.getElementById('smallGrid1');
            const rect = Grid.getBoundingClientRect();
            const cellSize = rect.width / 5; // Tamaño de la celda del main grid
            
            //event.preventDefault();

            activeElement.style.left = `${touch.clientX - ((initialSmallCol+1)*cellSize)}px`;
            activeElement.style.top = `${touch.clientY - ((initialSmallRow+1)*cellSize*1.8)}px`;
            
        
            // Almacena las coordenadas relativas en el elemento activo
            activeElement.setAttribute('data-initial-row', initialSmallRow);
            activeElement.setAttribute('data-initial-col', initialSmallCol);

            figurematrix = getFigureFromSmallGrid(gridContainer.id);
        
    });
    

    document.addEventListener('touchmove', (event) => {
        if (!activeElement) return;

        const touch = event.touches[0];
        const initialSmallRow = parseInt(activeElement.getAttribute('data-initial-row'), 10);
        const initialSmallCol = parseInt(activeElement.getAttribute('data-initial-col'), 10);
        const { FirstRow, FirstCol, LastRow, LastCol } = getFirstAndLastRowColWithValue(figurematrix);
        const MainGrid = document.getElementById('gridContainer');
        const Mainrect = MainGrid.getBoundingClientRect();
        const MaincellSize = Mainrect.width / 10; // Tamaño de la celda del main grid
        

        //event.preventDefault();
        const SmallGrid = document.getElementById('smallGrid1');
        const smallrect = SmallGrid.getBoundingClientRect();
        const SmallcellSize = smallrect.width / 5; // Tamaño de la celda del main grid
        let PosY = touch.clientY - ((initialSmallRow+1)*SmallcellSize*1.8);
        let PosX = touch.clientX - ((initialSmallCol+1)*SmallcellSize)
        activeElement.style.left = `${PosX}px`;
        activeElement.style.top = `${PosY}px`;

        const destinationRow = Math.round(((PosY - (1.62*MaincellSize) - Mainrect.top) / MaincellSize));
        const destinationCol = Math.round(((PosX - (1.36*MaincellSize) - Mainrect.left) / MaincellSize));
        
        let sourceGridId = activeElement.getAttribute('data-source-grid-id');
        let adjustedRow = Math.max(-1, Math.min(destinationRow + FirstRow, 10));
        let adjustedCol = Math.max(-1, Math.min(destinationCol + FirstCol, 10));
        if(adjustedRow < 0 ||
            adjustedCol < 0||
            adjustedRow > 9 ||
            adjustedCol > 9
        ){cleanMainGridValuesInRange('gridContainer', 11, 19);
        }

        // Imprimir en consola si la celda ha cambiado
        if (lastHighlightedCell === null || lastHighlightedCell.row !== destinationRow || lastHighlightedCell.col !== destinationCol) {
            Copy(adjustedRow, adjustedCol, sourceGridId, 1);   
            lastHighlightedCell = { row: destinationRow, col: destinationCol }; // Actualizar la última celda rastreada
        }
    });


    document.addEventListener('touchend', (event) => {
        AfterTouchActions();

    });

	document.addEventListener('touchcancel', (event) => {
		AfterTouchActions();
	});
	
	document.body.addEventListener('touchmove', (e) => {
		if (activeElement) e.preventDefault();
	}, { passive: false });
	
	function AfterTouchActions(){
	        if (!activeElement) return;
			if (!NoDropWhileRotate) {
			
				const touch = event.changedTouches[0];
				const destinationElement = document.elementFromPoint(touch.clientX, touch.clientY);
			
				//if (destinationElement && destinationElement.classList.contains('maingrid-item')) {}
				const initialSmallRow = parseInt(activeElement.getAttribute('data-initial-row'), 10);
				const initialSmallCol = parseInt(activeElement.getAttribute('data-initial-col'), 10);
				const { FirstRow, FirstCol, LastRow, LastCol } = getFirstAndLastRowColWithValue(figurematrix);
				const MainGrid = document.getElementById('gridContainer');
				const Mainrect = MainGrid.getBoundingClientRect();
				const MaincellSize = Mainrect.width / 10; // Tamaño de la celda del main grid
				const SmallGrid = document.getElementById('smallGrid1');
				const smallrect = SmallGrid.getBoundingClientRect();
				const SmallcellSize = smallrect.width / 5; // Tamaño de la celda del main grid
				let PosY = touch.clientY - ((initialSmallRow+1)*SmallcellSize*1.8);
				let PosX = touch.clientX - ((initialSmallCol+1)*SmallcellSize)
				activeElement.style.left = `${PosX}px`;
				activeElement.style.top = `${PosY}px`;
		
				const destinationRow = Math.round(((PosY - (1.62*MaincellSize) - Mainrect.top) / MaincellSize));
				const destinationCol = Math.round(((PosX - (1.36*MaincellSize) - Mainrect.left) / MaincellSize));
				
				let sourceGridId = activeElement.getAttribute('data-source-grid-id');
				let adjustedRow = Math.max(-1, Math.min(destinationRow + FirstRow, 10));
				let adjustedCol = Math.max(-1, Math.min(destinationCol + FirstCol, 10));
		
					   
					
					// Llama a Copy con las coordenadas ajustadas
					Copy(adjustedRow, adjustedCol, sourceGridId,0);
				
			
			};
			
			NoDropWhileRotate = false;
		
			
		
			// Limpia el elemento visual del arrastre
			document.body.removeChild(activeElement);
			activeElement = null;
			cleanMainGridValuesInRange('gridContainer', 11, 19);

	}
	
    gridContainer.addEventListener('touchcancel', () => {
        if (activeElement) {
            document.body.removeChild(activeElement);
            activeElement = null;
            console.log("Clon eliminado debido a un touchcancel.");
        }
    });
    
    
    
}

function rotar(event) {

    NoDropWhileRotate = true;

    const smallGrid = event.currentTarget.closest('.small-grid'); // Obtén la small grid asociada
    if (!smallGrid) return;

    const cells = Array.from(smallGrid.children);
    const gridSize = Math.sqrt(cells.length); // Asumimos que es una matriz cuadrada
    const newGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

    NoRotationCount = 0;
    DisableRotationTip = true;

    // Construimos la nueva matriz rotada
    cells.forEach((cell, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Calculamos la nueva posición de la celda en la matriz rotada
        const newRow = col;
        const newCol = gridSize - row - 1;

        // Asignamos la celda a su nueva posición
        newGrid[newRow][newCol] = cell;
    });

    // Actualizamos el DOM con la nueva disposición
    newGrid.flat().forEach(cell => smallGrid.appendChild(cell));
}

function cleanMainGridValuesInRange(containerId, minValue, maxValue) {
    const gridContainer = document.getElementById(containerId);

    if (!gridContainer) {
        console.error(`Grid container with ID "${containerId}" not found.`);
        return;
    }

    const cells = Array.from(gridContainer.children);

    cells.forEach(cell => {
        const cellValue = parseInt(cell.getAttribute('data-value')) || 0;

        if (cellValue >= minValue && cellValue <= maxValue) {
            cell.setAttribute('data-value', 0); // Resetea el valor
            cell.textContent = ''; // Limpia el contenido visible
        }
    });
}

function removeRemainingClones() {
    const clones = document.querySelectorAll('.drag-clone'); // Selecciona todos los clones
    clones.forEach(clone => {
        clone.remove(); // Elimina cada clon encontrado
    });
}

document.addEventListener('DOMContentLoaded', removeRemainingClones);

function showTipPopup(message) {
    // Crea el contenedor del popup
    const popup = document.createElement('div');
    popup.classList.add('tip-popup');
    popup.innerHTML = message; // Cambiar a innerHTML para admitir HTML

    // Crea el botón para cerrar
    const closeButton = document.createElement('button');
    console.log(Language);
    closeButton.textContent = Translate(Language, 'Close');
    closeButton.classList.add('popup-close-button');
    closeButton.onclick = () => {
        popup.remove(); // Elimina el popup del DOM
    };

    // Agrega el botón al popup
    popup.appendChild(closeButton);

    // Agrega el popup al cuerpo del documento
    document.body.appendChild(popup);

    // Estilos básicos para el popup
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid #ccc';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';

    // Estilos para el botón
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#007BFF';
    closeButton.style.color = '#fff';
    closeButton.style.cursor = 'pointer';
    closeButton.style.borderRadius = '5px';
}

function repeatFunction(func, times, arg) {
    if (typeof func !== 'function') {
        throw new Error('The first argument must be a function.');
    }
    if (typeof times !== 'number' || times < 0 || !Number.isInteger(times)) {
        return arg;
    }
    
    if (times === 0) {
        return arg;
    }
    
    for (let i = 0; i < times; i++) {
        arg = func(arg);
    }
    return arg;
}
