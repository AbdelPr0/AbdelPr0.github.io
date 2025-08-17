import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { HelpCircle, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'about', href: '#about' },
    { label: 'projects', href: '#projects' },
    { label: 'skills', href: '#skills' },
    // { label: 'blog', href: '#blog' },
    { label: 'contact', href: '#contact' },
    { label: 'cv', href: '#cv' },
  ];

  return (
    <nav className="border-b border-current">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">VAULT-TECH</span>
          </div>

          {/* Menu desktop */}
          <div className="md:hidden sm:hidden items-center space-x-4">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-current/5 transition-colors"
              >
                {t(`nav.${item.label}`)}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-current/5 transition-colors"
            >
              {t(`theme.${theme}`)}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-current/5 transition-colors"
            >
              {t(`language.${language}`)}
            </button>
            <a
              href="#help"
              className="p-2 rounded-md hover:bg-current/5 transition-colors"
            >
              <HelpCircle size={20} />
            </a>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-current/5 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-current/5 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(`nav.${item.label}`)}
            </a>
          ))}
          <div className="border-t border-current pt-2">
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-current/5 transition-colors"
            >
              {t(`theme.${theme}`)}
            </button>
            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-current/5 transition-colors"
            >
              {t(`language.${language}`)}
            </button>
            <a
              href="#help"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-current/5 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.help')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
