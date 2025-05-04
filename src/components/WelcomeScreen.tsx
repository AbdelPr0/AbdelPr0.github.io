import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const { t } = useTranslation();
  const fullText = t('terminal.welcome');
  const { theme } = useTheme();
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTypingComplete(true);
        setTimeout(onComplete, 500);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [fullText, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 flex items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
      >
        <div className={`font-mono text-2xl ${theme === 'light' ? 'text-blue-700' : 'text-green-500'}`}>
          <span className="inline-block">{text}</span>
          {isTypingComplete && (
            <span className={`inline-block w-3 h-6 ml-1 animate-pulse ${theme === 'light' ? 'bg-blue-700' : 'bg-green-500'}`}>_</span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen; 