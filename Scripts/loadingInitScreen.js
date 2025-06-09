document.addEventListener('DOMContentLoaded', () => {
    // Get the translated text for the "Start" button
    const ButtonText = Translate(Language, "Start");
    // Get the "Start" button element by its ID
    const Button = document.getElementById("Startbutton");
    // Set the button's inner text to the translated text
    Button.innerText = ButtonText;
});

// Add a click event listener to the "Start" button
document.getElementById("Startbutton").addEventListener("click",
    function() {
        // Redirect to the GameScreen.html with the current language as a parameter
        window.location.href = `Screens/GameScreen.html?lang=${Language}`;
    }
);
