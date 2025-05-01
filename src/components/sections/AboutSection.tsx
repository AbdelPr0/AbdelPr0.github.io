import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { Lightbulb, Brain, RefreshCw, MessageSquare } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('about.title')}
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="border border-current p-4 rounded-md">
            <div className="aspect-square bg-terminal-dark/50 rounded overflow-hidden relative mb-4">
              {/* Image avec effet de scan */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-current/5 to-transparent animate-scan-line"></div>
              {/* Effet de bruit */}
              <div className="absolute inset-0 bg-noise opacity-5"></div>
              {/* Effet de lignes horizontales */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
                backgroundSize: '100% 4px'
              }}></div>
              {/* Image principale */}
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover opacity-90"
              />
              {/* Effet de scintillement */}
              <div className="absolute inset-0 animate-screen-flicker bg-current/5"></div>
              {/* Bordure lumineuse */}
              <div className="absolute inset-0 border border-current/30"></div>
            </div>
            <h3 className="text-lg font-semibold">{t('about.role')}</h3>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="animate-text-blink">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span>VAULT 42</span>
              </div>
              <div className="flex justify-between">
                <span>CLEARANCE:</span>
                <span>LEVEL 4</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 space-y-4">
          <p>{t('about.intro')}</p>
          <p>{t('about.background')}</p>
          <p>{t('about.approach')}</p>
          
          <div className="border border-current p-2 rounded-md mt-4">
            <div className="text-xs opacity-70">SYSTEM ANALYSIS</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lightbulb size={16} />
                  <span>CREATIVITY:</span>
                </div>
                <span>[████████░░] 80%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Brain size={16} />
                  <span>PROBLEM SOLVING:</span>
                </div>
                <span>[███████░░░] 70%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  <span>ADAPTABILITY:</span>
                </div>
                <span>[█████████░] 90%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span>COMMUNICATION:</span>
                </div>
                <span>[████████░░] 80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
