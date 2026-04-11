'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import HeroSection from '@/components/HeroSection';
import ScrollSection from '@/components/ScrollSection';
import InstagramFeed from '@/components/InstagramFeed';

const SERVICES = [
  {
    title: 'Acquisition',
    description: 'Expert sourcing of the world\'s most desirable classic and vintage motor cars, tailored to your precise specification.',
  },
  {
    title: 'Consignment',
    description: 'Discreet, full-service sale management for distinguished private sellers. Your car, elevated.',
  },
  {
    title: 'Restoration',
    description: 'Meticulous, concours-grade restoration by master craftsmen. Period-correct. Uncompromising.',
  },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollTheme(containerRef);

  return (
    <main
      ref={containerRef}
      style={{ scrollSnapType: 'y mandatory', overflowY: 'scroll', height: '100vh' }}
      className="scroll-container"
    >
      {/* 1 — HERO */}
      <HeroSection
        headline="CLASSICA"
        subline="Rare &amp; Vintage Motor Cars"
        videoSrc="/placeholder-video.mp4"
      />

      {/* 2 — PHILOSOPHY */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="max-w-2xl mx-auto px-8 text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px bg-white/30 mx-auto mb-10 origin-left"
          />
          {/* TODO: Replace with client-supplied philosophy quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-[clamp(1.5rem,3.5vw,3rem)] italic text-white/90 leading-relaxed tracking-wide"
          >
            &ldquo;Motoring history is not merely preserved here — it is cherished, understood, and passed forward.&rdquo;
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-xs tracking-[0.35em] uppercase text-white/30"
          >
            {/* TODO: Replace with founder name */}
            — The Founders, CLASSICA
          </motion.p>
        </div>
      </ScrollSection>

      {/* 3 — FEATURED CAR */}
      <ScrollSection theme="light" className="flex-row" style={{ background: '#faf9f7' }}>
        <div className="flex flex-col md:flex-row h-full w-full">
          <div className="flex-1 relative bg-stone-200 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85&auto=format&fit=crop"
              alt="1963 Ferrari 250 GTE — Featured Car"
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>

          <div className="flex-1 flex flex-col justify-center px-12 py-16 lg:px-20">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
            >
              {/* TODO: Pull from Sanity CMS */}
              Featured
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight text-stone-900"
            >
              {/* TODO: Pull from Sanity featured car */}
              1963 Ferrari<br />250 GTE
            </motion.h2>

            <motion.dl
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 space-y-3 text-sm text-stone-600"
            >
              {[
                ['Year', '1963'],
                ['Colour', 'Rosso Corsa'],
                ['Engine', '3.0L V12'],
                ['Status', 'Available'],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-8 items-baseline border-b border-stone-100 pb-3">
                  <dt className="w-20 text-xs tracking-[0.2em] uppercase text-stone-400 shrink-0">{label}</dt>
                  <dd className="text-stone-800">{value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/collection"
                className="text-xs tracking-[0.3em] uppercase border-b border-stone-400 pb-0.5 hover:border-stone-900 transition-colors"
              >
                View Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* 4 — SERVICES TEASER */}
      <ScrollSection theme="light" className="items-center justify-center" style={{ background: '#f5f0e8' }}>
        <div className="w-full max-w-6xl mx-auto px-8 py-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase text-stone-400 text-center mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-[clamp(2rem,4vw,3rem)] text-center text-stone-900 mb-16"
          >
            Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-[#f5f0e8] px-10 py-12"
              >
                <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-4">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-2xl text-stone-900 mb-4">{service.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="text-xs tracking-[0.3em] uppercase border-b border-stone-400 pb-0.5 hover:border-stone-900 transition-colors"
            >
              All Services
            </Link>
          </div>
        </div>
      </ScrollSection>

      {/* 5 — INSTAGRAM PREVIEW */}
      <ScrollSection theme="light" className="items-center justify-center" style={{ background: '#ffffff' }}>
        <div className="w-full max-w-5xl mx-auto px-8 py-16 flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-2">Follow Along</p>
            <h2 className="font-serif text-3xl text-stone-900">@classica</h2>
          </motion.div>
          {/* TODO: Pass beholdAccountId once Behold.so account is set up */}
          <div className="flex-1 overflow-hidden">
            <InstagramFeed />
          </div>
        </div>
      </ScrollSection>

      {/* 6 — CONTACT CTA */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center text-white px-8 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase text-white/40 mb-6"
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-tight"
          >
            Let&apos;s Find Your<br />
            <em>Perfect Car.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-sm text-white/50 tracking-wider leading-relaxed max-w-md mx-auto"
          >
            {/* TODO: Replace with client contact details */}
            Whether you are seeking a specific car or wish to entrust us with yours, we welcome your enquiry.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/enquiries"
              className="text-xs tracking-[0.3em] uppercase border border-white px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
            >
              Make an Enquiry
            </Link>
            <Link
              href="/collection"
              className="text-xs tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors"
            >
              Browse Collection
            </Link>
          </motion.div>
        </div>
      </ScrollSection>
    </main>
  );
}
