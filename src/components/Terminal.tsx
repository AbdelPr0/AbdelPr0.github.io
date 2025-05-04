import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import TerminalCommand from './terminal/TerminalCommand';
import TerminalInput from './terminal/TerminalInput';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';
import { useTheme } from '@/contexts/ThemeContext';
import WelcomeScreen from './WelcomeScreen';
import NavigationBar from './NavigationBar';
import useKeyboardSound from '@/hooks/useKeyboardSound';
import SnakeGame from './terminal/SnakeGame';
import GamesMenu from './terminal/GamesMenu';
import CVDownload from './terminal/CVDownload';
import AnimatedBackground from './ui/AnimatedBackground';

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
  const [showWelcome, setShowWelcome] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentBootIndex, setCurrentBootIndex] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const playKeySound = useKeyboardSound(soundEnabled);
  const [isNavCommand, setIsNavCommand] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Scroll to bottom after each command
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const terminalContent = document.querySelector('.terminal-scrollbar');
      if (terminalContent) {
        const { scrollTop, scrollHeight, clientHeight } = terminalContent as HTMLElement;
        setIsScrolled(scrollHeight - scrollTop - clientHeight > 10);
      }
    };

    const terminalContent = document.querySelector('.terminal-scrollbar');
    terminalContent?.addEventListener('scroll', handleScroll);
    
    return () => {
      terminalContent?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Initial boot sequence
  useEffect(() => {
    if (showWelcome) return;

    const bootMessages = [
      { message: t('terminal.boot'), delay: 600 },
      { message: t('terminal.copyright'), delay: 1000 },
      { message: t('terminal.loading'), delay: 1000 },
      { message: t('terminal.accessGranted'), delay: 800 },
      { message: t('terminal.initializing'), delay: 1000 },
      { message: t('terminal.hello'), delay: 500 },
      { message: t('terminal.help'), delay: 500 },
    ];

    if (currentBootIndex < bootMessages.length) {
      const currentMessage = bootMessages[currentBootIndex];
      
      setTimeout(() => {
        setHistory(prev => [
          ...prev, 
          {
            id: Date.now() + currentBootIndex,
            command: currentMessage.message,
            output: <></>,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
        
        setTimeout(() => {
          setCurrentBootIndex(prev => prev + 1);
        }, currentMessage.delay);
        
        if (currentBootIndex === bootMessages.length - 1) {
          setTimeout(() => setBootSequence(false), 1000);
        }
      }, 100);
    }
  }, [t, showWelcome, currentBootIndex]);

  const handleHelp = () => {
    handleCommand('help');
  };
  
  const handleCommand = (cmd: string, fromNav: boolean = false) => {
    playKeySound();
    setIsNavCommand(fromNav);
    let output: React.ReactNode;
    
    // Handle different commands
    switch (cmd.toLowerCase()) {
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
      case 'blog':
        output = (
          <div className="text-sm space-y-4">
            <h2 className="text-xl font-bold border-b border-current pb-2">Blogues</h2>
            <div className="text-center py-8">
              <p className="text-2xl font-bold text-green-500">Coming Soon</p>
              <p className="text-gray-500 mt-2">Stay tuned for exciting content!</p>
            </div>
          </div>
        );
        break;
      case 'install cv':
        output = <CVDownload />;
        break;
      case 'theme':
        toggleTheme();
        output = <div className="text-sm">
          {t('theme.green')}: {theme === 'green' ? 'ACTIVE' : 'INACTIVE'}<br />
          {t('theme.amber')}: {theme === 'amber' ? 'ACTIVE' : 'INACTIVE'}<br />
          {t('theme.light')}: {theme === 'light' ? 'ACTIVE' : 'INACTIVE'}
        </div>;
        break;
      case 'language': {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
        output = <div className="text-sm">
          {t('language.en')}: {i18n.language === 'en' ? 'ACTIVE' : 'INACTIVE'}<br />
          {t('language.fr')}: {i18n.language === 'fr' ? 'ACTIVE' : 'INACTIVE'}
        </div>;
        break;
      }
      case 'help':
        output = (
          <div className="text-sm space-y-2">
            <div className="text-green-500 font-bold mb-2">{t('help.title')}</div>
            <div className="grid gap-2">
              <div>▸ <span className="text-red-500">about</span>      → {t('help.about')}</div>
              <div>▸ <span className="text-red-500">projects</span>   → {t('help.projects')}</div>
              <div>▸ <span className="text-red-500">skills</span>    → {t('help.skills')}</div>
              <div>▸ <span className="text-red-500">blog</span>      → {t('help.research')}</div>
              <div>▸ <span className="text-red-500">contact</span>    → {t('help.contact')}</div>
              <div>▸ <span className="text-red-500">install cv</span> → {t('help.cv')}</div>
              <div>▸ <span className="text-red-500">theme</span>      → {t('help.theme')} (green/amber/light)</div>
              <div>▸ <span className="text-red-500">language</span>   → {t('help.language')}</div>
              <div>▸ <span className="text-red-500">clear</span>      → {t('help.clear')}</div>
              <div>▸ <span className="text-red-500">easter-egg</span> → {t('help.easter_egg')}</div>
            </div>
          </div>
        );
        break;
      case 'easter-egg':
        output = <GamesMenu />;
        break;
      case 'clear':
        setHistory([]);
        output = <></>;
        return;
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
  
  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }
  
  return (
    <div className="flex flex-col h-screen">
      <AnimatedBackground />
      <NavigationBar onCommand={(cmd) => handleCommand(cmd, true)} isScrolled={isScrolled} />
      <div className="flex-1 overflow-auto p-2 terminal-scrollbar pt-[88px]">
        <div className="space-y-4">
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
    </div>
  );
};

export default Terminal;
