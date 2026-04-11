'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type NavTheme = 'light' | 'dark';

interface NavThemeContextType {
  navTheme: NavTheme;
  setNavTheme: (theme: NavTheme) => void;
}

const NavThemeContext = createContext<NavThemeContextType>({
  navTheme: 'dark',
  setNavTheme: () => {},
});

export function NavThemeProvider({ children }: { children: ReactNode }) {
  const [navTheme, setNavTheme] = useState<NavTheme>('dark');

  return (
    <NavThemeContext.Provider value={{ navTheme, setNavTheme }}>
      {children}
    </NavThemeContext.Provider>
  );
}

export function useNavTheme() {
  return useContext(NavThemeContext);
}
