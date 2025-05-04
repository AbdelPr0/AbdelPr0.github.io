import React, { createContext, useState, useContext, useEffect } from 'react';

type ThemeType = 'green' | 'amber' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('terminal-theme');
    return (savedTheme as ThemeType) || 'green';
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('terminal-theme', theme);
    
    // Apply theme to the body
    document.body.classList.remove('amber-theme', 'light-theme');
    if (theme === 'amber') {
      document.body.classList.add('amber-theme');
    } else if (theme === 'light') {
      document.body.classList.add('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      switch (prevTheme) {
        case 'green':
          return 'amber';
        case 'amber':
          return 'light';
        case 'light':
          return 'green';
        default:
          return 'green';
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
