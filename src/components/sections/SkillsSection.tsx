import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Monitor, // Frontend
  Server, // Backend
  Smartphone as MobileIcon, // Mobile
  Settings, // Other
  // Frontend skills
  Code2 as HtmlIcon, // HTML5
  Palette, // CSS3
  FileCode, // JavaScript
  Type, // TypeScript
  Atom, // React
  Code as VueIcon, // Vue.js
  Paintbrush, // Tailwind CSS
  Code as AngularIcon, // Angular
  // Backend skills
  Code2 as NodeIcon, // Node.js
  Code2 as PythonIcon, // Python
  Code2 as PhpIcon, // PHP
  Database as MysqlIcon, // MySQL
  Code2 as JavaIcon, // Java
  Code2 as KotlinIcon, // Kotlin
  Code2 as SpringIcon, // Spring Boot
  Code2 as CSharpIcon, // C#
  // Mobile skills
  Smartphone as FlutterIcon, // Flutter
  Smartphone as AndroidIcon, // Android
  // Other skills
  GitBranch, // Git
  Container, // Docker
  PenTool, // Figma
  Users, // Agile/Scrum
  Layout // UI/UX Design
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();
  
  // Get skills from translations
  const frontendSkills = t('skills.frontendSkills', { returnObjects: true }) as string[];
  const backendSkills = t('skills.backendSkills', { returnObjects: true }) as string[];
  const mobileSkills = t('skills.mobileSkills', { returnObjects: true }) as string[];
  const otherSkills = t('skills.otherSkills', { returnObjects: true }) as string[];
  
  const SkillBar = ({ skill, index, icon: Icon }: { skill: string, index: number, icon: LucideIcon }) => {
    // Generate a random percentage between 65% and 95% for skill level
    const percentage = 65 + Math.floor(Math.random() * 31);
    const filled = Math.floor(percentage / 10);
    
    // Add a small delay for each skill to create a sequential loading effect
    const delayClass = `delay-[${index * 100}ms]`;
    
    return (
      <div className="mb-2">
        <div className="flex justify-between text-xs">
          <div className="flex items-center gap-2">
            <Icon size={16} />
          <span>{skill}</span>
          </div>
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
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Monitor size={20} />
            <span>[01] {t('skills.frontend')}</span>
          </h3>
          <div className="space-y-2">
            {frontendSkills.map((skill, index) => {
              const icons = [HtmlIcon, Palette, FileCode, Type, Atom, VueIcon, Paintbrush, AngularIcon];
              return <SkillBar key={skill} skill={skill} index={index} icon={icons[index]} />;
            })}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Server size={20} />
            <span>[02] {t('skills.backend')}</span>
          </h3>
          <div className="space-y-2">
            {backendSkills.map((skill, index) => {
              const icons = [NodeIcon, PythonIcon, PhpIcon, MysqlIcon, JavaIcon, KotlinIcon, SpringIcon, CSharpIcon];
              return <SkillBar key={skill} skill={skill} index={index} icon={icons[index]} />;
            })}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <MobileIcon size={20} />
            <span>[03] {t('skills.mobile')}</span>
          </h3>
          <div className="space-y-2">
            {mobileSkills.map((skill, index) => {
              const icons = [FlutterIcon, AndroidIcon];
              return <SkillBar key={skill} skill={skill} index={index} icon={icons[index]} />;
            })}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Settings size={20} />
            <span>[04] {t('skills.other')}</span>
          </h3>
          <div className="space-y-2">
            {otherSkills.map((skill, index) => {
              const icons = [GitBranch, Container, PenTool, Users, Layout];
              return <SkillBar key={skill} skill={skill} index={index} icon={icons[index]} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
