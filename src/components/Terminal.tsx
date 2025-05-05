import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
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

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

type CommandType = {
  id: number;
  command: string;
  output: React.ReactNode;
  timestamp: string;
};

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

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
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHelp, setShowHelp] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  
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
  
  // Liste des achievements possibles
  const possibleAchievements: Achievement[] = [
    {
      id: 'first_command',
      title: t('achievements.firstCommand.title', 'First Command!'),
      description: t('achievements.firstCommand.description', 'You executed your first command in the terminal!'),
      icon: '⌨️'
    },
    {
      id: 'explorer',
      title: t('achievements.explorer.title', 'Explorer!'),
      description: t('achievements.explorer.description', 'You visited all main sections of the portfolio!'),
      icon: '🗺️'
    },
    {
      id: 'theme_changer',
      title: t('achievements.themeChanger.title', 'Theme Changer!'),
      description: t('achievements.themeChanger.description', 'You changed the theme of the portfolio!'),
      icon: '🎨'
    },
    {
      id: 'language_switcher',
      title: t('achievements.languageSwitcher.title', 'Language Switcher!'),
      description: t('achievements.languageSwitcher.description', 'You switched the language of the portfolio!'),
      icon: '🌐'
    }
  ];

  // Fonction pour vérifier et débloquer les achievements
  const checkAchievements = (action: string, section?: string) => {
    let achievementToUnlock: Achievement | null = null;

    switch (action) {
      case 'command':
        if (!achievements.some(a => a.id === 'first_command')) {
          achievementToUnlock = possibleAchievements.find(a => a.id === 'first_command') || null;
        }
        break;
      case 'explore':
        if (section) {
          const newVisitedSections = new Set(visitedSections);
          newVisitedSections.add(section);
          setVisitedSections(newVisitedSections);
          
          // Vérifier si toutes les sections principales ont été visitées
          const mainSections = ['about', 'projects', 'skills', 'contact'];
          const allSectionsVisited = mainSections.every(s => newVisitedSections.has(s));
          
          if (allSectionsVisited && !achievements.some(a => a.id === 'explorer')) {
            achievementToUnlock = possibleAchievements.find(a => a.id === 'explorer') || null;
          }
        }
        break;
      case 'theme':
        if (!achievements.some(a => a.id === 'theme_changer')) {
          achievementToUnlock = possibleAchievements.find(a => a.id === 'theme_changer') || null;
        }
        break;
      case 'language':
        if (!achievements.some(a => a.id === 'language_switcher')) {
          achievementToUnlock = possibleAchievements.find(a => a.id === 'language_switcher') || null;
        }
        break;
    }

    if (achievementToUnlock) {
      setAchievements(prev => [...prev, achievementToUnlock]);
      setCurrentAchievement(achievementToUnlock);
      setShowAchievement(true);
      setTimeout(() => {
        setShowAchievement(false);
        setTimeout(() => {
          setCurrentAchievement(null);
        }, 500);
      }, 3000);
    }
  };
  
  const handleCommand = (cmd: string, fromNav: boolean = false) => {
    playKeySound();
    setIsNavCommand(fromNav);
    let output: React.ReactNode;
    
    // Vérifier les achievements
    checkAchievements('command');
    
    // Handle different commands
    switch (cmd.toLowerCase()) {
      case 'about':
        checkAchievements('explore', 'about');
        output = <AboutSection />;
        break;
      case 'projects':
        checkAchievements('explore', 'projects');
        output = <ProjectsSection />;
        break;
      case 'skills':
        checkAchievements('explore', 'skills');
        output = <SkillsSection />;
        break;
      case 'contact':
        checkAchievements('explore', 'contact');
        output = <ContactSection />;
        break;
      case 'install cv':
        output = <CVDownload />;
        break;
      case 'theme':
        checkAchievements('theme');
        toggleTheme();
        output = <div className="text-sm">
          {t('theme.green')}: {theme === 'green' ? 'ACTIVE' : 'INACTIVE'}<br />
          {t('theme.amber')}: {theme === 'amber' ? 'ACTIVE' : 'INACTIVE'}<br />
          {t('theme.light')}: {theme === 'light' ? 'ACTIVE' : 'INACTIVE'}
        </div>;
        break;
      case 'language': {
        checkAchievements('language');
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
  
  const scrollToBottom = () => {
    if (messagesEndRef.current && isInitialized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isInitialized]);

  useEffect(() => {
    const initializeTerminal = async () => {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsTyping(false);
      setIsInitialized(true);
    };

    initializeTerminal();
  }, []);
  
  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }
  
  return (
    <div className="flex flex-col h-[75vh]">
      <AnimatedBackground />
      <NavigationBar onCommand={(cmd) => handleCommand(cmd, true)} isScrolled={isScrolled} />
      
      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && currentAchievement && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-4 right-4 z-[100] max-w-xs w-full"
          >
            <div className={`
              ${theme === 'light' 
                ? 'bg-white/95 border-blue-200 text-blue-900 shadow-lg' 
                : 'bg-terminal-dark/90 border-current text-current'
              } 
              backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3
            `}>
              <div className="text-2xl">{currentAchievement.icon}</div>
              <div>
                <div className={`font-bold text-sm ${theme === 'light' ? 'text-blue-700' : ''}`}>
                  {t('achievements.unlocked', 'Achievement Unlocked!')}
                </div>
                <div className={`text-xs font-medium ${theme === 'light' ? 'text-blue-800' : ''}`}>
                  {currentAchievement.title}
                </div>
                <div className={`text-xs ${theme === 'light' ? 'text-blue-600' : 'opacity-80'}`}>
                  {currentAchievement.description}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
