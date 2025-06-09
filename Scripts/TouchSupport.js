
function enableTouchSupportSmall(gridContainer, document) {
    let activeElement = null;
    let touchOffsetX = 0;
    let touchOffsetY = 0;
    let figurematrix;

    // Handle touch start on the small grid
    gridContainer.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        const target = event.target;

        // Only react if the target is a smallgrid-item
        if (!target.classList.contains('smallgrid-item')) return;
    
        // Clone the visual element for dragging
        const smallGrid = document.getElementById(gridContainer.id);
        const originalItems = Array.from(smallGrid.children);
        let dragImage = smallGrid.cloneNode(true); // Clone the entire small grid

        activeElement = dragImage;
        activeElement.classList.add('drag-clone');
        activeElement.style.position = 'absolute';
        activeElement.style.pointerEvents = 'none';
        activeElement.style.transform = 'scale(2.25)'; // Scale the clone to twice its size
        activeElement.style.zIndex = '9999';
        activeElement.setAttribute('data-source-grid-id', gridContainer.id); // Associate the grid ID
        document.body.appendChild(activeElement);

        // Calculate and store initial coordinates relative to the small grid
        const sourceRect = gridContainer.getBoundingClientRect();
        const smallCellSize = sourceRect.width / 5; // Size of a small grid cell (5x5)
        const initialSmallRow = Math.floor((touch.clientY - sourceRect.top) / smallCellSize);
        const initialSmallCol = Math.floor((touch.clientX - sourceRect.left) / smallCellSize);

        // Calculate the initial offset
        const Grid = document.getElementById('smallGrid1');
        const rect = Grid.getBoundingClientRect();
        const cellSize = rect.width / 5; // Cell size of the main grid
        
        //activeElement.style.left = ...; and top = ...;
        activeElement.style.left = `${touch.clientX - ((initialSmallCol+1)*cellSize)}px`;
        activeElement.style.top = `${touch.clientY - ((initialSmallRow+1)*cellSize*1.8)}px`;
        
        // Store the relative coordinates in the active element
        activeElement.setAttribute('data-initial-row', initialSmallRow);
        activeElement.setAttribute('data-initial-col', initialSmallCol);

        // Store the figure matrix for later use
        figurematrix = getFigureFromSmallGrid(gridContainer.id);
    });
    

    // Handle touch move on the document (dragging)
    document.addEventListener('touchmove', (event) => {
        if (!activeElement) return;

        const touch = event.touches[0];
        const initialSmallRow = parseInt(activeElement.getAttribute('data-initial-row'), 10);
        const initialSmallCol = parseInt(activeElement.getAttribute('data-initial-col'), 10);
        const { FirstRow, FirstCol, LastRow, LastCol } = getFirstAndLastRowColWithValue(figurematrix);
        const MainGrid = document.getElementById('gridContainer');
        const Mainrect = MainGrid.getBoundingClientRect();
        const MaincellSize = Mainrect.width / 10; // Main grid cell size
        
        // Calculate new position for the dragged element
        const SmallGrid = document.getElementById('smallGrid1');
        const smallrect = SmallGrid.getBoundingClientRect();
        const SmallcellSize = smallrect.width / 5; // Small grid cell size
        let PosY = touch.clientY - ((initialSmallRow+1)*SmallcellSize*1.8);
        let PosX = touch.clientX - ((initialSmallCol+1)*SmallcellSize)
        activeElement.style.left = `${PosX}px`;
        activeElement.style.top = `${PosY}px`;

        // Calculate the destination cell in the main grid
        const destinationRow = Math.round(((PosY - (1.62*MaincellSize) - Mainrect.top) / MaincellSize));
        const destinationCol = Math.round(((PosX - (1.36*MaincellSize) - Mainrect.left) / MaincellSize));
        
        let sourceGridId = activeElement.getAttribute('data-source-grid-id');
        let adjustedRow = Math.max(-1, Math.min(destinationRow + FirstRow, 10));
        let adjustedCol = Math.max(-1, Math.min(destinationCol + FirstCol, 10));
        if(adjustedRow < 0 ||
            adjustedCol < 0||
            adjustedRow > 9 ||
            adjustedCol > 9
        ){
            cleanMainGridValuesInRange('gridContainer', 11, 19);
        }

        // Only update the highlighted cell if the position changed
        if (lastHighlightedCell === null || lastHighlightedCell.row !== destinationRow || lastHighlightedCell.col !== destinationCol) {
            Copy(adjustedRow, adjustedCol, sourceGridId, 1);   
            lastHighlightedCell = { row: destinationRow, col: destinationCol }; // Update last tracked cell
        }
    });


    // Handle touch end on the document
    document.addEventListener('touchend', (event) => {
        AfterTouchActions();
    });

    // Handle touch cancel on the document
    document.addEventListener('touchcancel', (event) => {
        AfterTouchActions();
    });
    
    // Prevent default scrolling while dragging a piece
    document.body.addEventListener('touchmove', (e) => {
        if (activeElement) e.preventDefault();
    }, { passive: false });
    
    // Helper function for handling actions after touch ends
    function AfterTouchActions(){
        if (!activeElement) return;
        if (!NoDropWhileRotate) {
            const touch = event.changedTouches[0];
            const destinationElement = document.elementFromPoint(touch.clientX, touch.clientY);

            // Calculate relative positions
            const initialSmallRow = parseInt(activeElement.getAttribute('data-initial-row'), 10);
            const initialSmallCol = parseInt(activeElement.getAttribute('data-initial-col'), 10);
            const { FirstRow, FirstCol, LastRow, LastCol } = getFirstAndLastRowColWithValue(figurematrix);
            const MainGrid = document.getElementById('gridContainer');
            const Mainrect = MainGrid.getBoundingClientRect();
            const MaincellSize = Mainrect.width / 10;
            const SmallGrid = document.getElementById('smallGrid1');
            const smallrect = SmallGrid.getBoundingClientRect();
            const SmallcellSize = smallrect.width / 5;
            let PosY = touch.clientY - ((initialSmallRow+1)*SmallcellSize*1.8);
            let PosX = touch.clientX - ((initialSmallCol+1)*SmallcellSize)
            activeElement.style.left = `${PosX}px`;
            activeElement.style.top = `${PosY}px`;

            const destinationRow = Math.round(((PosY - (1.62*MaincellSize) - Mainrect.top) / MaincellSize));
            const destinationCol = Math.round(((PosX - (1.36*MaincellSize) - Mainrect.left) / MaincellSize));
            
            let sourceGridId = activeElement.getAttribute('data-source-grid-id');
            let adjustedRow = Math.max(-1, Math.min(destinationRow + FirstRow, 10));
            let adjustedCol = Math.max(-1, Math.min(destinationCol + FirstCol, 10));
            
            // Call Copy with the adjusted coordinates
            Copy(adjustedRow, adjustedCol, sourceGridId, 0);
        };
        
        NoDropWhileRotate = false;
        // Remove the visual drag element
        document.body.removeChild(activeElement);
        activeElement = null;
        cleanMainGridValuesInRange('gridContainer', 11, 19);
    }
    
    // Handle touchcancel event for the grid
    gridContainer.addEventListener('touchcancel', () => {
        if (activeElement) {
            document.body.removeChild(activeElement);
            activeElement = null;
            console.log("Clone removed due to touchcancel.");
        }
    });
}



