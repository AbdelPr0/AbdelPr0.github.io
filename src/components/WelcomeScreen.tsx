import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const fullText = 'Abdelrahmane Gacemi – Développeur Web & Mobile';
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black"
      >
        <div className="text-green-500 font-mono text-2xl">
          <span className="inline-block">{text}</span>
          <span className="inline-block w-3 h-6 bg-green-500 ml-1 animate-pulse">_</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen; 