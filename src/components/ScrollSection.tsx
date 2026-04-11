'use client';

import { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface ScrollSectionProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export default function ScrollSection({
  children,
  theme = 'dark',
  className = '',
  id,
  style,
}: ScrollSectionProps) {
  return (
    <motion.section
      id={id}
      data-theme={theme}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`snap-section relative flex flex-col ${className}`}
      style={{ scrollSnapAlign: 'start', height: '100vh', width: '100%', ...style }}
    >
      {children}
    </motion.section>
  );
}
