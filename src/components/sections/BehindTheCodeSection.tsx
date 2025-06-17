import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code, PenTool, Beaker, Cpu, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const BehindTheCodeSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('wireframes');
  
  const tabs = [
    { id: 'wireframes', icon: PenTool, label: t('behind-the-code.sections.wireframes') },
    { id: 'prototypes', icon: Code, label: t('behind-the-code.sections.prototypes') },
    { id: 'testing', icon: Beaker, label: t('behind-the-code.sections.testing') },
    { id: 'technical-choices', icon: Cpu, label: t('behind-the-code.sections.technical-choices') },
  ];
  
  const wireframeImages = [
    '/images/wireframes/wireframe-1.jpg',
    '/images/wireframes/wireframe-2.jpg',
  ];
  
  const prototypeImages = [
    '/images/prototypes/prototype-1.jpg',
    '/images/prototypes/prototype-2.jpg',
  ];
  
  // Mock images - these would be replaced with actual images
  const getPlaceholderUrl = (text: string) => {
    return `https://via.placeholder.com/400x300?text=${text.replace(' ', '+')}`;
  };
  
  // Sample data for technical choices
  const technicalChoices = [
    { name: 'React', reason: 'Component-based architecture for reusable UI elements and a responsive, interactive user experience.' },
    { name: 'TypeScript', reason: 'Type safety to reduce bugs and improve developer experience with better autocompletion and documentation.' },
    { name: 'Tailwind CSS', reason: 'Utility-first approach for rapid UI development without leaving HTML, with consistent design tokens.' },
    { name: 'Framer Motion', reason: 'Powerful animation library for React that makes creating complex animations simple and performant.' },
    { name: 'i18next', reason: 'Complete internationalization solution with support for namespaces, context, plurals and more.' },
  ];
  
  // Sample testing approaches
  const testingApproaches = [
    { name: 'User Testing', description: 'Iterative testing with real users to validate usability and identify pain points.' },
    { name: 'Performance Metrics', description: 'Lighthouse scores optimization for performance, accessibility, and SEO.' },
    { name: 'Cross-Browser Testing', description: 'Ensuring compatibility across Chrome, Firefox, Safari, and Edge.' },
    { name: 'Mobile Responsiveness', description: 'Testing adaptive layout on various device sizes and orientations.' },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'wireframes':
        return (
          <div className="space-y-4">
            <p className="text-sm">
              {t('behind-the-code.wireframes-description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wireframeImages.map((src, index) => (
                <div key={index} className="border border-current rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                  <img 
                    src={getPlaceholderUrl('Wireframe ' + (index + 1))} 
                    alt={`Wireframe ${index + 1}`} 
                    className="w-full h-auto"
                  />
                  <div className="p-2 text-xs opacity-70">Wireframe {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'prototypes':
        return (
          <div className="space-y-4">
            <p className="text-sm">
              {t('behind-the-code.prototypes-description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prototypeImages.map((src, index) => (
                <div key={index} className="border border-current rounded-md overflow-hidden hover:opacity-90 transition-opacity">
                  <img 
                    src={getPlaceholderUrl('Prototype ' + (index + 1))} 
                    alt={`Prototype ${index + 1}`} 
                    className="w-full h-auto"
                  />
                  <div className="p-2 text-xs opacity-70">Prototype v0.{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'testing':
        return (
          <div className="space-y-4">
            <p className="text-sm">
              {t('behind-the-code.testing-description')}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {testingApproaches.map((approach, index) => (
                <div key={index} className="border border-current rounded-md p-3 hover:bg-current/5 transition-colors">
                  <h4 className="font-medium text-sm mb-1">{approach.name}</h4>
                  <p className="text-xs opacity-80">{approach.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'technical-choices':
        return (
          <div className="space-y-4">
            <p className="text-sm">
              {t('behind-the-code.technical-choices-description')}
            </p>
            <div className="space-y-3">
              {technicalChoices.map((tech, index) => (
                <div key={index} className="border border-current rounded-md p-3 hover:bg-current/5 transition-colors">
                  <div className="flex items-start">
                    <ChevronRight size={16} className="mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">{tech.name}</h4>
                      <p className="text-xs opacity-80 mt-1">{tech.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('behind-the-code.title')}
      </h2>
      
      <p className="text-sm sm:text-base">
        {t('behind-the-code.description')}
      </p>
      
      <div className="flex flex-col">
        <div className="flex overflow-x-auto py-2 mb-4 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 mr-2 rounded-md border transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-current bg-current/10' 
                  : 'border-current/30 hover:border-current/60'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={14} className="mr-2" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border border-current rounded-md p-4"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default BehindTheCodeSection; 