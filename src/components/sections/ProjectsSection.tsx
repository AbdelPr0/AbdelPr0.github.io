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
                <p className="text-sm">
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.features && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Fonctionnalités
                  </h3>
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
      title: 'API Cineflix',
      description: 'Cineflix, API REST de critiques et notations de films',
      longDescription:
        'API Cineflix est une API de gestion de critiques et notations de films inspirée d’IMDb. Elle permet aux utilisateurs de publier des avis, attribuer des notes, rechercher des films et consulter des classements basés sur les évaluations.',
      tech: 'Springboot, Kotlin, MySQL, REST',
      image: '/Cineflix.png',
      githubUrl: 'https://github.com/AbdelPr0/Cineflix',
      features: [
        'Avis sur les films',
        'Système de notation',
        'Recherche avancée',
        'Comptes utilisateurs',
      ],
    },
    {
      title: 'AnswerSphere',
      description: 'Application de sondages en ligne',
      longDescription:
        'AnswerSphere est une application web de sondages développée en C# avec ASP.NET. Elle offre une API et une interface web permettant de créer, gérer et répondre à des questionnaires grâce à des fonctionnalités CRUD complètes sur les questions et réponses.',
      tech: 'C#, ASP.NET, HTML, CSS, REST',
      image: '/AnswerSphere.png',
      githubUrl: 'https://github.com/AbdelPr0/AnswerSphere',
      features: [
        'Gestion des questions',
        'Gestion des réponses',
        'CRUD complet',
        'Interface web',
      ],
    },
    {
      title: 'Bonhomme-pendu',
      description: 'Bonhomme-pendu, jeu mobile en Java',
      longDescription:
        'Petit jeu mobile du pendu : devinez le mot en un nombre d’essais limité. Interface simple, logique claire et structure Gradle pour Android. Développé en Java.',
      tech: 'Java, Android Studio, SQLite, Gradle',
      image: '/Bonhomme.png',
      githubUrl: 'https://github.com/AbdelPr0/Bonhomme-pendu',
      features: [
        'Mots aléatoires & lettres à deviner',
        'Compteur d’essais/restantes',
        'Détection de victoire/défaite',
        'Réinitialisation rapide de partie',
      ],
    },
    {
      title: 'RechercheCodeMirror6',
      description: 'RechercheCodeMirror6, Prototype d’éditeur CodeMirror 6',
      longDescription:
        'Prototype d’intégration de CodeMirror 6 dans une app Vue, visant à remplacer CodeMirror 5 en conservant la coloration, thèmes, événements et ajoutant complétion, multi-fichiers et édition collaborative.',
      tech: 'Vue, Javascript, HTML, Vite',
      image: '/RechercheCodeMirror6.png',
      githubUrl: 'https://github.com/AbdelPr0/RechercheCodeMirror6',
      features: [
        'Multi-fichiers, édition collaborative (ciblées)',
        'Coloration et thèmes personnalisables',
        'Événements d’édition (sélection, modification)',
        'Immutabilité/masquage de lignes',
        'Complétion et aide syntaxique',
      ],
    },
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
                {(() => {
                  console.log(project);
                  return null;
                })()}
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
                    project.githubUrl ? 'Voir sur GitHub' : 'Aucun dépôt GitHub'
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
