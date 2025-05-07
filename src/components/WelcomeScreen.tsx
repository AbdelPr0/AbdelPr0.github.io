import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';

const WelcomeScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);

  const welcomeText = [
    'Initializing system...',
    'Checking security protocols...',
    'Connecting to mainframe...',
    'Authenticating user...',
    'Welcome to my digital space!',
    'I am a Full Stack Developer passionate about creating innovative solutions.',
    'Feel free to explore my portfolio using the terminal interface.'
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 300);

    return () => clearInterval(cursorInterval);
  }, []);
  
  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const currentString = welcomeText[currentIndex];
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex <= currentString.length) {
          setCurrentText(currentString.slice(0, charIndex));
          charIndex++;
      } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
          }, 500);
      }
      }, 30);

      return () => clearInterval(typingInterval);
    } else {
      setTimeout(() => {
        setShowStartButton(true);
      }, 300);
    }
  }, [currentIndex]);

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        theme === 'light' ? 'bg-white' : 'bg-terminal-black'
      }`}
      >
      <div className="max-w-2xl w-full p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12 font-mono whitespace-pre"
          >
            <div className={`
              ${theme === 'light' ? 'text-blue-600' : 'text-terminal-green'}
              text-base md:text-lg lg:text-xl
              font-bold
              tracking-wider
            `}>
{`
    █████╗     ██████╗ 
   ██╔══██╗   ██╔════╝ 
   ███████║   ██║  ███╗
   ██╔══██║   ██║   ██║
   ██║  ██║   ╚██████╔╝
   ╚═╝  ╚═╝    ╚═════╝ 
`}
            </div>
          </motion.div>

          <div className="text-2xl font-bold mb-8 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`
                ${theme === 'light' ? 'text-blue-600' : 'text-terminal-green'}
                font-mono
              `}
            >
              TERMINAL v1.0.0
            </motion.span>
          </div>

          <div className="space-y-2 font-mono">
            {welcomeText.slice(0, currentIndex).map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`
                  ${theme === 'light' ? 'text-blue-900' : 'text-terminal-green'}
                  ${index === currentIndex - 1 ? 'font-bold' : 'opacity-70'}
                `}
              >
                {text}
              </motion.div>
            ))}
            {currentIndex < welcomeText.length && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: currentIndex * 0.1 }}
                className={`
                  ${theme === 'light' ? 'text-blue-900' : 'text-terminal-green'}
                  font-mono
                `}
              >
                {currentText}
                <motion.span
                  animate={{ opacity: showCursor ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </motion.div>
          )}
        </div>

          <AnimatePresence>
            {showStartButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className={`
                    px-6 py-3 rounded-md font-bold
                    ${theme === 'light' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-terminal-green text-terminal-black hover:bg-terminal-green/90'
                    }
                    transition-colors duration-300
                  `}
                >
                  Start Exploration
                </motion.button>
      </motion.div>
            )}
    </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen; 