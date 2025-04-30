
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from 'lucide-react';

const LanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };
  
  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-1 text-xs border border-current px-2 py-1 rounded hover:bg-current/10 transition-colors"
      title={t('language.switch')}
    >
      <Language size={14} />
      <span>{i18n.language === 'en' ? 'FR' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitch;
