
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import TerminalHeader from '@/components/terminal/TerminalHeader';
import CRTEffect from '@/components/effects/CRTEffect';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  // Update document title based on language
  useEffect(() => {
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  }, [t]);

  return (
    <ThemeProvider>
      <CRTEffect>
        <div className="min-h-screen p-2 sm:p-4 md:p-6 flex flex-col">
          <main className="flex-1 container mx-auto flex flex-col">
            <div className="terminal-window flex-1 flex flex-col">
              <TerminalHeader />
              <div className="terminal-content flex-1 overflow-y-auto">
                {children}
              </div>
            </div>
          </main>
          <footer className="mt-4 text-center text-xs opacity-70">
            <div className="animate-text-blink">█</div>
            <p>{t('footer.copyright')} | {t('footer.rights')}</p>
            <p>{t('footer.madeWith')}</p>
          </footer>
        </div>
      </CRTEffect>
    </ThemeProvider>
  );
};

export default MainLayout;
