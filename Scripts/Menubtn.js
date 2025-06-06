

const menuButtons = [
    { textKey: 'Return', href: '../index.html' },
    { textKey: 'NewGame', onClick: () => ClearData() }
];




function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
        document.getElementById("dropdownMenu").style.display = "none";
    }
};


// Cargar botones del menú desde menubtn.js
function renderMenuButtons(buttons) {
    const container = document.getElementById('dropdownMenu');
    container.innerHTML = '';

    buttons.forEach(btn => {
        const element = document.createElement('a');
        const label = Translate(Language, btn.textKey || ''); // Traducir usando la clave

        element.textContent = label || btn.textKey;

        if (btn.href) {
            element.href = btn.href;
        } else if (btn.onClick) {
            element.href = "#";
            element.onclick = (e) => {
                e.preventDefault();
                btn.onClick();
                document.getElementById("dropdownMenu").style.display = "none";
            };
        }

        container.appendChild(element);
    });
}



// Esperar a que DOM cargue para renderizar botones
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderMenuButtons === 'function') {
        renderMenuButtons(menuButtons);
    }
});