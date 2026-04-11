'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  headline?: string;
  subline?: string;
  videoSrc?: string;
}

export default function HeroSection({
  headline = 'CLASSICA',
  subline,
  videoSrc = '/placeholder-video.mp4',
}: HeroSectionProps) {
  return (
    <section
      data-theme="dark"
      className="relative flex items-center justify-center overflow-hidden bg-black"
      style={{ scrollSnapAlign: 'start', height: '100vh', width: '100%' }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        aria-hidden="true"
      >
        {/* TODO: Replace with client-supplied video file via Cloudinary */}
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center text-white px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3rem,10vw,9rem)] tracking-[0.25em] uppercase leading-none"
        >
          {headline}
        </motion.h1>

        {subline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-xs tracking-[0.4em] uppercase text-white/70"
          >
            {subline}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 mx-auto w-16 h-px bg-white/50 origin-left"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-white/30"
        />
      </motion.div>
    </section>
  );
}
