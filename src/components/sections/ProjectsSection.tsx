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
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-current rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <button onClick={onClose} className="text-current hover:opacity-70">
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
                  <h3 className="text-lg font-semibold mb-2">
                    {t('projects.demonstration')}
                  </h3>
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
                <h3 className="text-lg font-semibold mb-2">
                  {t('projects.description')}
                </h3>
                <p className="text-sm">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.features && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {t('projects.features')}
                  </h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  {t('projects.technologies')}
                </h3>
                <p className="text-sm">{project.tech}</p>
              </div>

              <div className="flex space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs border border-current px-2 py-1 rounded flex items-center gap-1 hover:bg-current/10 transition-colors ml-2"
                    title={t('projects.viewOnGithub')}
                  >
                    <FaGithub size={14} />
                    GitHub
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
  const projectsData = t('projects.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    longDescription: string;
    tech: string;
    features: string[];
  }>;

  const projects: Project[] = projectsData.map((project, index) => ({
    title: project.title,
    description: project.description,
    longDescription: project.longDescription,
    tech: project.tech,
    image: [
      '/Cineflix.png',
      '/AnswerSphere.png',
      '/Bonhomme.png',
      '/RechercheCodeMirror6.png',
    ][index],
    githubUrl: [
      'https://github.com/AbdelPr0/Cineflix',
      'https://github.com/AbdelPr0/AnswerSphere',
      'https://github.com/AbdelPr0/Bonhomme-pendu',
      'https://github.com/AbdelPr0/RechercheCodeMirror6',
    ][index],
    features: project.features,
  }));

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
          <div
            key={index}
            className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors"
          >
            <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold">
              {project.title}
              <span className="ml-2 text-xs opacity-70">
                [REF-{String(index + 1).padStart(3, '0')}]
              </span>
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
                <a
                  href={project.githubUrl ? project.githubUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs border border-current px-2 py-1 rounded flex items-center gap-1 transition-colors ml-2 ${
                    project.githubUrl
                      ? 'hover:bg-current/10'
                      : 'opacity-50 pointer-events-none'
                  }`}
                  title={
                    project.githubUrl
                      ? t('projects.viewOnGithub')
                      : t('projects.noGithubRepo')
                  }
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
