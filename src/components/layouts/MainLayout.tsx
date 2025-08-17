import CRTEffect from '@/components/effects/CRTEffect';
import TerminalHeader from '@/components/terminal/TerminalHeader';
import { ThemeProvider } from '@/contexts/ThemeContext';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  // Update document title based on language
  useEffect(() => {
    document.title = t('meta.title');
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t('meta.description'));
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
          <footer className="mt-4 text-center text-xs opacity-70 px-2 sm:px-4 flex flex-col items-center gap-1">
            <div className="flex justify-center gap-4 mb-1">
              <a
                href="https://github.com/AbdelPr0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-80"
                title="GitHub"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/abdelrahmane-gacemi-a300982a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 opacity-80"
                title="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
                </svg>
              </a>
              <a
                href="mailto:abdelrahmanepro@yahoo.com"
                className="hover:opacity-100 opacity-80"
                title="Email"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 13.065l-11.99-7.065v14c0 1.104.896 2 2 2h19.98c1.104 0 2-.896 2-2v-14l-11.99 7.065zm11.99-9.065c0-1.104-.896-2-2-2h-19.98c-1.104 0-2 .896-2 2v.217l12 7.083 11.98-7.083v-.217z" />
                </svg>
              </a>
            </div>
            <p>
              {t('footer.copyright')} | {t('footer.rights')}
            </p>
            <p>{t('footer.madeWith')}</p>
          </footer>
        </div>
      </CRTEffect>
    </ThemeProvider>
  );
};

export default MainLayout;
