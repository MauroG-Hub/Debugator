// ------ Languages  -----------------

let Language = "EN"; // Stores the currently selected language code

// Object containing translations for supported languages (EN, ES, FR)
let Translations = {
    EN: {
        LanguageName: "English",
        Start: "Start",
        Level: "Level",
        Undo: "Undo",
        NewGame: "New Game",
        Close: "Close",
        GameOver: "Game Over<br>",
        Tip: "Tip",
        TipTX1: "Tip:<br>Figure can be rotated<br>Just touch it<br>",
        Return: "Return",
        Menu: "Menu",
        DisableSound: "Disable Sound",
        EnableSound: "Enable Sound"
    },
    ES: {
        LanguageName: "Español",
        Start: "Iniciar",
        Level: "Nivel",
        Undo: "Deshacer",
        NewGame: "Nuevo Juego",
        Close: "Cerrar",
        GameOver: "Perdiste<br>",
        Tip: "Consejo",
        TipTX1: "Consejo:<br>Las figuras pueden girar<br>con un toque<br>",
        Return: "Regresar",
        Menu: "Menu",
        DisableSound: "Apagar Sonido",
        EnableSound: "Encender Sonido"
    },
    FR: {
        LanguageName: "Français",
        Start: "Commencer",
        Level: "Niveau",
        Undo: "Défaire",
        NewGame: "Nouveau Jeu",
        Close: "Fermer",
        GameOver: "Partie perdue<br>",
        Tip: "Conseil",
        TipTX1: "Conseil:<br>Les formes peuvent pivoter<br>avec une touche<br>",
        Return: "Retourner",
        Menu: "Menu",
        DisableSound: "Désactiver son",
        EnableSound: "Activer son"
    }
};


// Returns the translation for a given language code and text key
function Translate(LanguageCode, TextKey) {
    // Check if the language exists in the translations object
    if(!Translations[LanguageCode]){
        console.log(`Error: No translation for this language [${LanguageCode}`);
        return `No translation for this language [${LanguageCode}`;
    }

    // Check if the text key exists in the selected language
    if(!Translations[LanguageCode][TextKey]){
        console.log(`Error: TextKey ${TextKey} not found in language ${LanguageCode}`);
        return `TextKey ${TextKey} not found in language ${LanguageCode}`;
    }
    // Return the translated text
    return Translations[LanguageCode][TextKey];
};


// Sets the current language and updates the "Start" button text
function SetLanguage(LanguageCode){
    Language = LanguageCode; // Update the global language variable
    const ButtonText = Translate(Language, "Start"); // Get the translation for "Start"
    const Button = document.getElementById("Startbutton"); // Get the Start button element
    Button.innerText=  ButtonText; // Set the button's text to the translated value
}
