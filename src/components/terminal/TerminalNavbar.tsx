
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { getKeyboardSoundsEnabled, toggleKeyboardSounds } from '@/utils/keyboardSounds';

interface TerminalNavbarProps {
  onRunCommand: (command: string) => void;
}

const TerminalNavbar: React.FC<TerminalNavbarProps> = ({ onRunCommand }) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = React.useState(getKeyboardSoundsEnabled());
  
  const handleSoundToggle = () => {
    const newState = toggleKeyboardSounds();
    setSoundEnabled(newState);
  };
  
  const handleHelp = () => {
    onRunCommand('help');
  };
  
  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-current">
      <div className="flex items-center space-x-2">
        <button 
          onClick={handleThemeToggle}
          className="flex items-center space-x-1 text-xs border border-current px-2 py-1 rounded hover:bg-current/10 transition-colors"
          title={t('theme.toggle')}
        >
          <span>{theme === 'green' ? t('theme.green') : t('theme.amber')}</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleSoundToggle}
          className="flex items-center space-x-1 text-xs border border-current px-2 py-1 rounded hover:bg-current/10 transition-colors"
          title={t('sound.toggle')}
        >
          {soundEnabled ? (
            <>
              <Volume2 size={14} />
              <span>{t('sound.on')}</span>
            </>
          ) : (
            <>
              <VolumeX size={14} />
              <span>{t('sound.off')}</span>
            </>
          )}
        </button>
        
        <button 
          onClick={handleHelp}
          className="flex items-center space-x-1 text-xs border border-current px-2 py-1 rounded hover:bg-current/10 transition-colors"
          title={t('terminal.help')}
        >
          <HelpCircle size={14} />
          <span>{t('terminal.helpButton')}</span>
        </button>
      </div>
    </div>
  );
};

export default TerminalNavbar;
