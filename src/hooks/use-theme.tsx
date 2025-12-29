import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ColorTheme = 'cyber' | 'malware' | 'network' | 'stealth';
export type Mode = 'dark' | 'light';

interface ThemeContextType {
  mode: Mode;
  colorTheme: ColorTheme;
  setMode: (mode: Mode) => void;
  setColorTheme: (theme: ColorTheme) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themeConfigs: Record<ColorTheme, { name: string; description: string; icon: string }> = {
  cyber: { name: 'Cyber Green', description: 'Default SOC theme', icon: '🟢' },
  malware: { name: 'Malware Red', description: 'For malware analysis', icon: '🔴' },
  network: { name: 'Network Blue', description: 'For network analysis', icon: '🔵' },
  stealth: { name: 'Stealth Purple', description: 'For threat hunting', icon: '🟣' },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const stored = localStorage.getItem('soc-mode');
    return (stored as Mode) || 'dark';
  });
  
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem('soc-color-theme');
    return (stored as ColorTheme) || 'cyber';
  });

  useEffect(() => {
    localStorage.setItem('soc-mode', mode);
    document.documentElement.classList.toggle('light', mode === 'light');
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('soc-color-theme', colorTheme);
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  const toggleMode = () => setMode(m => m === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ mode, colorTheme, setMode, setColorTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
