import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MeetingScheduler from '../meeting/MeetingScheduler';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { theme } = useTheme();

  const [formState, setFormState] = useState({
    name: '',
    email: 'abdelrahmanepro@yahoo.com',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const isDarkTheme = theme !== 'light';
  const baseInputClass = `w-full p-2 rounded-md border ${
    isDarkTheme
      ? 'bg-terminal-dark border-gray-700 text-gray-300 placeholder-gray-500'
      : 'bg-white border-blue-200 text-blue-900 placeholder-blue-300'
  }`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: t('contact.success'),
        variant: 'default',
      });
      setFormState({
        name: '',
        email: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('contact.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('contact.formTitle')}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-1">
                {t('contact.name')}:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className={baseInputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                {t('contact.email')}:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className={baseInputClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm mb-1">
                {t('contact.message')}:
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={4}
                className={baseInputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded-md transition-colors disabled:opacity-50 ${
                isDarkTheme
                  ? 'border border-gray-700 hover:bg-gray-800 text-gray-300'
                  : 'border border-blue-200 hover:bg-blue-50 text-blue-900'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  {t('contact.sending')}
                  <span className="ml-2 animate-pulse">...</span>
                </span>
              ) : (
                t('contact.send')
              )}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('contact.socialTitle')}</h3>
          <div className="space-y-3">
            <MeetingScheduler email={formState.email} />
            <div className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Github size={18} />
                  <span>{t('contact.github')}</span>
                </div>
                <a
                  href="https://github.com/AbdelPr0"
                  className="underline"
                  target="_blank"
                >
                  github.com/AbdelPr0
                </a>
              </div>
            </div>
            <div className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Linkedin size={18} />
                  <span>{t('contact.linkedin')}</span>
                </div>
                <a
                  href="https://www.linkedin.com/in/abdelrahmane-gacemi-a300982a6/"
                  className="underline"
                  target="_blank"
                >
                  linkedin.com/in/abdelrahmane-gacemi-a300982a6/
                </a>
              </div>
            </div>
            <div className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>{t('contact.email')}</span>
                </div>
                <a
                  href="mailto:abdelrahmanepro@yahoo.com"
                  className="underline"
                  target="_blank"
                >
                  abdelrahmanepro@yahoo.com
                </a>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-md ${
              isDarkTheme
                ? 'bg-terminal-dark border border-gray-700'
                : 'bg-white/50 border border-blue-200'
            }`}
          >
            <div
              className={`text-sm mb-2 ${
                isDarkTheme ? 'text-gray-400' : 'text-blue-900'
              }`}
            >
              {t('contact.system.title')}
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>{t('contact.system.server')}:</span>
                <span className="animate-pulse">
                  {t('contact.system.status.online')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t('contact.system.uptime')}:</span>
                <span>324 {t('contact.system.status.days')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('contact.system.responseRate')}:</span>
                <span>100%</span>
              </div>
              <div className="flex justify-between">
                <span>{t('contact.system.lastUpdate')}:</span>
                <span>2077-10-23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
