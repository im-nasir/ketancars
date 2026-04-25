'use client';

import { useState } from 'react';
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
  const lenis = useLenis();
  const router = useRouter();

  const isDark = navTheme === 'dark';
  const colorClass = isDark ? 'text-white' : 'text-black';
  const borderClass = isDark ? 'border-white/20' : 'border-black/10';
  const barColor = isDark ? 'bg-white' : 'bg-black';

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
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-colors duration-300 ${colorClass}`}
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
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60 ${colorClass}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`md:hidden flex flex-col gap-1.5 transition-colors duration-300 ${colorClass}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px transition-all duration-300 ${barColor} ${menuOpen ? 'w-6 translate-y-[7px] rotate-45' : 'w-6'}`}
            style={{ transformOrigin: 'center' }}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${barColor} ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px transition-all duration-300 ${barColor} ${menuOpen ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-4'}`}
            style={{ transformOrigin: 'center' }}
          />
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
