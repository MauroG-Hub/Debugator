

const menuButtons = [
    { textKey: 'Return', href: '../index.html' },
    { textKey: 'NewGame', onClick: () => ClearData() },
    { textKey: 'DisableSound', onClick: () => ToggleSound() }
];




function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

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


// Cargar botones del menú desde menubtn.js
function renderMenuButtons(buttons) {
    const container = document.getElementById('dropdownMenu');
    const Menu = document.getElementById('menu-toggle-btn');
    
    container.innerHTML = '';

    buttons.forEach(btn => {
        const element = document.createElement('a');
        const label = Translate(Language, btn.textKey || ''); // Traducir usando la clave
        let fontSize = (cellSize < 30) ? (Math.max(10, cellSize - 10) + "px") : "20px";

        element.textContent = label || btn.textKey;

        if (btn.textKey) {
            element.setAttribute('data-button-key', btn.textKey);
        }

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



// Esperar a que DOM cargue para renderizar botones
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderMenuButtons === 'function') {
        renderMenuButtons(menuButtons);
    }
});