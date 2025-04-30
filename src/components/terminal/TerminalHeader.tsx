
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import ThemeToggle from '@/components/ui/ThemeToggle';

const TerminalHeader: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="terminal-header">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-2 text-sm">{t('terminal.welcome')}</span>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <LanguageSwitch />
      </div>
    </div>
  );
};

export default TerminalHeader;
