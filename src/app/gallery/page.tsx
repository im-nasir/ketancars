'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import ScrollSection from '@/components/ScrollSection';

const GALLERY_ITEMS = [
  { id: '1', label: 'Showroom',    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop' },
  { id: '2', label: 'Detail',      src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop' },
  { id: '3', label: 'Provenance',  src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&auto=format&fit=crop' },
  { id: '4', label: 'Events',      src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&auto=format&fit=crop' },
  { id: '5', label: 'Restoration', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&auto=format&fit=crop' },
  { id: '6', label: 'Collection',  src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&auto=format&fit=crop' },
  { id: '7', label: 'Archive',     src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80&auto=format&fit=crop' },
  { id: '8', label: 'Racing',      src: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=800&q=80&auto=format&fit=crop' },
];

export default function GalleryPage() {
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
            Visual Archive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none"
          >
            Gallery
          </motion.h1>
        </div>
      </ScrollSection>

      {/* 2 — MAIN GRID */}
      <ScrollSection theme="light" className="justify-center" style={{ background: '#ffffff' }}>
        <div className="w-full h-full overflow-y-auto px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-10"
            >
              {/* TODO: Replace with actual gallery categories from Sanity */}
              All Images
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {GALLERY_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative bg-stone-100 overflow-hidden group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  style={{ aspectRatio: i === 0 ? '1/1' : '4/3' }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <span className="text-[10px] tracking-widest uppercase text-white">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* 3 — EDITORIAL */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#111' }}>
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase text-white/40 mb-6"
          >
            Editorial
          </motion.p>
          {/* TODO: Add editorial photography section with Sanity-sourced content */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,4vw,3.5rem)] italic"
          >
            &ldquo;Every photograph is a love letter to a machine.&rdquo;
          </motion.h2>
        </div>
      </ScrollSection>
    </main>
  );
}
