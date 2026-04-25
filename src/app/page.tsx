'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import HeroSection from '@/components/HeroSection';
import ScrollSection from '@/components/ScrollSection';
import InstagramFeed from '@/components/InstagramFeed';

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop', alt: 'Ferrari 250 GTE', tall: true },
  { src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&auto=format&fit=crop', alt: 'Classic Muscle Car', tall: false },
  { src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80&auto=format&fit=crop', alt: 'Vintage Porsche', tall: false },
  { src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&auto=format&fit=crop', alt: 'Red Sports Car', tall: true },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop', alt: 'Vintage Headlamps', tall: false },
  { src: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=600&q=80&auto=format&fit=crop', alt: 'Classic Black Car', tall: false },
  { src: 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=600&q=80&auto=format&fit=crop', alt: 'Vintage Car Detail', tall: true },
  { src: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=600&q=80&auto=format&fit=crop', alt: 'Classic Coupe', tall: false },
];

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

const PRESS = [
  { pub: 'Octane Magazine', quote: 'A curatorial eye second to none in the vintage car world.' },
  { pub: 'Classic & Sports Car', quote: 'The benchmark for discretion, provenance, and connoisseurship.' },
  { pub: 'Motor Sport Magazine', quote: 'Where heritage meets the highest standards of the trade.' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLElement>(null);
  useScrollTheme(containerRef);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let wheelAccum = 0;
    let lastWheelTime = 0;

    const scrollToSection = (direction: 1 | -1) => {
      if (isScrolling) return;
      const sections = container.querySelectorAll<HTMLElement>('[data-theme]');
      const containerHeight = container.clientHeight;
      const currentIndex = Math.round(container.scrollTop / containerHeight);
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
      if (nextIndex === currentIndex) return;
      isScrolling = true;
      wheelAccum = 0;
      container.style.scrollSnapType = 'none';
      container.scrollTo({ top: nextIndex * containerHeight, behavior: 'smooth' });
      setTimeout(() => {
        container.style.scrollSnapType = 'y mandatory';
        isScrolling = false;
      }, 1100);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      const now = Date.now();
      if (now - lastWheelTime > 150) wheelAccum = 0;
      lastWheelTime = now;
      wheelAccum += e.deltaY;
      if (Math.abs(wheelAccum) < 40) return;
      const direction = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;
      scrollToSection(direction);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) scrollToSection(diff > 0 ? 1 : -1);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <main id="scroll-container" ref={containerRef} className="scroll-container">
      <div id="scroll-content">

        {/* 1 — HERO */}
        <HeroSection
          headline="CLASSICA"
          subline="Rare & Vintage Motor Cars"
          videoSrc="/placeholder-video.mp4"
        />

        {/* 2 — PHILOSOPHY */}
        <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
          <div className="relative max-w-2xl mx-auto px-8 text-center overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
              <span className="font-serif text-[18vw] text-white/[0.025] tracking-[0.3em] uppercase leading-none">
                CLASSICA
              </span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-12 h-px bg-white/30 mx-auto mb-10 origin-left"
            />
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif text-[clamp(1.5rem,3.5vw,3rem)] italic text-white/90 leading-relaxed tracking-wide relative z-10"
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
              — The Founders, CLASSICA
            </motion.p>
          </div>
        </ScrollSection>

        {/* 3 — ABOUT */}
        <ScrollSection id="about" theme="dark" className="items-center justify-center" style={{ background: '#111111' }}>
          <div className="max-w-3xl mx-auto px-8 text-white">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6"
            >
              Our Story
            </motion.p>
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
              <p>
                CLASSICA was founded on a singular conviction: that the world&apos;s greatest classic cars deserve more than a transaction. They deserve stewardship, expertise, and an unwavering commitment to authenticity.
              </p>
              <p>
                From our base in the heart of England, we curate a tightly edited roster of pre-war thoroughbreds, post-war grand tourers, and defining icons of the golden era of motoring.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <Link href="/about" className="text-xs tracking-[0.3em] uppercase border-b border-white/30 pb-0.5 hover:border-white transition-colors nav-link-hover">
                Full Story
              </Link>
            </motion.div>
          </div>
        </ScrollSection>

        {/* 4 — COLLECTION / FEATURED CAR */}
        <ScrollSection id="collection" theme="light" className="flex-row" style={{ background: '#faf9f7' }}>
          <div className="flex flex-col md:flex-row h-full w-full">
            <div className="flex-1 relative bg-stone-200 overflow-hidden group">
              {/* Available badge */}
              <div className="absolute top-6 left-6 z-10 bg-white text-black text-[9px] tracking-[0.3em] uppercase px-3 py-1.5">
                Available
              </div>
              {/* Year watermark */}
              <div className="absolute bottom-4 right-4 z-10 font-serif text-[8rem] text-white/10 leading-none select-none pointer-events-none" aria-hidden="true">
                1963
              </div>
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85&auto=format&fit=crop"
                alt="1963 Ferrari 250 GTE — Featured Car"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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
                Featured
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight text-stone-900"
              >
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
                <Link href="/collection" className="group inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase border-b border-stone-400 pb-0.5 hover:border-stone-900 transition-colors">
                  View Collection
                  <span className="service-card-arrow transition-all duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollSection>

        {/* 5 — SERVICES */}
        <ScrollSection id="services" theme="light" className="items-center justify-center" style={{ background: '#f5f0e8' }}>
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

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="service-card group bg-[#f5f0e8] px-10 py-12 cursor-pointer"
                >
                  <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-2xl text-stone-900 mb-4 flex items-center gap-3">
                    {service.title}
                    <span className="service-card-arrow text-stone-400">→</span>
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services" className="text-xs tracking-[0.3em] uppercase border-b border-stone-400 pb-0.5 hover:border-stone-900 transition-colors">
                All Services
              </Link>
            </div>
          </div>
        </ScrollSection>

        {/* 6 — GALLERY */}
        <ScrollSection id="gallery" theme="light" className="items-center justify-center" style={{ background: '#faf9f7' }}>
          <div className="w-full max-w-6xl mx-auto px-8 py-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.35em] uppercase text-stone-400 text-center mb-4"
            >
              The Collection in Focus
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-[clamp(2rem,4vw,3rem)] text-center text-stone-900 mb-16"
            >
              Gallery
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200">
              {GALLERY_IMAGES.map((img, i) => (
                <motion.div
                  key={img.alt}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`relative overflow-hidden bg-stone-100 group ${img.tall ? 'row-span-2' : ''}`}
                  style={{ aspectRatio: img.tall ? undefined : '1/1', minHeight: img.tall ? '300px' : undefined }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <span className="text-white text-[9px] tracking-[0.3em] uppercase">{img.alt}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/gallery" className="text-xs tracking-[0.3em] uppercase border-b border-stone-400 pb-0.5 hover:border-stone-900 transition-colors">
                View Gallery
              </Link>
            </div>
          </div>
        </ScrollSection>

        {/* 7 — INSTAGRAM */}
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
            <div className="flex-1 overflow-hidden">
              <InstagramFeed />
            </div>
          </div>
        </ScrollSection>

        {/* 8 — PRESS */}
        <ScrollSection id="press" theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
          <div className="w-full max-w-5xl mx-auto px-8 py-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.35em] uppercase text-white/40 text-center mb-4"
            >
              As Seen In
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-[clamp(2rem,4vw,3rem)] text-center text-white mb-16"
            >
              Press
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {PRESS.map((item, i) => (
                <motion.div
                  key={item.pub}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative bg-[#0a0a0a] px-10 py-12 overflow-hidden"
                >
                  {/* Decorative large quote mark */}
                  <div className="absolute -top-4 left-4 font-serif text-[9rem] text-white/[0.04] leading-none select-none pointer-events-none" aria-hidden="true">
                    &ldquo;
                  </div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-6 font-medium">{item.pub}</p>
                  <blockquote className="font-serif text-lg italic text-white/70 leading-relaxed relative z-10">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/press" className="text-xs tracking-[0.3em] uppercase border-b border-white/30 pb-0.5 hover:border-white transition-colors">
                All Press
              </Link>
            </div>
          </div>
        </ScrollSection>

        {/* 9 — ENQUIRIES */}
        <ScrollSection id="enquiries" theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
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
                className="group relative overflow-hidden text-xs tracking-[0.3em] uppercase border border-white px-10 py-4 transition-colors duration-300 hover:text-black"
              >
                <span className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10">Make an Enquiry</span>
              </Link>
              <Link href="/collection" className="text-xs tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors">
                Browse Collection
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 text-[9px] tracking-[0.45em] uppercase text-white/15"
            >
              51.5074° N, 0.1278° W — London, England
            </motion.p>
          </div>
        </ScrollSection>

      </div>
    </main>
  );
}
