
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const IntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    // Display intro for 3 seconds before fading out
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);
    
    // After fade out animation completes, call onComplete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center bg-terminal-black z-50 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl mb-4 animate-pulse">
          Abdelrahmane Gacemi
        </h1>
        <p className="text-xl md:text-2xl typing-effect">
          {t('intro.title')}
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;
