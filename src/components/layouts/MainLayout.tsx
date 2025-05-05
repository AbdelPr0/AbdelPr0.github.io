import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CRTEffect from '@/components/effects/CRTEffect';
import TerminalHeader from '@/components/terminal/TerminalHeader';

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
        <div className="min-h-screen w-full p-2 sm:p-4 md:p-6 flex flex-col">
          <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col px-2 sm:px-4 md:px-6">
            <div className="terminal-window flex-1 flex flex-col w-full overflow-hidden">
              <TerminalHeader />
              <div className="terminal-content flex-1 overflow-y-auto overflow-x-hidden">
                {children}
              </div>
            </div>
          </main>
          <footer className="mt-4 text-center text-xs opacity-70 px-2 sm:px-4">
            <p>{t('footer.copyright')} | {t('footer.rights')}</p>
            <p>{t('footer.madeWith')}</p>
          </footer>
        </div>
      </CRTEffect>
    </ThemeProvider>
  );
};

export default MainLayout;
