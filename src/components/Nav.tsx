'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavTheme } from '@/context/NavThemeContext';
import { useLenis } from '@/components/LenisProvider';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#collection', label: 'Collection' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#press', label: 'Press' },
  { href: '#enquiries', label: 'Enquiries' },
];

export default function Nav() {
  const { navTheme } = useNavTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const router = useRouter();

  const isDark = navTheme === 'dark';
  const colorClass = isDark ? 'text-white' : 'text-black';
  const borderClass = isDark ? 'border-white/20' : 'border-black/10';
  const barColor = isDark ? 'bg-white' : 'bg-black';

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Detect scroll past hero
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;
    const handleScroll = () => setScrolled(container.scrollTop > 80);
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    const container = document.getElementById('scroll-container') as HTMLElement | null;

    if (target && lenis) {
      if (container) container.style.scrollSnapType = 'none';
      lenis.scrollTo(target, {
        offset: 0,
        onComplete: () => {
          if (container) container.style.scrollSnapType = 'y mandatory';
        },
      });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/${href}`);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500 ${colorClass} ${scrolled ? 'backdrop-blur-md bg-black/10' : ''}`}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className={`font-serif text-xl tracking-[0.3em] uppercase transition-colors duration-300 ${colorClass}`}
          onClick={() => setMenuOpen(false)}
        >
          CLASSICA
        </Link>

        <ul className={`hidden md:flex items-center gap-8 border-l ${borderClass} pl-8`}>
          {navLinks.map(({ href, label }) => {
            const sectionId = href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  onClick={(e) => handleAnchorClick(e, href)}
                  className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 nav-link-hover ${colorClass} ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                >
                  {label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-px ${isDark ? 'bg-white' : 'bg-black'}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`md:hidden flex flex-col gap-1.5 transition-colors duration-300 ${colorClass}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block h-px transition-all duration-300 ${barColor} ${menuOpen ? 'w-6 translate-y-[7px] rotate-45' : 'w-6'}`} style={{ transformOrigin: 'center' }} />
          <span className={`block w-6 h-px transition-all duration-300 ${barColor} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px transition-all duration-300 ${barColor} ${menuOpen ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-4'}`} style={{ transformOrigin: 'center' }} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center md:hidden"
          >
            <p className="text-[9px] tracking-[0.5em] uppercase text-white/20 mb-12">Navigation</p>
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={href}
                    onClick={(e) => handleAnchorClick(e, href)}
                    className="font-serif text-[clamp(2rem,8vw,3.5rem)] text-white tracking-[0.15em] hover:opacity-60 transition-opacity"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/15 mt-16">51.5074° N, 0.1278° W — London, England</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
