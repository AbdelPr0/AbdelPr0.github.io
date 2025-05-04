import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CVDownload: React.FC = () => {
  const [status, setStatus] = useState<'downloading' | 'success' | 'error'>('downloading');
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Vérifier si le fichier existe
    fetch('public/cv.pdf', { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          throw new Error('CV file not found');
        }
        // Si le fichier existe, démarrer l'animation
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setStatus('success');
              return 100;
            }
            return prev + 10;
          });
        }, 200);

        return () => clearInterval(interval);
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    if (status === 'success') {
      // Déclencher le téléchargement réel après l'animation
      fetch('public/cv.pdf')
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'CV_Abdelrahmane_Gacemi.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch(() => {
          setStatus('error');
        });
    }
  }, [status]);

  const messages = {
    downloading: {
      icon: <Download className="animate-bounce" size={20} />,
      text: t('cv.downloading.text'),
      log: `> ${t('cv.downloading.log')} ${progress}%`,
      color: "text-current"
    },
    success: {
      icon: <CheckCircle2 size={20} />,
      text: t('cv.success.text'),
      log: t('cv.success.log'),
      color: "text-green-500"
    },
    error: {
      icon: <XCircle size={20} />,
      text: t('cv.error.text'),
      log: t('cv.error.log'),
      color: "text-red-500"
    }
  };

  const currentMessage = messages[status];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className={currentMessage.color}>
          {currentMessage.icon}
        </div>
        <span>{currentMessage.text}</span>
      </div>

      {status === 'downloading' && (
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-current h-2.5 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className={`font-mono text-xs ${currentMessage.color}`}>
        <div className={status === 'downloading' ? 'animate-pulse' : ''}>
          {currentMessage.log}
        </div>
      </div>
    </div>
  );
};

export default CVDownload; 