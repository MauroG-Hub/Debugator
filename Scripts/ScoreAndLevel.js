function PointSystem(PointsToAdd) {
    // If points are to be added, calculate and update the total score
    if(PointsToAdd > 0){
        TotalPoints += Math.max(Math.floor(((PointsToAdd * 14 / 9) - (5 / 9)) * 1.5), 1);
    };

    // Update the score in the interface
    if (scoreElement) {
        scoreElement.textContent = TotalPoints;
    } else {
        console.error('Element #total-score not found in the DOM.');
    }

    // Update the level based on the new total points
    UpdateLevel();
}


function UpdateLevel(){
    // Set font size for the level display based on cell size
    let fontSize = (cellSize < 30) ? (Math.max(10, cellSize - 10) + "px") : "20px";

    // Calculate the level based on the total points
    if ((TotalPoints > 1000) && (TotalPoints < 11000)) Level = Math.floor(TotalPoints / 1000) + 1;
    if (TotalPoints == 0) Level = 1;

    // Update figure priorities for the current level
    UpdatePriorities();

    // Get the translated word for "Level"
    const LevelTranslated = Translate(Language, 'Level');

    // Update the level display in the interface
    if (levelContainer) {
        levelContainer.textContent = `${LevelTranslated}: ${Level}`;
        levelContainer.style.fontSize = fontSize;
    } else {
        console.error('Level container not found in the DOM.');
    }
}


function UpdatePriorities(){
    // Update figure priorities according to the current level (limit to a maximum of 11 levels)
    figurePriorities = figurePrioritiesLevels[Math.min(Level - 1, 10)];
}
