
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TerminalCommand from './terminal/TerminalCommand';
import TerminalInput from './terminal/TerminalInput';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';
import SnakeGame from './games/SnakeGame';
import { useTheme } from '@/contexts/ThemeContext';

type CommandType = {
  id: number;
  command: string;
  output: React.ReactNode;
  timestamp: string;
};

const Terminal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [history, setHistory] = useState<CommandType[]>([]);
  const [bootSequence, setBootSequence] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new commands are added
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);
  
  // Initial boot sequence
  useEffect(() => {
    const bootMessages = [
      { message: t('terminal.boot'), delay: 600 },
      { message: t('terminal.copyright'), delay: 1000 },
      { message: t('terminal.loading'), delay: 1500 },
      { message: t('terminal.accessGranted'), delay: 800 },
      { message: t('terminal.initializing'), delay: 1000 },
      { message: t('terminal.hello'), delay: 500 },
      { message: t('terminal.help'), delay: 500 },
    ];
    
    let totalDelay = 0;
    
    bootMessages.forEach((item, index) => {
      totalDelay += item.delay;
      setTimeout(() => {
        setHistory(prev => [
          ...prev, 
          {
            id: Date.now() + index,
            command: item.message,
            output: <></>,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
        
        // End boot sequence after last message
        if (index === bootMessages.length - 1) {
          setTimeout(() => setBootSequence(false), 500);
        }
      }, totalDelay);
    });
  }, [t]);
  
  const handleCommand = (cmd: string) => {
    let output: React.ReactNode;
    
    // Handle different commands
    switch (cmd) {
      case 'about':
        output = <AboutSection />;
        break;
      case 'projects':
        output = <ProjectsSection />;
        break;
      case 'skills':
        output = <SkillsSection />;
        break;
      case 'contact':
        output = <ContactSection />;
        break;
      case 'theme':
        toggleTheme();
        output = <div className="text-sm">
          {t('theme.green')}: {theme === 'green' ? 'ACTIVE' : 'INACTIVE'}<br />
          {t('theme.amber')}: {theme === 'amber' ? 'ACTIVE' : 'INACTIVE'}
        </div>;
        break;
      case 'language':
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
        output = <div className="text-sm">
          {t('language.en')}: {i18n.language === 'en' ? 'ACTIVE' : 'INACTIVE'}<br />
          {t('language.fr')}: {i18n.language === 'fr' ? 'ACTIVE' : 'INACTIVE'}
        </div>;
        break;
      case 'help':
        output = <div className="text-sm">{t('terminal.commands')}</div>;
        break;
      case 'clear':
        setHistory([]);
        output = <></>;
        return;
      // Commande secrète pour le jeu Snake
      case '42snake':
        output = <SnakeGame />;
        break;
      case 'easteregg':
        output = <div className="text-sm animate-pulse">🎮 Essayez la commande secrète : 42snake</div>;
        break;
      default:
        output = <div className="text-sm">{t('terminal.notFound')}</div>;
    }
    
    setHistory(prev => [
      ...prev, 
      {
        id: Date.now(),
        command: cmd,
        output,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };
  
  return (
    <div className="space-y-4 p-2">
      {history.map((item) => (
        <TerminalCommand 
          key={item.id}
          command={item.command}
          output={item.output}
          timestamp={item.timestamp}
          isTyping={bootSequence}
        />
      ))}
      
      {!bootSequence && (
        <TerminalInput onCommand={handleCommand} placeholder="help" />
      )}
      
      <div ref={terminalEndRef} />
    </div>
  );
};

export default Terminal;
