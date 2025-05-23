
function PointSystem(PointsToAdd) {
    
    if(PointsToAdd > 0){
        TotalPoints += Math.max(Math.floor(((PointsToAdd*14/9)-(5/9))*1.5),1);  
    };

    // Update the score in the interface
    if (scoreElement) {
        scoreElement.textContent = TotalPoints;
    } else {
        console.error('Element #total-score not found in the DOM.');
    }
	
	UpdateLevel(TotalPoints);
	
}

function UpdateLevel(Points){
	if ((TotalPoints > 1000)&&(TotalPoints < 11000))Level = Math.floor(TotalPoints/1000)+1;
	UpdatePriorities();
    const LevelTranslated = Translate(Language, 'Level');
    if (levelContainer) {
        levelContainer.textContent = `${LevelTranslated}: ${Level}`;
    } else {
        console.error('Level container not found in the DOM.');
    }

}

function UpdatePriorities(){
	figurePriorities = figurePrioritiesLevels[Math.min(Level - 1,10)];
}
