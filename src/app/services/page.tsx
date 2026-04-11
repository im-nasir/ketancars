'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import ScrollSection from '@/components/ScrollSection';

const SERVICES = [
  {
    num: '01',
    title: 'Acquisition',
    tagline: 'The pursuit of the exceptional.',
    body: 'We maintain an unparalleled global network of private sellers, dealers, and estates. Whether your search is for a specific chassis number or a category of car, our acquisition service is discreet, methodical, and effective.',
    detail: ['Worldwide sourcing', 'Pre-purchase inspection', 'Provenance verification', 'Negotiation & logistics'],
  },
  {
    num: '02',
    title: 'Consignment',
    tagline: 'Your car, presented at its finest.',
    body: 'Entrusting us with the sale of your car means entrusting it to specialists who understand its true worth. We present every car to a carefully qualified audience, managing every detail from documentation to delivery.',
    detail: ['Professional photography', 'Targeted private marketing', 'Global buyer network', 'Full sale management'],
  },
  {
    num: '03',
    title: 'Restoration',
    tagline: 'Meticulous. Period-correct. Lasting.',
    body: 'Our restoration partners are among the finest craftsmen in the world. We oversee every project from initial assessment to final delivery, ensuring provenance is maintained and quality is uncompromising.',
    detail: ['Concours-grade restoration', 'Period-correct components', 'Full photographic record', 'Post-restoration support'],
  },
  {
    num: '04',
    title: 'Appraisal',
    tagline: 'Independent expertise you can trust.',
    body: 'For insurance, estate, or private purposes, our written appraisals are thorough, impartial, and defensible. Conducted by marque specialists with decades of experience.',
    detail: ['Written report', 'Market valuation', 'Condition assessment', 'Historical research'],
  },
];

export default function ServicesPage() {
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
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none"
          >
            Services
          </motion.h1>
        </div>
      </ScrollSection>

      {/* 2 — SERVICE LIST */}
      {SERVICES.map((service, i) => (
        <ScrollSection
          key={service.num}
          theme={i % 2 === 0 ? 'light' : 'light'}
          className="items-center justify-center"
          style={{ background: i % 2 === 0 ? '#faf9f7' : '#f5f0e8' }}
        >
          <div className="max-w-5xl mx-auto px-8 w-full flex flex-col md:flex-row gap-16 items-start md:items-center">
            <div className="shrink-0">
              <span className="font-serif text-[6rem] leading-none text-stone-200 select-none">
                {service.num}
              </span>
            </div>
            <div className="flex-1">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3"
              >
                {service.tagline}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-[clamp(2rem,4vw,3rem)] text-stone-900 mb-6"
              >
                {service.title}
              </motion.h2>
              {/* TODO: Replace with client-supplied service descriptions */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-stone-500 text-sm leading-relaxed mb-8 max-w-lg"
              >
                {service.body}
              </motion.p>
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="grid grid-cols-2 gap-x-8 gap-y-2"
              >
                {service.detail.map((d) => (
                  <li key={d} className="text-xs tracking-wider text-stone-500 flex items-center gap-2">
                    <span className="w-3 h-px bg-stone-300 shrink-0" />
                    {d}
                  </li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/enquiries"
                  className="text-xs tracking-[0.3em] uppercase border-b border-stone-400 pb-0.5 hover:border-stone-900 transition-colors"
                >
                  Enquire About This Service
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ))}
    </main>
  );
}
