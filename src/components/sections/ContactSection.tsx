
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from "@/hooks/use-toast";

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
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
        variant: "default",
      });
      setFormState({
        name: '',
        email: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
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
                className="bg-terminal-dark/50 border border-current w-full p-2 rounded"
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
                className="bg-terminal-dark/50 border border-current w-full p-2 rounded"
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
                className="bg-terminal-dark/50 border border-current w-full p-2 rounded resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="border border-current px-4 py-2 rounded hover:bg-current/10 transition-colors w-full"
            >
              {loading ? t('contact.sending') : t('contact.send')}
              {loading && <span className="ml-2 animate-text-blink">...</span>}
            </button>
          </form>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('contact.socialTitle')}</h3>
          <div className="space-y-3">
            <div className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors">
              <div className="flex justify-between">
                <span>{t('contact.github')}</span>
                <a href="#" className="underline">github.com/abdelrahmane</a>
              </div>
            </div>
            <div className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors">
              <div className="flex justify-between">
                <span>{t('contact.linkedin')}</span>
                <a href="#" className="underline">linkedin.com/in/abdelrahmane</a>
              </div>
            </div>
            <div className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors">
              <div className="flex justify-between">
                <span>{t('contact.twitter')}</span>
                <a href="#" className="underline">twitter.com/abdelrahmane</a>
              </div>
            </div>
            <div className="border border-current p-3 rounded-md hover:bg-current/5 transition-colors">
              <div className="flex justify-between">
                <span>{t('contact.email')}</span>
                <a href="mailto:contact@abdelrahmane.dev" className="underline">contact@abdelrahmane.dev</a>
              </div>
            </div>
          </div>
          
          <div className="border border-current p-3 rounded-md mt-6 bg-terminal-dark/20">
            <div className="text-xs opacity-70">SYSTEM STATUS</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span>SERVER:</span>
                <span className="animate-text-blink">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>UPTIME:</span>
                <span>324 DAYS</span>
              </div>
              <div className="flex justify-between">
                <span>RESPONSE RATE:</span>
                <span>94%</span>
              </div>
              <div className="flex justify-between">
                <span>LAST UPDATE:</span>
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
