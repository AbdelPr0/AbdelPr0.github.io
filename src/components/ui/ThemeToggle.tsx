import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, MonitorDot } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  const getNextTheme = () => {
    switch (theme) {
      case 'green':
        return 'amber';
      case 'amber':
        return 'light';
      case 'light':
        return 'green';
      default:
        return 'green';
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'green':
        return <MonitorDot size={14} />;
      case 'amber':
        return <Moon size={14} />;
      case 'light':
        return <Sun size={14} />;
      default:
        return <MonitorDot size={14} />;
    }
  };


  
  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center space-x-1 text-xs border border-current px-2 py-1 rounded hover:bg-current/10 transition-colors"
      title={t(`theme.${getNextTheme()}`)}
    >
      {getThemeIcon()}
      <span>{theme.toUpperCase()}</span>
    </button>
  );
};

export default ThemeToggle;
