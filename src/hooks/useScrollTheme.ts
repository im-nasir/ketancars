'use client';

import { useEffect } from 'react';
import { useNavTheme, NavTheme } from '@/context/NavThemeContext';

export function useScrollTheme(containerRef: React.RefObject<HTMLElement | null>) {
  const { setNavTheme } = useNavTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>('[data-theme]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = (entry.target as HTMLElement).dataset.theme as NavTheme;
            if (theme === 'light' || theme === 'dark') {
              setNavTheme(theme);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [containerRef, setNavTheme]);
}
