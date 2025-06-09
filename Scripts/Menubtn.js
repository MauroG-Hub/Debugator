const menuButtons = [
    { textKey: 'Return', href: '../index.html' },                  // Button to return to the main page
    { textKey: 'NewGame', onClick: () => ClearData() },            // Button to start a new game
    { textKey: 'DisableSound', onClick: () => ToggleSound() }      // Button to toggle sound
];


// Toggles the visibility of the dropdown menu
function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Hide dropdown when clicking outside, except when clicking on the dropdown button or specific sound options
window.onclick = function(event) {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const dropdownButton = document.querySelector('.dropdown-button');

    if (!event.target.matches('.dropdown-button')) {
        const clickedElement = event.target;
        const buttonKey = clickedElement.getAttribute('data-button-key');
        if (buttonKey != 'DisableSound' && buttonKey != 'EnableSound'){
            dropdownMenu.style.display = "none";
        }
    }
};


// Render menu buttons from the menuButtons array
function renderMenuButtons(buttons) {
    const container = document.getElementById('dropdownMenu');
    const Menu = document.getElementById('menu-toggle-btn');
    
    container.innerHTML = ''; // Clear previous content

    buttons.forEach(btn => {
        const element = document.createElement('a');
        const label = Translate(Language, btn.textKey || ''); // Translate using the text key
        let fontSize = (cellSize < 30) ? (Math.max(10, cellSize - 10) + "px") : "20px";

        element.textContent = label || btn.textKey;

        // Assign data attribute for the button key if present
        if (btn.textKey) {
            element.setAttribute('data-button-key', btn.textKey);
        }

        // Set href or onclick depending on button configuration
        if (btn.href) {
            element.href = btn.href;
        } else if (btn.onClick) {
            element.href = "#";
            element.onclick = (e) => {
                e.preventDefault();
                btn.onClick();
            };
        }
        element.style.fontSize = fontSize;
        Menu.style.fontSize = fontSize;
        container.appendChild(element);
    });
}


// Render menu buttons after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderMenuButtons === 'function') {
        renderMenuButtons(menuButtons);
    }
});
