
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('about.title')}
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="border border-current p-4 rounded-md">
            <div className="aspect-square bg-terminal-dark/50 rounded flex items-center justify-center mb-4">
              {/* Utilisation du profil téléchargé */}
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage 
                  src="/lovable-uploads/6f939b66-853e-4d45-951f-ae326ca8a583.png" 
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="text-6xl">ID</AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-lg font-semibold">{t('about.role')}</h3>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="animate-text-blink">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span>VAULT 42</span>
              </div>
              <div className="flex justify-between">
                <span>CLEARANCE:</span>
                <span>LEVEL 4</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 space-y-4">
          <p>{t('about.intro')}</p>
          <p>{t('about.background')}</p>
          <p>{t('about.approach')}</p>
          
          <div className="border border-current p-2 rounded-md mt-4">
            <div className="text-xs opacity-70 mb-1">SYSTEM ANALYSIS</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between">
                <span>CREATIVITY:</span>
                <span>[████████░░] 80%</span>
              </div>
              <div className="flex justify-between">
                <span>PROBLEM SOLVING:</span>
                <span>[███████░░░] 70%</span>
              </div>
              <div className="flex justify-between">
                <span>ADAPTABILITY:</span>
                <span>[█████████░] 90%</span>
              </div>
              <div className="flex justify-between">
                <span>COMMUNICATION:</span>
                <span>[████████░░] 80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
