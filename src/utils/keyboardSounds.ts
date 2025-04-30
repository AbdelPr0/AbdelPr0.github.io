
const keySound1 = new Audio('/sounds/key1.mp3');
const keySound2 = new Audio('/sounds/key2.mp3');
const keySound3 = new Audio('/sounds/key3.mp3');
const keySound4 = new Audio('/sounds/key4.mp3');

// Tableau des sons disponibles
const keySounds = [keySound1, keySound2, keySound3, keySound4];

// Volume bas pour ne pas déranger
keySounds.forEach(sound => {
  sound.volume = 0.2;
});

export const playRandomKeySound = () => {
  try {
    // Sélectionne un son aléatoire parmi les sons disponibles
    const randomIndex = Math.floor(Math.random() * keySounds.length);
    const sound = keySounds[randomIndex];
    
    // Réinitialiser le son s'il est déjà en cours de lecture
    sound.currentTime = 0;
    sound.play();
  } catch (error) {
    // Ignorer les erreurs de son (navigateurs qui bloquent l'autoplay)
    console.log('Info: Sound playing was blocked or failed');
  }
};
