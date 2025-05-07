import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, MonitorDot, Volume2, VolumeX } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Créer l'élément audio
    audioRef.current = new Audio('/3 AM Coding Session - Lofi Hip Hop Mix [Study & Coding Beats].mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
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

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    setIsMuted(!isMuted);
  };
  
  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={toggleMute}
        className={`flex items-center space-x-1 text-xs border border-current px-2 py-1 rounded transition-colors
          ${isMuted ? 'opacity-50 hover:opacity-70' : 'hover:bg-current/10'}`}
        title={isMuted ? t('audio.unmute', 'Unmute') : t('audio.mute', 'Mute')}
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    <button 
      onClick={toggleTheme}
      className="flex items-center space-x-1 text-xs border border-current px-2 py-1 rounded hover:bg-current/10 transition-colors"
      title={t(`theme.${getNextTheme()}`)}
    >
      {getThemeIcon()}
      <span>{theme.toUpperCase()}</span>
    </button>
    </div>
  );
};

export default ThemeToggle;
