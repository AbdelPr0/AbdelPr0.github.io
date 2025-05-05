import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiPython, SiKotlin, SiPhp, SiVuedotjs, SiAngular } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { 
  Monitor, // Frontend
  Server, // Backend
  Smartphone as MobileIcon, // Mobile
  Settings, // Other
  // Frontend skills
  FileCode2 as HtmlIcon, // HTML5
  Palette as CssIcon, // CSS3
  FileCode as JsIcon, // JavaScript
  Type as TsIcon, // TypeScript
  Atom as ReactIcon, // React
  Paintbrush as TailwindIcon, // Tailwind CSS
  // Backend skills
  Network as NodeIcon, // Node.js
  Database as MysqlIcon, // MySQL
  Coffee as JavaIcon, // Java
  Leaf as SpringIcon, // Spring Boot
  Hash as CSharpIcon, // C#
  // Mobile skills
  Smartphone as FlutterIcon, // Flutter
  Smartphone as AndroidIcon, // Android
  // Other skills
  GitBranch as GitIcon, // Git
  Container as DockerIcon, // Docker
  PenTool as FigmaIcon, // Figma
  Users as AgileIcon, // Agile/Scrum
  Layout as UiIcon // UI/UX Design
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();
  
  // Get skills from translations
  const frontendSkills = t('skills.frontendSkills', { returnObjects: true }) as string[];
  const backendSkills = t('skills.backendSkills', { returnObjects: true }) as string[];
  const mobileSkills = t('skills.mobileSkills', { returnObjects: true }) as string[];
  const otherSkills = t('skills.otherSkills', { returnObjects: true }) as string[];
  
  const SkillItem = ({ skill, icon: Icon }: { skill: string, icon: LucideIcon | IconType }) => {
    return (
      <div className="group aspect-square flex flex-col items-center justify-center p-3 border border-current rounded-md hover:bg-current/5 transition-all duration-300">
        <Icon size={28} className="mb-2 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-xs text-center font-medium">{skill}</span>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {frontendSkills.map((skill, index) => {
              const icons = [HtmlIcon, CssIcon, JsIcon, TsIcon, ReactIcon, SiVuedotjs, TailwindIcon, SiAngular];
              return <SkillItem key={skill} skill={skill} icon={icons[index]} />;
            })}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Server size={20} />
            <span>[02] {t('skills.backend')}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {backendSkills.map((skill, index) => {
              const icons = [NodeIcon, SiPython, SiPhp, MysqlIcon, JavaIcon, SiKotlin, SpringIcon, CSharpIcon];
              return <SkillItem key={skill} skill={skill} icon={icons[index]} />;
            })}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <MobileIcon size={20} />
            <span>[03] {t('skills.mobile')}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mobileSkills.map((skill, index) => {
              const icons = [FlutterIcon, AndroidIcon];
              return <SkillItem key={skill} skill={skill} icon={icons[index]} />;
            })}
          </div>
        </div>
        
        <div className="border border-current p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Settings size={20} />
            <span>[04] {t('skills.other')}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {otherSkills.map((skill, index) => {
              const icons = [GitIcon, DockerIcon, FigmaIcon, AgileIcon, UiIcon];
              return <SkillItem key={skill} skill={skill} icon={icons[index]} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
