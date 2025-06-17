import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Calendar, BookOpen, Star, Code, Server, Database, Cloud } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const RecruiterModeSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Sample data for skills
  const keySkills = [
    { category: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', skills: ['Node.js', 'Express', 'NestJS', 'Python', 'Django'] },
    { category: 'Database', skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis', 'Prisma'] },
    { category: 'DevOps', skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'] },
  ];
  
  // Sample data for experience
  const experienceHighlights = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2020 - Present',
      highlights: [
        'Led development of a high-traffic e-commerce platform with React and Node.js',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews'
      ]
    },
    {
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      period: '2018 - 2020',
      highlights: [
        'Managed Kubernetes clusters in AWS environment',
        'Implemented infrastructure as code using Terraform',
        'Reduced cloud costs by 30% through optimization'
      ]
    },
  ];
  
  const handleCVDownload = () => {
    // This would trigger the CV download functionality
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // Path to CV file
    link.download = 'developer_cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('recruiter-mode.title')}
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6 pb-6">
        {/* Left column - Profile summary */}
        <div className="w-full md:w-1/3">
          <div className="border border-current rounded-md p-4 h-full">
            <div className="flex justify-center mb-4">
              <div className="rounded-full overflow-hidden w-24 h-24 border-2 border-current">
                <img 
                  src="/profile.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="text-center mb-4">
              <h3 className="font-bold">Abdelrahmane Gacemi</h3>
              <p className="text-sm opacity-80">{t('about.subtitle')}</p>
            </div>
            
            <p className="text-sm text-center mb-4">
              {t('recruiter-mode.pitch')}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span className="text-sm">
                  <span className="font-medium">{t('recruiter-mode.availability')}:</span> {' '}
                  <span className="text-green-500 dark:text-green-400">{t('recruiter-mode.available')}</span>
                </span>
              </div>
              
              <button 
                onClick={handleCVDownload}
                className="w-full flex items-center justify-center gap-2 mt-4 py-2 px-4 border border-current rounded-md hover:bg-current/10 transition-colors"
              >
                <Download size={14} />
                <span className="text-sm">{t('recruiter-mode.cv-download')}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right column - Content */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Tech Stack */}
          <div className="border border-current rounded-md p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Code size={16} />
              {t('recruiter-mode.stack')}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {keySkills.map((category, index) => (
                <div key={index} className="space-y-1">
                  <h4 className="text-sm font-medium">{category.category}</h4>
                  <div className="space-y-1">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="text-xs opacity-80 flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-current"></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience Highlights */}
          <div className="border border-current rounded-md p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Star size={16} />
              {t('recruiter-mode.experience')}
            </h3>
            
            <div className="space-y-4">
              {experienceHighlights.map((exp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-2 border-current pl-3 space-y-1"
                >
                  <h4 className="font-medium text-sm">{exp.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-80">{exp.company}</span>
                    <span className="text-xs bg-current/10 px-2 py-0.5 rounded-full">{exp.period}</span>
                  </div>
                  <ul className="space-y-1 mt-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-1">
                        <span className="mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Key Projects Overview */}
          <div className="border border-current rounded-md p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <BookOpen size={16} />
              {t('projects.featured')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-current rounded p-3 hover:bg-current/5 transition-colors">
                <h4 className="text-sm font-medium">Terminal Portfolio</h4>
                <p className="text-xs opacity-80 mt-1">React, TypeScript, TailwindCSS</p>
              </div>
              
              <div className="border border-current rounded p-3 hover:bg-current/5 transition-colors">
                <h4 className="text-sm font-medium">E-commerce Platform</h4>
                <p className="text-xs opacity-80 mt-1">Node.js, React, MongoDB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterModeSection; 