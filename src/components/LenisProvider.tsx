'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useRef, MutableRefObject, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const LenisContext = createContext<MutableRefObject<Lenis | null>>({ current: null });

export function useLenis() {
  return useContext(LenisContext).current;
}

export function useLenisRef() {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const wrapper = document.getElementById('scroll-container') as HTMLElement | null;
    const content = document.getElementById('scroll-content') as HTMLElement | null;

    let instance: Lenis;

    if (wrapper && content) {
      instance = new Lenis({
        wrapper,
        content,
        lerp: 0.06,
        duration: 1.6,
        easing: (t: number) => t * t * t,
        smoothWheel: false,
      });
    } else {
      instance = new Lenis({
        lerp: 0.06,
        duration: 1.6,
        easing: (t: number) => t * t * t,
        smoothWheel: true,
      });
    }

    lenisRef.current = instance;

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
