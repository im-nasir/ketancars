'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import ScrollSection from '@/components/ScrollSection';

export default function AboutPage() {
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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none tracking-wide"
          >
            About
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="w-16 h-px bg-white/30 mx-auto mt-8"
          />
        </div>
      </ScrollSection>

      {/* 2 — FOUNDING STORY */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#111111' }}>
        <div className="max-w-3xl mx-auto px-8 text-white">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6"
          >
            01 — Founded
          </motion.p>
          {/* TODO: Replace with client founding story */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] leading-snug mb-8"
          >
            Born from a lifelong passion for the finest motor cars ever built.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 text-stone-400 text-sm leading-relaxed"
          >
            {/* TODO: Replace with client-supplied about text */}
            <p>
              CLASSICA was founded on a singular conviction: that the world&apos;s greatest classic cars deserve more than a transaction. They deserve stewardship, expertise, and an unwavering commitment to authenticity.
            </p>
            <p>
              From our base in [TODO: Location], we curate a tightly edited roster of pre-war thoroughbreds, post-war grand tourers, and defining icons of the golden era of motoring. Every car we handle carries a story — and we tell it truthfully.
            </p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* 3 — VALUES / PHILOSOPHY */}
      <ScrollSection theme="light" className="items-center justify-center" style={{ background: '#faf9f7' }}>
        <div className="max-w-6xl mx-auto px-8 w-full">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-[clamp(2rem,4vw,3rem)] text-stone-900 mb-16 text-center"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { num: '01', title: 'Authenticity', body: 'Every car is documented, provenance-verified, and honestly represented. We deal only in cars we would proudly own ourselves.' },
              { num: '02', title: 'Discretion', body: 'Our clients trust us with significant decisions. We operate with absolute confidentiality, at all times.' },
              { num: '03', title: 'Connoisseurship', body: 'Decades of combined experience inform every acquisition and every conversation. We know these cars deeply.' },
              { num: '04', title: 'Relationships', body: 'Long after a sale is complete, we remain your trusted partner in the pursuit of motoring excellence.' },
            ].map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-6"
              >
                <span className="text-xs tracking-widest text-stone-300 mt-1 shrink-0">{v.num}</span>
                <div>
                  <h3 className="font-serif text-xl text-stone-900 mb-2">{v.title}</h3>
                  {/* TODO: Replace body text with client copy */}
                  <p className="text-sm text-stone-500 leading-relaxed">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* 4 — CTA */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center text-white px-8">
          {/* TODO: Replace with client team photo or showroom image */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase text-white/40 mb-6"
          >
            Meet the Team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,5vw,4rem)] mb-10"
          >
            {/* TODO: Add team bios / headshots section */}
            We&apos;d love to hear from you.
          </motion.h2>
          <Link
            href="/enquiries"
            className="text-xs tracking-[0.3em] uppercase border border-white px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </ScrollSection>
    </main>
  );
}
