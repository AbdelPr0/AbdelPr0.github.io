
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TerminalCommand from './terminal/TerminalCommand';
import TerminalInput from './terminal/TerminalInput';
import TerminalNavbar from './terminal/TerminalNavbar';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';
import SnakeGame from './games/SnakeGame';
import IntroScreen from './IntroScreen';
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
  const [showIntro, setShowIntro] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when new commands are added
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);
  
  // Initial boot sequence
  useEffect(() => {
    // Skip boot sequence if intro is still showing
    if (showIntro) return;
    
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
  }, [t, showIntro]);
  
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
        output = <div className="terminal-help space-y-3">
          <p className="text-sm">{t('terminal.availableCommands')}</p>
          <ul className="space-y-1 text-sm">
            <li><span className="text-current">▸ about</span>      → {t('commands.about')}</li>
            <li><span className="text-current">▸ projects</span>   → {t('commands.projects')}</li>
            <li><span className="text-current">▸ skills</span>     → {t('commands.skills')}</li>
            <li><span className="text-current">▸ contact</span>    → {t('commands.contact')}</li>
            <li><span className="text-current">▸ theme</span>      → {t('commands.theme')}</li>
            <li><span className="text-current">▸ language</span>   → {t('commands.language')}</li>
            <li><span className="text-current">▸ snake</span>      → {t('commands.snake')}</li>
            <li><span className="text-current">▸ clear</span>      → {t('commands.clear')}</li>
          </ul>
        </div>;
        break;
      case 'clear':
        setHistory([]);
        output = <></>;
        return;
      case 'snake':
      case '42snake': // Keep the easter egg command too
        output = <SnakeGame />;
        break;
      case 'easteregg':
        output = <div className="text-sm animate-pulse">🎮 {t('terminal.snakeHint')}</div>;
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

  const handleIntroComplete = () => {
    setShowIntro(false);
  };
  
  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }
  
  return (
    <div className="space-y-4">
      <TerminalNavbar onRunCommand={handleCommand} />
      
      <div className="p-2">
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
    </div>
  );
};

export default Terminal;
