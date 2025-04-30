
import React from 'react';
import { useTranslation } from 'react-i18next';

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();
  
  // Get skills from translations
  const frontendSkills = t('skills.frontendSkills', { returnObjects: true }) as string[];
  const backendSkills = t('skills.backendSkills', { returnObjects: true }) as string[];
  const mobileSkills = t('skills.mobileSkills', { returnObjects: true }) as string[];
  const otherSkills = t('skills.otherSkills', { returnObjects: true }) as string[];
  
  const SkillBar = ({ skill, index }: { skill: string, index: number }) => {
    // Generate a random percentage between 65% and 95% for skill level
    const percentage = 65 + Math.floor(Math.random() * 31);
    const filled = Math.floor(percentage / 10);
    
    // Add a small delay for each skill to create a sequential loading effect
    const delayClass = `delay-[${index * 100}ms]`;
    
    return (
      <div className="mb-2">
        <div className="flex justify-between text-xs">
          <span>{skill}</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-current/20 mt-1">
          <div 
            className="h-full bg-current animate-pulse"
            style={{ 
              width: `${percentage}%`,
              transition: `width 1s ease-in-out ${index * 0.1}s`
            }}
          ></div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('skills.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3">
            <span className="mr-2">[01]</span>
            {t('skills.frontend')}
          </h3>
          <div className="space-y-2">
            {frontendSkills.map((skill, index) => (
              <SkillBar key={skill} skill={skill} index={index} />
            ))}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3">
            <span className="mr-2">[02]</span>
            {t('skills.backend')}
          </h3>
          <div className="space-y-2">
            {backendSkills.map((skill, index) => (
              <SkillBar key={skill} skill={skill} index={index} />
            ))}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3">
            <span className="mr-2">[03]</span>
            {t('skills.mobile')}
          </h3>
          <div className="space-y-2">
            {mobileSkills.map((skill, index) => (
              <SkillBar key={skill} skill={skill} index={index} />
            ))}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3">
            <span className="mr-2">[04]</span>
            {t('skills.other')}
          </h3>
          <div className="space-y-2">
            {otherSkills.map((skill, index) => (
              <SkillBar key={skill} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
