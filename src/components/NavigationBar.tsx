import LanguageSwitch from '@/components/ui/LanguageSwitch';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { Download } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface NavigationBarProps {
  onCommand: (command: string) => void;
  isScrolled?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  onCommand,
  isScrolled = false,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const commands = [
    { name: 'about', label: t('nav.about') },
    { name: 'projects', label: t('nav.projects') },
    { name: 'skills', label: t('nav.skills') },
    { name: 'blog', label: 'Blogues' },
    { name: 'contact', label: t('nav.contact') },
  ];

  const baseClasses = 'flex items-center justify-between p-2 border-b';
  const navClasses =
    theme === 'light'
      ? 'bg-white/50 backdrop-blur-sm border-blue-100'
      : 'bg-gray-900/50 backdrop-blur-sm border-gray-700';

  const buttonBaseClasses =
    'px-4 py-1.5 rounded-md transition-all duration-200 flex items-center gap-2 font-medium shadow-sm min-w-[100px] justify-center';
  const buttonClasses =
    theme === 'light'
      ? 'bg-white/80 hover:bg-blue-50 text-blue-600 border border-blue-100 hover:border-blue-200 hover:shadow-md active:bg-blue-100'
      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:text-white active:bg-gray-600';

  const cvButtonClasses =
    theme === 'light'
      ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600 hover:border-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg min-w-[120px]'
      : 'bg-gray-700 text-white hover:bg-gray-600 border-gray-600 active:bg-gray-500 min-w-[120px]';

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      {/* Top bar for theme and language controls */}
      <div
        className={`${baseClasses} ${navClasses} bg-opacity-90 backdrop-blur-md`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-2 text-sm whitespace-nowrap hidden sm:inline">
            {t('terminal.welcome')}
          </span>
          <span className="ml-2 text-xs md:hidden">Terminal</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          <LanguageSwitch />
        </div>
      </div>

      {/* Main navigation bar */}
      <div className={`${baseClasses} ${navClasses} mt-0 backdrop-blur-md`}>
        {/* Desktop layout (lg and up) */}
        <div className="hidden lg:flex lg:space-x-3">
          {commands.map(cmd => (
            <button
              key={cmd.name}
              onClick={() => onCommand(cmd.name)}
              className={`${buttonBaseClasses} ${buttonClasses}`}
            >
              {cmd.label}
            </button>
          ))}
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-3">
          <button
            onClick={() => onCommand('install cv')}
            className={`${buttonBaseClasses} ${cvButtonClasses}`}
          >
            <Download size={16} />
            {t('nav.cv')}
          </button>
          <button
            onClick={() => onCommand('help')}
            className={`${buttonBaseClasses} ${buttonClasses}`}
          >
            {t('nav.help')}
          </button>
        </div>

        {/* Mobile, Tablet and iPad layout */}
        <div className="lg:hidden w-full">
          {/* First row: Main navigation commands */}
          <div className="flex flex-wrap gap-2 mb-2">
            {commands.map(cmd => (
              <button
                key={cmd.name}
                onClick={() => onCommand(cmd.name)}
                className={`${buttonBaseClasses} ${buttonClasses} text-xs sm:text-sm md:text-base min-w-[80px] sm:min-w-[90px] md:min-w-[100px] flex-1 max-w-[120px] md:max-w-[140px]`}
              >
                {cmd.label}
              </button>
            ))}
          </div>
          {/* Second row: CV and Help buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onCommand('install cv')}
              className={`${buttonBaseClasses} ${cvButtonClasses} text-xs sm:text-sm md:text-base flex-1`}
            >
              <Download size={14} />
              {t('nav.cv')}
            </button>
            <button
              onClick={() => onCommand('help')}
              className={`${buttonBaseClasses} ${buttonClasses} text-xs sm:text-sm md:text-base flex-1`}
            >
              {t('nav.help')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