function cleanMainGridValuesInRange(containerId, minValue, maxValue) {
    const gridContainer = document.getElementById(containerId);

    // Check if the grid container exists
    if (!gridContainer) {
        console.error(`Grid container with ID "${containerId}" not found.`);
        return;
    }

    const cells = Array.from(gridContainer.children);

    // Iterate through each cell in the grid
    cells.forEach(cell => {
        const cellValue = parseInt(cell.getAttribute('data-value')) || 0;

        // If the value is within the specified range, reset it
        if (cellValue >= minValue && cellValue <= maxValue) {
            cell.setAttribute('data-value', 0); // Reset the value
            cell.textContent = ''; // Clear the visible content
        }
    });
}

// Removes all visual drag clones from the document
function removeRemainingClones() {
    const clones = document.querySelectorAll('.drag-clone'); // Select all clones
    clones.forEach(clone => {
        clone.remove(); // Remove each found clone
    });
}


// Remove any remaining drag clones when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', removeRemainingClones);

function showTipPopup(message) {
    // Create the popup container
    const popup = document.createElement('div');
    popup.classList.add('tip-popup');
    popup.innerHTML = message; // Use innerHTML to allow HTML content

    // Create the close button
    const closeButton = document.createElement('button');
    console.log(Language);
    closeButton.textContent = Translate(Language, 'Close');
    closeButton.classList.add('popup-close-button');
    closeButton.onclick = () => {
        popup.remove(); // Remove the popup from the DOM when clicked
    };

    // Add the close button to the popup
    popup.appendChild(closeButton);

    // Add the popup to the body
    document.body.appendChild(popup);

    // Basic styles for the popup
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

    // Styles for the close button
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = '#007BFF';
    closeButton.style.color = '#fff';
    closeButton.style.cursor = 'pointer';
    closeButton.style.borderRadius = '5px';
}

// Repeatedly applies a function to an argument a specified number of times
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
    
    // Apply the function 'times' times in a loop
    for (let i = 0; i < times; i++) {
        arg = func(arg);
    }
    return arg;
}
