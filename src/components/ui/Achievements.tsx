import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Unlock, Trophy, Star } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: 'trophy' | 'star';
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first_command',
    title: 'First Command!',
    description: 'You executed your first command in the terminal!',
    unlocked: false,
    icon: 'trophy'
  },
  {
    id: 'explorer',
    title: 'Explorer!',
    description: 'You visited all main sections of the portfolio!',
    unlocked: false,
    icon: 'star'
  },
  {
    id: 'theme_changer',
    title: 'Theme Changer!',
    description: 'You changed the theme of the portfolio!',
    unlocked: false,
    icon: 'trophy'
  },
  {
    id: 'language_switcher',
    title: 'Language Switcher!',
    description: 'You switched the language of the portfolio!',
    unlocked: false,
    icon: 'star'
  }
];

const Achievements: React.FC = () => {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);

  useEffect(() => {
    // Charger les achievements depuis localStorage
    const savedAchievements = localStorage.getItem('achievements');
    if (savedAchievements) {
      const unlockedAchievements = JSON.parse(savedAchievements);
      setAchievements(prevAchievements => 
        prevAchievements.map(achievement => ({
          ...achievement,
          unlocked: unlockedAchievements.some((a: Achievement) => a.id === achievement.id)
        }))
      );
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-bold">{t('achievements.title', 'Achievements')}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              achievement.unlocked
                ? 'border-green-500/50 bg-green-500/10'
                : 'border-gray-500/30 bg-gray-500/10'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                achievement.unlocked
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-gray-500/20 text-gray-500'
              }`}>
                {achievement.icon === 'trophy' ? (
                  <Trophy size={20} />
                ) : (
                  <Star size={20} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{t(`achievements.${achievement.id}.title`, achievement.title)}</h3>
                  {achievement.unlocked ? (
                    <Unlock size={16} className="text-green-500" />
                  ) : (
                    <Lock size={16} className="text-gray-500" />
                  )}
                </div>
                <p className="text-sm mt-1 opacity-80">
                  {t(`achievements.${achievement.id}.description`, achievement.description)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements; 