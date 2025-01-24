
function PointSystem(figureNumber) {
    let PointsToAdd = 0;

    if (figureNumber !== 0) {
        PointsToAdd = countOnesInFigure(figureNumber);
    } else {
        PointsToAdd = 1;
    }

    TotalPoints += PointsToAdd;

    // Update the score in the interface
    const scoreElement = document.getElementById('total-score');
    if (scoreElement) {
        scoreElement.textContent = TotalPoints;
    } else {
        console.error('Element #total-score not found in the DOM.');
    }
	
	UpdateLevel(TotalPoints);
}

function UpdateLevel(Points){
	if ((TotalPoints > 1000)&&(TotalPoints < 11000))Level = Math.floor(TotalPoints/1000);
	
    if (levelContainer) {
        levelContainer.textContent = `Level: ${Level}`;
    } else {
        console.error('Level container not found in the DOM.');
    }

}