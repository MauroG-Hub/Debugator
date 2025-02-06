
document.addEventListener('DOMContentLoaded', () => {

    const ButtonText = Translate(Language, "Start");
    const Button = document.getElementById("Startbutton");
    Button.innerText=  ButtonText;
    
});

document.getElementById("Startbutton").addEventListener("click",
    function() {
        window.location.href = `Screens/GameScreen.html?lang=${Language}`;
    }
);