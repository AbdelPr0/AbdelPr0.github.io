import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AboutSection from './sections/AboutSection';
import BehindTheCodeSection from './sections/BehindTheCodeSection';
import ContactSection from './sections/ContactSection';
import ProjectsSection from './sections/ProjectsSection';
import RecruiterModeSection from './sections/RecruiterModeSection';
import SkillsSection from './sections/SkillsSection';
import TerminalCommand from './terminal/TerminalCommand';
import TerminalInput from './terminal/TerminalInput';

import { useTheme } from '@/contexts/ThemeContext';
import NavigationBar from './NavigationBar';
import WelcomeScreen from './WelcomeScreen';

import CVDownload from './terminal/CVDownload';
import GamesMenu from './terminal/GamesMenu';
import Achievements from './ui/Achievements';
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
  const [showWelcome, setShowWelcome] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const latestOutputRef = useRef<HTMLDivElement>(null);
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
  const [lastCommandId, setLastCommandId] = useState<number | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const savedAchievements = localStorage.getItem('achievements');
    return savedAchievements ? JSON.parse(savedAchievements) : [];
  });
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] =
    useState<Achievement | null>(null);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const handleScroll = () => {
      const terminalContent = document.querySelector('.terminal-scrollbar');
      if (terminalContent) {
        const { scrollTop, scrollHeight, clientHeight } =
          terminalContent as HTMLElement;
        setIsScrolled(scrollHeight - scrollTop - clientHeight > 10);
      }
    };

    const terminalContent = document.querySelector('.terminal-scrollbar');
    terminalContent?.addEventListener('scroll', handleScroll);

    return () => {
      terminalContent?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleHelp = () => {
    handleCommand('help');
  };

  const possibleAchievements: Achievement[] = [
    {
      id: 'first_command',
      title: t('achievements.firstCommand.title', 'First Command!'),
      description: t(
        'achievements.firstCommand.description',
        'You executed your first command in the terminal!'
      ),
      icon: '⌨️',
    },
    {
      id: 'explorer',
      title: t('achievements.explorer.title', 'Explorer!'),
      description: t(
        'achievements.explorer.description',
        'You visited all main sections of the portfolio!'
      ),
      icon: '🗺️',
    },
    {
      id: 'theme_changer',
      title: t('achievements.themeChanger.title', 'Theme Changer!'),
      description: t(
        'achievements.themeChanger.description',
        'You changed the theme of the portfolio!'
      ),
      icon: '🎨',
    },
    {
      id: 'language_switcher',
      title: t('achievements.languageSwitcher.title', 'Language Switcher!'),
      description: t(
        'achievements.languageSwitcher.description',
        'You switched the language of the portfolio!'
      ),
      icon: '🌐',
    },
  ];

  const checkAchievements = (action: string, section?: string) => {
    let achievementToUnlock: Achievement | null = null;

    switch (action) {
      case 'command':
        if (!achievements.some(a => a.id === 'first_command')) {
          achievementToUnlock =
            possibleAchievements.find(a => a.id === 'first_command') || null;
        }
        break;
      case 'explore':
        if (section) {
          const newVisitedSections = new Set(visitedSections);
          newVisitedSections.add(section);
          setVisitedSections(newVisitedSections);

          const mainSections = ['about', 'projects', 'skills', 'contact'];
          const allSectionsVisited = mainSections.every(s =>
            newVisitedSections.has(s)
          );

          if (
            allSectionsVisited &&
            !achievements.some(a => a.id === 'explorer')
          ) {
            achievementToUnlock =
              possibleAchievements.find(a => a.id === 'explorer') || null;
          }
        }
        break;
      case 'theme':
        if (!achievements.some(a => a.id === 'theme_changer')) {
          achievementToUnlock =
            possibleAchievements.find(a => a.id === 'theme_changer') || null;
        }
        break;
      case 'language':
        if (!achievements.some(a => a.id === 'language_switcher')) {
          achievementToUnlock =
            possibleAchievements.find(a => a.id === 'language_switcher') ||
            null;
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
    setIsNavCommand(fromNav);
    let output: React.ReactNode;

    checkAchievements('command');

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
      case 'blog':
        output = (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="text-4xl font-bold animate-pulse">🚧</div>
            <div className="text-2xl font-bold">
              {t('blog.comingSoon', 'Coming Soon')}
            </div>
            <div className="text-sm opacity-70">
              {t(
                'blog.underConstruction',
                'This section is under construction'
              )}
            </div>
          </div>
        );
        break;
      case 'behind-the-code':
        output = <BehindTheCodeSection />;
        break;
      case 'recruiter-mode':
        output = <RecruiterModeSection />;
        break;

      case 'install cv':
        output = <CVDownload />;
        break;
      case 'theme':
        checkAchievements('theme');
        toggleTheme();
        output = (
          <div className="text-sm">
            {t('theme.green')}: {theme === 'green' ? 'ACTIVE' : 'INACTIVE'}
            <br />
            {t('theme.amber')}: {theme === 'amber' ? 'ACTIVE' : 'INACTIVE'}
            <br />
            {t('theme.light')}: {theme === 'light' ? 'ACTIVE' : 'INACTIVE'}
          </div>
        );
        break;
      case 'language': {
        checkAchievements('language');
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
        output = (
          <div className="text-sm">
            {t('language.en')}: {i18n.language === 'en' ? 'ACTIVE' : 'INACTIVE'}
            <br />
            {t('language.fr')}: {i18n.language === 'fr' ? 'ACTIVE' : 'INACTIVE'}
          </div>
        );
        break;
      }
      case 'help':
        output = (
          <div className="text-sm space-y-2">
            <div
              className={`${
                theme === 'green'
                  ? 'text-green-500'
                  : theme === 'amber'
                  ? 'text-amber-500'
                  : 'text-blue-600'
              } font-bold mb-2`}
            >
              {t('help.title')}
            </div>
            <div className="grid gap-2">
              <div>
                ▸{' '}
                <span
                  className={`${
                    theme === 'green'
                      ? 'text-green-400'
                      : theme === 'amber'
                      ? 'text-amber-400'
                      : 'text-blue-500'
                  } font-medium`}
                >
                  about
                </span>{' '}
                → {t('help.about')}
              </div>
              <div>
                ▸{' '}
                <span
                  className={`${
                    theme === 'green'
                      ? 'text-green-400'
                      : theme === 'amber'
                      ? 'text-amber-400'
                      : 'text-blue-500'
                  } font-medium`}
                >
                  projects
                </span>{' '}
                → {t('help.projects')}
              </div>
              <div>
                ▸{' '}
                <span
                  className={`${
                    theme === 'green'
                      ? 'text-green-400'
                      : theme === 'amber'
                      ? 'text-amber-400'
                      : 'text-blue-500'
                  } font-medium`}
                >
                  skills
                </span>{' '}
                → {t('help.skills')}
              </div>
              <div>
                ▸{' '}
                <span
                  className={`${
                    theme === 'green'
                      ? 'text-green-400'
                      : theme === 'amber'
                      ? 'text-amber-400'
                      : 'text-blue-500'
                  } font-medium`}
                >
                  contact
                </span>{' '}
                → {t('help.contact')}
              </div>
              <div>
                ▸ <span className="text-red-500">install cv</span> →{' '}
                {t('help.cv')}
              </div>

              <div>
                ▸ <span className="text-red-500">theme</span> →{' '}
                {t('help.theme')} (green/amber/light)
              </div>
              <div>
                ▸ <span className="text-red-500">language</span> →{' '}
                {t('help.language')}
              </div>
              <div>
                ▸ <span className="text-red-500">achievements</span> →{' '}
                {t('help.achievements', 'View your achievements')}
              </div>
              <div>
                ▸ <span className="text-red-500">clear</span> →{' '}
                {t('help.clear')}
              </div>
              <div>
                ▸ <span className="text-red-500">easter-egg</span> →{' '}
                {t('help.easter_egg')}
              </div>
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
      case 'achievement':
      case 'achievements':
        output = <Achievements />;
        break;
      default:
        output = <div className="text-sm">{t('terminal.notFound')}</div>;
    }

    const newCommandId = Date.now();

    setHistory(prev => [
      ...prev,
      {
        id: newCommandId,
        command: cmd,
        output,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Définir l'ID de la dernière commande pour déclencher le défilement
    setLastCommandId(newCommandId);
  };

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current && isInitialized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isInitialized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isInitialized, scrollToBottom]);

  useEffect(() => {
    const initializeTerminal = async () => {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsTyping(false);
      setIsInitialized(true);
    };

    initializeTerminal();
  }, []);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <div className="flex flex-col h-[75vh] relative">
      <AnimatedBackground />
      <NavigationBar
        onCommand={cmd => handleCommand(cmd, true)}
        isScrolled={isScrolled}
      />
      <AnimatePresence>
        {showAchievement && currentAchievement && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 z-[100] max-w-xs w-full"
          >
            <div
              className={`${
                theme === 'light'
                  ? 'bg-white/95 border-blue-200 text-blue-900 shadow-lg'
                  : 'bg-terminal-dark/90 border-current text-current'
              } 
              backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3`}
            >
              <div className="text-2xl">{currentAchievement.icon}</div>
              <div>
                <div
                  className={`font-bold text-sm ${
                    theme === 'light' ? 'text-blue-700' : ''
                  }`}
                >
                  {t('achievements.unlocked', 'Achievement Unlocked!')}
                </div>
                <div
                  className={`text-xs font-medium ${
                    theme === 'light' ? 'text-blue-800' : ''
                  }`}
                >
                  {currentAchievement.title}
                </div>
                <div
                  className={`text-xs ${
                    theme === 'light' ? 'text-blue-600' : 'opacity-80'
                  }`}
                >
                  {currentAchievement.description}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 overflow-auto md:max-h-full md:mt-5 lg:mt-0 h-full mt-[10rem] p-2 terminal-scrollbar md:pt-[88px] md:pb-7">
        <div className="space-y-4">
          {history.map(item => (
            <div id={`command-${item.id}`} key={item.id}>
              <TerminalCommand
                command={item.command}
                output={item.output}
                timestamp={item.timestamp}
                isTyping={false}
              />
            </div>
          ))}
          <TerminalInput onCommand={handleCommand} placeholder="help" />
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
