
// ------ Languages  -----------------


let Language = "EN";


let Translations = {
	
	EN: {
		LanguageName: "English",
		Start: "Start",
		Level: "Level",
		Undo: "Undo",
		Close: "Close",
		GameOver: "Game Over<br>",
		Tip: "Tip",
		TipTX1: "Tip:<br>Figure can be rotated<br>Just touch it<br>"
	},
	
	ES: {
		LanguageName: "Español",
		Start: "Iniciar",
		Level: "Nivel",
		Undo: "Deshacer",
		Close: "Cerrar",
		GameOver: "Perdiste<br>",
		Tip: "Consejo",
		TipTX1: "Consejo:<br>Las figuras pueden girar<br>con un toque<br>"
	},
	
	FR: {
		LanguageName: "Français",
		Start: "Commencer",
		Level: "Niveau",
		Undo: "Défaire",
		Close: "Fermer",
		GameOver: "Partie perdue<br>",
		Tip: "Conseil",
		TipTX1: "Conseil:<br>Les formes peuvent pivoter<br>avec une touche<br>"
	}
	
};


function Translate(LanguageCode, TextKey){

	if(!Translations[LanguageCode]){
		console.log(`Error: No translation for this language [${LanguageCode}`);
		return `No translation for this language [${LanguageCode}`;
	}

	if(!Translations[LanguageCode][TextKey]){
		console.log(`Error: TextKey ${TextKey} not found in language ${LanguageCode}`);
		return `TextKey ${TextKey} not found in language ${LanguageCode}`;
	}
	return Translations[LanguageCode][TextKey];
};

function SetLanguage(LanguageCode){
    
    Language = LanguageCode;
    localStorage.setItem('Language', LanguageCode);
    const ButtonText = Translate(Language, "Start");
    const Button = document.getElementById("Startbutton");
    Button.innerText=  ButtonText;
    


}