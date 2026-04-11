'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import ScrollSection from '@/components/ScrollSection';

const PRESS_ITEMS = [
  {
    id: '1',
    publication: 'Octane Magazine',
    date: 'March 2026',
    headline: 'The quiet dealers who find the cars you never knew existed',
    excerpt: 'CLASSICA has quietly built a reputation for sourcing the extraordinary. Their approach is methodical, their knowledge encyclopaedic.',
    url: '#',
  },
  {
    id: '2',
    publication: 'Classic & Sports Car',
    date: 'January 2026',
    headline: 'Private sales in the age of discretion',
    excerpt: 'In a market increasingly defined by auction spectacle, certain firms prefer the private route. CLASSICA is among the finest.',
    url: '#',
  },
  {
    id: '3',
    publication: 'Robb Report UK',
    date: 'November 2025',
    headline: 'Where to buy a classic car in 2026',
    excerpt: 'For serious collectors, the address on the contact page matters as much as the inventory. CLASSICA features prominently.',
    url: '#',
  },
];

export default function PressPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollTheme(containerRef);

  return (
    <main
      ref={containerRef}
      style={{ scrollSnapType: 'y mandatory', overflowY: 'scroll', height: '100vh' }}
    >
      {/* 1 — HERO */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center text-white px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.4em] uppercase text-white/40 mb-6"
          >
            In the Press
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none"
          >
            Press
          </motion.h1>
        </div>
      </ScrollSection>

      {/* 2 — PRESS LIST */}
      <ScrollSection theme="light" className="justify-center" style={{ background: '#ffffff' }}>
        <div className="w-full h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-24">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-12">
              {/* TODO: Replace with actual press coverage from Sanity */}
              Selected Coverage
            </p>
            <div className="space-y-0 divide-y divide-stone-100">
              {PRESS_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex flex-col md:flex-row gap-6 py-10 hover:bg-stone-50 -mx-4 px-4 transition-colors"
                >
                  <div className="shrink-0 md:w-40">
                    <p className="text-xs tracking-widest uppercase text-stone-400">{item.publication}</p>
                    <p className="text-xs text-stone-300 mt-1">{item.date}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                      {item.headline}
                    </h3>
                    {/* TODO: Replace with actual press excerpts */}
                    <p className="text-sm text-stone-500 leading-relaxed">{item.excerpt}</p>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" className="text-stone-300 group-hover:text-stone-700 transition-colors group-hover:translate-x-1 duration-300">
                      <path d="M2 8h12M10 4l4 4-4 4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* 3 — MEDIA CONTACT */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center text-white px-8 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase text-white/40 mb-6"
          >
            Media Enquiries
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(1.8rem,4vw,3rem)] mb-6"
          >
            Press &amp; Media
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm text-white/50 leading-relaxed mb-8"
          >
            {/* TODO: Replace with client press contact details */}
            For press enquiries, interview requests, or image licensing, please contact our press office.
          </motion.p>
          <motion.a
            href="mailto:press@classica.co.uk"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs tracking-[0.3em] uppercase border-b border-white/30 pb-0.5 hover:border-white transition-colors"
          >
            {/* TODO: Replace with client press email */}
            press@classica.co.uk
          </motion.a>
        </div>
      </ScrollSection>
    </main>
  );
}
