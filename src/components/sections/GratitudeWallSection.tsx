import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Youtube } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Person {
  name: string;
  role: string;
  message: string;
  category: string;
  link?: string;
}

const GratitudeWallSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All', icon: User },
    { id: 'teachers', label: t('gratitude-wall.categories.teachers'), icon: GraduationCap },
    { id: 'mentors', label: t('gratitude-wall.categories.mentors'), icon: User },
    { id: 'colleagues', label: t('gratitude-wall.categories.colleagues'), icon: Briefcase },
    { id: 'content-creators', label: t('gratitude-wall.categories.content-creators'), icon: Youtube },
  ];
  
  // Sample people to thank
  const people: Person[] = [
    {
      name: 'Prof. Sarah Johnson',
      role: 'Computer Science Professor',
      message: 'For introducing me to the fundamentals of algorithms and instilling a passion for clean code.',
      category: 'teachers',
      link: 'https://example.com/sarahjohnson'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Database Systems Instructor',
      message: 'For teaching me the intricacies of database design and optimization techniques.',
      category: 'teachers'
    },
    {
      name: 'Alex Rivera',
      role: 'Senior Developer & Mentor',
      message: 'For countless code reviews and guidance that shaped my professional development.',
      category: 'mentors',
      link: 'https://github.com/alexrivera'
    },
    {
      name: 'Sophia Lee',
      role: 'Tech Lead',
      message: 'For trusting me with challenging projects and providing continuous feedback on my growth areas.',
      category: 'mentors'
    },
    {
      name: 'James Wilson',
      role: 'Backend Engineer',
      message: 'For collaboration on complex backend systems and sharing knowledge about system architecture.',
      category: 'colleagues'
    },
    {
      name: 'Emma Rodriguez',
      role: 'UX Designer',
      message: 'For teaching me the importance of user-centered design and cross-functional collaboration.',
      category: 'colleagues'
    },
    {
      name: 'Traversy Media',
      role: 'YouTube Channel',
      message: 'For practical tutorials that helped me learn new frameworks and technologies.',
      category: 'content-creators',
      link: 'https://www.youtube.com/traversymedia'
    },
    {
      name: 'Kent C. Dodds',
      role: 'Course Creator & Open Source Contributor',
      message: 'For exceptional React courses and promoting best practices in testing and accessibility.',
      category: 'content-creators',
      link: 'https://kentcdodds.com/'
    }
  ];
  
  const filteredPeople = activeCategory === 'all' 
    ? people 
    : people.filter(person => person.category === activeCategory);
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'teachers': return GraduationCap;
      case 'mentors': return User;
      case 'colleagues': return Briefcase;
      case 'content-creators': return Youtube;
      default: return User;
    }
  };
  
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('gratitude-wall.title')}
      </h2>
      
      <p className="text-sm sm:text-base">
        {t('gratitude-wall.message')}
      </p>
      
      <div className="flex overflow-x-auto py-2 mb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex items-center px-4 py-2 mr-2 rounded-md border transition-all whitespace-nowrap ${
              activeCategory === category.id 
                ? 'border-current bg-current/10' 
                : 'border-current/30 hover:border-current/60'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon size={14} className="mr-2" />
            <span className="text-sm">{category.label}</span>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredPeople.map((person, index) => {
          const Icon = getCategoryIcon(person.category);
          
          return (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-current rounded-md p-4 hover:bg-current/5 transition-all relative overflow-hidden"
            >
              {/* Gratitude card with subtle animation */}
              <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-current/5 rounded-full transform rotate-45"></div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-current/10 rounded-full">
                  <Icon size={18} className="text-current" />
                </div>
                
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{person.name}</h3>
                      <p className="text-xs opacity-70">{person.role}</p>
                    </div>
                    
                    <div className="text-xs py-1 px-2 rounded-full bg-current/10">
                      {t(`gratitude-wall.categories.${person.category}`)}
                    </div>
                  </div>
                  
                  <p className="text-sm italic">"{person.message}"</p>
                  
                  {person.link && (
                    <a 
                      href={person.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs inline-flex items-center hover:underline"
                    >
                      <span className="mr-1">Visit</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GratitudeWallSection; 