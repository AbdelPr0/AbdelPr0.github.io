import { useCallback, useRef } from 'react';

const useKeyboardSound = (enabled: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playKeySound = useCallback(() => {
    if (!enabled) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio('/keyboard-click.mp3');
    }
    
    // Reset and play the sound
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0.3;
    audioRef.current.play().catch(() => {
      // Ignore autoplay errors
    });
  }, [enabled]);

  return playKeySound;
};

export default useKeyboardSound; 