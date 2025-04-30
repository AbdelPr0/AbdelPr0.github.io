
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  title: string;
  description: string;
  tech: string;
}

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  
  // Get projects from translations
  const projects = t('projects.items', { returnObjects: true }) as Project[];
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('projects.title')}
      </h2>
      
      <div className="space-y-1 mb-4">
        <p className="text-sm opacity-70">[STATUS: ACTIVE]</p>
        <p className="text-sm opacity-70">[RECORDS FOUND: {projects.length}]</p>
        <p className="text-lg">{t('projects.featured')}:</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors">
            <h3 className="text-lg font-semibold">
              {project.title}
              <span className="ml-2 text-xs opacity-70">[REF-{String(index + 1).padStart(3, '0')}]</span>
            </h3>
            <p className="my-2 text-sm">{project.description}</p>
            <div className="flex justify-between items-end">
              <div className="text-xs opacity-70">
                <span>TECH: {project.tech}</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-xs border border-current px-2 py-1 rounded hover:bg-current/10">
                  {t('projects.viewProject')}
                </button>
                <button className="text-xs border border-current px-2 py-1 rounded hover:bg-current/10">
                  {t('projects.viewCode')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <button className="border border-current px-4 py-2 rounded hover:bg-current/10 transition-colors">
          {t('projects.viewAll')}
        </button>
      </div>
    </div>
  );
};

export default ProjectsSection;
