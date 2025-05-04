import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { Lightbulb, Brain, RefreshCw, MessageSquare, Users, Crown, Clock, GraduationCap } from 'lucide-react';

interface TimelineItemData {
  year: string;
  title: string;
  school: string;
  description: string;
}

const TimelineItem: React.FC<{ 
  year: string; 
  title: string; 
  school: string; 
  description: string;
  isLast?: boolean;
}> = ({ year, title, school, description, isLast = false }) => {
  return (
    <div className="relative pl-8 pb-8 group">
      {/* Ligne verticale */}
      {!isLast && (
        <div className="absolute left-[15px] top-6 bottom-0 w-[2px] bg-current/30 group-hover:bg-current/50 transition-colors duration-300"></div>
      )}
      
      {/* Point de la timeline */}
      <div className="absolute left-[11px] top-2 w-4 h-4 rounded-full border-2 border-current group-hover:scale-110 transition-transform duration-300">
        <div className="absolute inset-0 bg-current/20 group-hover:bg-current/40 transition-colors duration-300 rounded-full"></div>
      </div>
      
      {/* Contenu */}
      <div className="border border-current p-4 rounded-md hover:bg-current/5 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap size={16} className="text-current/70" />
          <span className="text-sm font-mono">{year}</span>
        </div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-current/70">{school}</p>
        <p className="mt-2 text-sm">{description}</p>
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const softSkills = [
    { icon: MessageSquare, label: 'communication', color: 'text-blue-400' },
    { icon: Users, label: 'teamwork', color: 'text-green-400' },
    { icon: Lightbulb, label: 'problemSolving', color: 'text-yellow-400' },
    { icon: RefreshCw, label: 'adaptability', color: 'text-purple-400' },
    { icon: Crown, label: 'leadership', color: 'text-red-400' },
    { icon: Clock, label: 'timeManagement', color: 'text-cyan-400' }
  ];

  const timelineItems = t('about.timeline.items', { returnObjects: true }) as TimelineItemData[];
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('about.title')}
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
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
          </div>
        </div>
        
        <div className="lg:w-2/3 space-y-4">
          <div className="space-y-4">
          <p>{t('about.intro')}</p>
          <p>{t('about.background')}</p>
          <p>{t('about.approach')}</p>
          </div>
          
          <div className="border border-current p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4">{t('about.softSkills.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {softSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="group relative flex items-center gap-2 p-2 border border-current rounded-md hover:bg-current/5 transition-all duration-300 overflow-hidden"
                >
                  {/* Effet de fond animé */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  {/* Effet de bordure lumineuse */}
                  <div className="absolute inset-0 border border-current/30 group-hover:border-current/50 transition-colors duration-300"></div>
                  
                  {/* Effet de pulsation de l'icône */}
                  <div className="relative z-10">
                    <skill.icon 
                      size={20} 
                      className={`${skill.color} group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse`} 
                    />
              </div>
                  
                  {/* Texte avec effet de glissement */}
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    {t(`about.softSkills.${skill.label}`)}
                  </span>
                  
                  {/* Effet de scan au survol */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              ))}
              </div>
              </div>

          <div className="border border-current p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4">{t('about.timeline.title')}</h3>
            <div className="space-y-4">
              {timelineItems.map((item, index) => (
                <TimelineItem
                  key={index}
                  year={item.year}
                  title={item.title}
                  school={item.school}
                  description={item.description}
                  isLast={index === timelineItems.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
