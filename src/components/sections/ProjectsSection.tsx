import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  tech: string;
  image: string;
  longDescription?: string;
  videoUrl?: string;
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  parcours?: string;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-current rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <button 
              onClick={onClose}
              className="text-current hover:opacity-70"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {project.videoUrl && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Démonstration</h3>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={project.videoUrl}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-sm">{project.longDescription || project.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Parcours scolaire</h3>
                <p className="text-sm">{project.parcours || 'Non renseigné'}</p>
              </div>

              {project.features && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Fonctionnalités</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                <p className="text-sm">{project.tech}</p>
              </div>

              <div className="flex space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs border border-current px-2 py-1 rounded flex items-center gap-1 hover:bg-current/10 transition-colors ml-2"
                    title="Voir sur GitHub"
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border border-current px-4 py-2 rounded hover:bg-current/10"
                  >
                    Voir le projet
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Get projects from translations
  const projects = [
    {
      title: 'Projet Alpha',
      description: 'Un projet innovant pour la gestion de tâches.',
      longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisi nec velit. Proin euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisi nec velit. Suspendisse potenti. Vivamus euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisi nec velit.',
      tech: 'React, Node.js, MongoDB',
      image: 'https://placehold.co/600x400',
      parcours: 'Première année de BUT Informatique',
      githubUrl: 'https://github.com/example/projet-alpha',
      liveUrl: 'https://example.com/projet-alpha',
      features: [
        'Gestion des tâches',
        'Interface intuitive',
        'Notifications en temps réel'
      ]
    },
    {
      title: 'Projet Beta',
      description: 'Application mobile de suivi sportif.',
      longDescription: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      tech: 'Flutter, Firebase',
      image: 'https://placehold.co/600x400',
      parcours: 'Stage de deuxième année',
      githubUrl: 'https://github.com/example/projet-beta',
      liveUrl: 'https://example.com/projet-beta',
      features: [
        'Suivi d\'activité',
        'Statistiques avancées',
        'Synchronisation cloud'
      ]
    },
    {
      title: 'Projet Gamma',
      description: 'Plateforme d\'apprentissage en ligne.',
      longDescription: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
      tech: 'Vue.js, Express, PostgreSQL',
      image: 'https://placehold.co/600x400',
      parcours: 'Projet de fin d\'études',
      githubUrl: 'https://github.com/example/projet-gamma',
      liveUrl: 'https://example.com/projet-gamma',
      features: [
        'Cours interactifs',
        'Suivi de progression',
        'Certificats de réussite'
      ]
    }
  ];
  
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
            <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold">
              {project.title}
              <span className="ml-2 text-xs opacity-70">[REF-{String(index + 1).padStart(3, '0')}]</span>
            </h3>
            <p className="my-2 text-sm">{project.description}</p>
            <div className="flex justify-between items-end">
              <div className="text-xs opacity-70">
                <span>TECH: {project.tech}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="text-xs border border-current px-2 py-1 rounded hover:bg-current/10"
                >
                  {t('projects.viewProject')}
                </button>
                {(() => { console.log(project); return null; })()}
                <a
                  href={project.githubUrl ? project.githubUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs border border-current px-2 py-1 rounded flex items-center gap-1 transition-colors ml-2 ${project.githubUrl ? 'hover:bg-current/10' : 'opacity-50 pointer-events-none'}`}
                  title={project.githubUrl ? 'Voir sur GitHub' : 'Aucun dépôt GitHub'}
                  tabIndex={project.githubUrl ? 0 : -1}
                >
                  <FaGithub size={14} />
                  GitHub
                </a>
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

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={true}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsSection;
