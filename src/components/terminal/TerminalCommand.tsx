import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TerminalCommandProps {
  command: string;
  output: React.ReactNode;
  timestamp?: string;
  isTyping?: boolean;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({ 
  command, 
  output, 
  timestamp = new Date().toLocaleTimeString(),
  isTyping = true
}) => {
  const { t } = useTranslation();
  const [showOutput, setShowOutput] = useState(!isTyping);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const commandRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isTyping) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < command.length) {
          setDisplayedText(prev => prev + command[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setShowCursor(false);
          setTimeout(() => {
            setShowOutput(true);
          }, 300);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [command, isTyping]);
  
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <span className="text-xs opacity-60 mr-2">[{timestamp}]</span>
        <span className="mr-2">{t('terminal.prompt')}</span>
        {isTyping ? (
          <div ref={commandRef} className="flex items-center">
            <span>{displayedText}</span>
            {showCursor && <span className="w-2 h-5 bg-green-500 ml-1 animate-pulse">_</span>}
          </div>
        ) : (
          <div>{command}</div>
        )}
      </div>
      
      {showOutput && (
        <div className="ml-6 mt-1 terminal-output">
          {output}
        </div>
      )}
    </div>
  );
};

export default TerminalCommand;
