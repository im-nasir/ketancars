'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  headline?: string;
  subline?: string;
  videoSrc?: string;
}

const TICKER_TEXT = '· EST. 1963 · RARE MOTOR CARS · BY APPOINTMENT · ENGLAND · CLASSICA · CONNOISSEURS OF THE FINEST MOTOR CARS · ';

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
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-serif text-[22vw] text-white/[0.03] tracking-[0.3em] uppercase leading-none">
          CLASSICA
        </span>
      </div>

      <div className="relative z-10 text-center text-white px-8">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8"
        >
          Est. 1963
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3rem,10vw,9rem)] tracking-[0.25em] uppercase leading-none"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.4)' }}
        >
          {headline}
        </motion.h1>

        {subline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-xs tracking-[0.4em] uppercase text-white/60"
          >
            {subline}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 mx-auto w-16 h-px bg-white/40 origin-left"
        />
      </div>

      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-20 left-0 right-0 overflow-hidden border-y border-white/10 py-2"
      >
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-[9px] tracking-[0.4em] uppercase text-white/25 pr-0">
              {TICKER_TEXT}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator — refined circle with dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="relative w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-0.5 h-1.5 rounded-full bg-white/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
