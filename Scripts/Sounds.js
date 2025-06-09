// Library of sound objects mapped by their names
const SoundLibrary = {
    Droped01:       new Audio('../Sounds/Droped01.mp3'),
    Droped02:       new Audio('../Sounds/Droped02.mp3'),
    Droped03:       new Audio('../Sounds/Droped03.mp3'),
    Droped04:       new Audio('../Sounds/Droped04.mp3'),
    Droped05:       new Audio('../Sounds/Droped05.mp3'),
    Droped06:       new Audio('../Sounds/Droped06.mp3'),
    Droped07:       new Audio('../Sounds/Droped07.mp3'),
    Droped08:       new Audio('../Sounds/Droped08.mp3'),
    Droped09:       new Audio('../Sounds/Droped09.mp3'),
    Droped10:       new Audio('../Sounds/Droped10.mp3'),
    Droped15:       new Audio('../Sounds/Droped15.mp3'),
    Droped20:       new Audio('../Sounds/Droped20.mp3'),
    LineCleared:    new Audio('../Sounds/LineCleared.mp3'),
    CutLineCleared: new Audio('../Sounds/CutLineCleared.mp3'),
};


// Mapping from block numbers to corresponding sound names
const SoundNames = {
  1: "Droped01",
  2: "Droped02",
  3: "Droped03",
  4: "Droped04",
  5: "Droped05",
  6: "Droped06",
  7: "Droped07",
  8: "Droped08",
  9: "Droped09",
  10: "Droped10",
  11: "Droped10",
  12: "Droped10",
  13: "Droped10",
  14: "Droped10",
  15: "Droped15",
  16: "Droped15",
  17: "Droped15",
  18: "Droped15",
  19: "Droped15",
  20: "Droped20",
  21: "Droped20",
  22: "Droped20",
  23: "Droped20",
  24: "Droped20",
  25: "Droped20",
};

const audioQueue = []; // Queue to hold pending sounds to play
let isPlaying = false; // Whether a sound is currently playing

// Plays a sound in a loop a specified number of times
function playSoundLoop(times, soundName) {
  let count = 0;
  function play() {
    if (count >= times || !CurrentState.Sound) return;
    addToQueue(soundName);
    count++;
    play();
  }
  if(CurrentState.Sound) play();
}


// Plays the sound associated with a number of blocks
function playSound(Bloks) {
  if(CurrentState.Sound){
    const soundName = SoundNames[Bloks];
    addToQueue(soundName);
  }
}


// 1. Function to add a single sound to the queue (asynchronous, non-blocking)
function addToQueue(soundName) {
  if (!SoundLibrary[soundName]) {
    console.warn(`⚠️ The sound "${soundName}" does not exist in SoundLibrary.`);
    return;
  }

  audioQueue.push(soundName);

  // If nothing is currently playing, start the queue
  if (!isPlaying) {
    playQueue();
  }
}

// 2. Function that plays sounds in sequence from the queue
function playQueue() {
  if (isPlaying || audioQueue.length === 0) return;

  isPlaying = true;
  const soundName = audioQueue.shift(); // Remove the first sound from the queue
  const soundClone = SoundLibrary[soundName].cloneNode();

  soundClone.play();

  soundClone.addEventListener('ended', () => {
    isPlaying = false;
    playQueue(); // Play the next sound in the queue
  });
}

// 3. Function to clear the audio queue (optional)
function clearQueue() {
  audioQueue.length = 0;
}

// Toggles the sound state on/off and updates the menu button accordingly
function ToggleSound() {
    CurrentState.Sound = !CurrentState.Sound;
    saveCurrentState();
    
    // Find the sound button in the menu and update its label
    const soundButton = menuButtons.find(btn => btn.textKey === 'DisableSound' || btn.textKey === 'EnableSound');

    if (soundButton) {
        soundButton.textKey = CurrentState.Sound ? 'DisableSound' : 'EnableSound';
    }
    renderMenuButtons(menuButtons);
}
