
const keySound1 = new Audio('/sounds/key1.mp3');
const keySound2 = new Audio('/sounds/key2.mp3');
const keySound3 = new Audio('/sounds/key3.mp3');
const keySound4 = new Audio('/sounds/key4.mp3');

// Array of available sounds
const keySounds = [keySound1, keySound2, keySound3, keySound4];

// Volume bas pour ne pas déranger
keySounds.forEach(sound => {
  sound.volume = 0.2;
});

// Track if keyboard sounds are enabled
let soundsEnabled = true;

export const toggleKeyboardSounds = (): boolean => {
  soundsEnabled = !soundsEnabled;
  return soundsEnabled;
};

export const getKeyboardSoundsEnabled = (): boolean => {
  return soundsEnabled;
};

export const playRandomKeySound = () => {
  if (!soundsEnabled) return;
  
  try {
    // Select a random sound from available sounds
    const randomIndex = Math.floor(Math.random() * keySounds.length);
    
    // Create a new instance to avoid the overlapping sound issue
    const sound = keySounds[randomIndex].cloneNode(true) as HTMLAudioElement;
    sound.volume = 0.2;
    sound.play();
  } catch (error) {
    // Ignore errors from sound (browsers that block autoplay)
    console.log('Info: Sound playing was blocked or failed');
  }
};
