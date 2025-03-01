import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ThemeName } from '../types';

interface ThemeContextType {
  currentTheme: ThemeName;
  switchTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('default');

  // Effect to update body class when theme changes
  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove('theme-vaporwave', 'theme-matrix', 'theme-light', 'theme-midnight');
    
    // Add current theme class if it's not the default
    if (currentTheme !== 'default') {
      document.body.classList.add(`theme-${currentTheme}`);
    }
  }, [currentTheme]);

  const switchTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};