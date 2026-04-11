'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import ScrollSection from '@/components/ScrollSection';
import InstagramFeed from '@/components/InstagramFeed';

export default function InstagramPage() {
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
            Follow Our World
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.5rem,6vw,6rem)] leading-none"
          >
            @classica
          </motion.h1>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 inline-block text-xs tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors border-b border-white/20 pb-0.5"
          >
            {/* TODO: Replace with client Instagram URL */}
            Follow on Instagram
          </motion.a>
        </div>
      </ScrollSection>

      {/* 2 — FEED */}
      <ScrollSection theme="light" className="justify-center" style={{ background: '#ffffff' }}>
        <div className="w-full h-full flex flex-col">
          <div className="px-8 pt-16 pb-8">
            <p className="text-xs tracking-[0.35em] uppercase text-stone-400">
              {/* TODO: Connect Behold.so account ID via env var NEXT_PUBLIC_BEHOLD_ACCOUNT_ID */}
              Recent Posts
            </p>
          </div>
          <div className="flex-1 overflow-hidden px-4">
            <InstagramFeed />
          </div>
        </div>
      </ScrollSection>

      {/* 3 — CTA */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center text-white px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,4vw,3.5rem)] mb-6"
          >
            More awaits.
          </motion.h2>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xs tracking-[0.3em] uppercase border border-white px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            Follow @classica
          </motion.a>
        </div>
      </ScrollSection>
    </main>
  );
}
