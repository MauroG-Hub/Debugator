


const soundLibrary = {
  BlockCleared: new Audio('../Sounds/BlockCleared2.wav'),
  BlockDroped: new Audio('../Sounds/BlockDroped2.wav')

};

const soundIntervals = {
  BlockCleared: 80, 
  BlockDroped: 150  
};

function getSound(soundName) {
  return soundLibrary[soundName];
}



function playSoundLoop(times, soundName) {
 
  const interval = soundIntervals[soundName] || 150;
  let count = 0;
  function play() {
    if (count >= times) return;
    const soundClone = getSound(soundName).cloneNode();
    soundClone.play();
    count++;
    setTimeout(play, interval);
  }
  if(CurrentState.Sound) play();
}


function ToggleSound() {
    CurrentState.Sound = !CurrentState.Sound;
    //saveCurrentState();
    
    const soundButton = menuButtons.find(btn => btn.textKey === 'DisableSound' || btn.textKey === 'EnableSound');

    if (soundButton) {
        soundButton.textKey = CurrentState.Sound ? 'DisableSound' : 'EnableSound';
    }
    renderMenuButtons(menuButtons);

   
}

