import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, Star, Code, Loader } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface GitHubStats {
  totalCommits: number;
  totalRepositories: number;
  starsReceived: number;
  pullRequests: number;
  issuesOpened: number;
  currentStreak: number;
  languages: { name: string; percentage: number; color: string }[];
}

const GitHubStatsSection: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [activeMetric, setActiveMetric] = useState<string>('commits');
  
  useEffect(() => {
    // Simulate loading GitHub data
    const fetchGitHubStats = async () => {
      setLoading(true);
      
      try {
        // In a real app, you would fetch this data from GitHub API
        // This is mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setStats({
          totalCommits: 827,
          totalRepositories: 24,
          starsReceived: 156,
          pullRequests: 73,
          issuesOpened: 42,
          currentStreak: 15,
          languages: [
            { name: 'JavaScript', percentage: 40, color: '#f1e05a' },
            { name: 'TypeScript', percentage: 25, color: '#2b7489' },
            { name: 'Python', percentage: 15, color: '#3572A5' },
            { name: 'HTML', percentage: 10, color: '#e34c26' },
            { name: 'CSS', percentage: 10, color: '#563d7c' }
          ]
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setError(true);
        setLoading(false);
      }
    };
    
    fetchGitHubStats();
  }, []);
  
  const metrics = [
    { id: 'commits', label: t('github-stats.sections.commits'), icon: GitCommit },
    { id: 'languages', label: t('github-stats.sections.languages'), icon: Code },
    { id: 'contributions', label: t('github-stats.sections.contributions'), icon: GitBranch },
    { id: 'streak', label: t('github-stats.sections.streak'), icon: Star }
  ];
  
  const renderMetricContent = () => {
    if (!stats) return null;
    
    switch (activeMetric) {
      case 'commits':
        return (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="relative w-48 h-48">
              {/* Circular progress background */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="6" 
                  strokeOpacity="0.1" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="6" 
                  strokeDasharray="283" 
                  strokeDashoffset="0" 
                  className="transform -rotate-90 origin-center"
                />
              </svg>
              
              {/* Commits count */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <GitCommit className="w-8 h-8 mb-1" />
                <div className="text-3xl font-bold">{stats.totalCommits}</div>
                <div className="text-sm opacity-70">Total Commits</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="border border-current rounded-md p-3 text-center">
                <div className="text-lg font-bold">{stats.pullRequests}</div>
                <div className="text-xs opacity-70">Pull Requests</div>
              </div>
              
              <div className="border border-current rounded-md p-3 text-center">
                <div className="text-lg font-bold">{stats.issuesOpened}</div>
                <div className="text-xs opacity-70">Issues Opened</div>
              </div>
            </div>
          </div>
        );
      
      case 'languages':
        return (
          <div className="py-6 space-y-6">
            <div className="flex h-6 rounded-full overflow-hidden border border-current">
              {stats.languages.map((lang, idx) => (
                <div 
                  key={idx} 
                  className="h-full"
                  style={{ 
                    width: `${lang.percentage}%`, 
                    backgroundColor: lang.color,
                    transition: 'width 1s ease-in-out'
                  }}
                ></div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stats.languages.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: lang.color }}
                  ></div>
                  <div className="text-sm">{lang.name}</div>
                  <div className="text-sm font-mono opacity-70">{lang.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'contributions':
        return (
          <div className="py-6 space-y-4">
            {/* Mock contribution graph */}
            <div className="grid grid-cols-7 gap-1 max-w-md mx-auto">
              {Array.from({ length: 49 }).map((_, idx) => {
                // Generate a random intensity for the demo
                const intensity = Math.floor(Math.random() * 5);
                
                return (
                  <div 
                    key={idx} 
                    className={`w-4 h-4 rounded-sm border border-current ${
                      intensity === 0 ? 'bg-transparent' : 
                      intensity === 1 ? 'bg-current/20' : 
                      intensity === 2 ? 'bg-current/40' : 
                      intensity === 3 ? 'bg-current/60' : 'bg-current/80'
                    }`}
                  ></div>
                );
              })}
            </div>
            
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border border-current"></div>
                <span>Less</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-current/80 border border-current"></div>
                <span>More</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <div className="border border-current rounded-md p-2 text-center">
                <div className="text-lg font-bold">{stats.totalRepositories}</div>
                <div className="text-xs opacity-70">Repositories</div>
              </div>
              
              <div className="border border-current rounded-md p-2 text-center">
                <div className="text-lg font-bold">{stats.starsReceived}</div>
                <div className="text-xs opacity-70">Stars Received</div>
              </div>
              
              <div className="border border-current rounded-md p-2 text-center">
                <div className="text-lg font-bold">{stats.currentStreak}</div>
                <div className="text-xs opacity-70">Day Streak</div>
              </div>
            </div>
          </div>
        );
      
      case 'streak':
        return (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="border-4 border-current rounded-full p-6 relative">
              <div className="text-6xl font-bold">{stats.currentStreak}</div>
              <div className="text-sm absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-terminal-dark dark:bg-terminal-bg px-2">
                {t('github-stats.sections.streak')}
              </div>
            </div>
            
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col items-center">
                <GitCommit className="h-5 w-5 mb-1" />
                <div className="text-lg font-bold">{stats.totalCommits}</div>
                <div className="text-xs opacity-70">Commits</div>
              </div>
              
              <div className="flex flex-col items-center">
                <GitBranch className="h-5 w-5 mb-1" />
                <div className="text-lg font-bold">{stats.pullRequests}</div>
                <div className="text-xs opacity-70">PRs</div>
              </div>
              
              <div className="flex flex-col items-center">
                <Star className="h-5 w-5 mb-1" />
                <div className="text-lg font-bold">{stats.starsReceived}</div>
                <div className="text-xs opacity-70">Stars</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-4 w-full">
        <h2 className="text-xl font-bold border-b border-current pb-2">
          {t('github-stats.title')}
        </h2>
        
        <div className="flex flex-col items-center justify-center py-12">
          <Loader className="animate-spin h-8 w-8 mb-4" />
          <p>{t('github-stats.loading')}</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-4 w-full">
        <h2 className="text-xl font-bold border-b border-current pb-2">
          {t('github-stats.title')}
        </h2>
        
        <div className="flex flex-col items-center justify-center py-12 text-red-500">
          <div className="text-2xl mb-2">⚠️</div>
          <p>{t('github-stats.error')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-xl font-bold border-b border-current pb-2">
        {t('github-stats.title')}
      </h2>
      
      <p className="text-sm sm:text-base">
        {t('github-stats.description')}
      </p>
      
      <div className="flex flex-col">
        <div className="flex overflow-x-auto py-2 mb-4 scrollbar-hide">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              className={`flex items-center px-4 py-2 mr-2 rounded-md border transition-all whitespace-nowrap ${
                activeMetric === metric.id 
                  ? 'border-current bg-current/10' 
                  : 'border-current/30 hover:border-current/60'
              }`}
              onClick={() => setActiveMetric(metric.id)}
            >
              <metric.icon size={14} className="mr-2" />
              <span className="text-sm">{metric.label}</span>
            </button>
          ))}
        </div>
        
        <motion.div
          key={activeMetric}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border border-current rounded-md p-4"
        >
          {renderMetricContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default GitHubStatsSection; 