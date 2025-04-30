
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { ToggleLeft, ToggleRight } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center space-x-1 text-xs border border-current px-2 py-1 rounded hover:bg-current/10 transition-colors"
      title={theme === 'green' ? t('theme.amber') : t('theme.green')}
    >
      {theme === 'green' ? (
        <>
          <ToggleLeft size={14} />
          <span>GREEN</span>
        </>
      ) : (
        <>
          <ToggleRight size={14} />
          <span>AMBER</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
