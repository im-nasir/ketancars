'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import ScrollSection from '@/components/ScrollSection';
import EnquiryForm from '@/components/EnquiryForm';

export default function EnquiriesPage() {
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
            Begin Here
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none"
          >
            Enquiries
          </motion.h1>
        </div>
      </ScrollSection>

      {/* 2 — FORM */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#111111' }}>
        <div className="max-w-5xl mx-auto px-8 w-full flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-64 shrink-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4"
            >
              Contact Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl text-white mb-6"
            >
              Tell us what you&apos;re looking for.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-4 text-xs text-white/40"
            >
              {/* TODO: Replace with client contact details */}
              <div>
                <p className="tracking-[0.2em] uppercase mb-1">Phone</p>
                <p className="text-white/70">+44 (0) 000 000 0000</p>
              </div>
              <div>
                <p className="tracking-[0.2em] uppercase mb-1">Email</p>
                <p className="text-white/70">enquiries@classica.co.uk</p>
              </div>
              <div>
                <p className="tracking-[0.2em] uppercase mb-1">Address</p>
                {/* TODO: Replace with client address */}
                <p className="text-white/70 leading-relaxed">
                  TODO: Address Line 1<br />
                  TODO: City, Postcode
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <EnquiryForm dark />
          </motion.div>
        </div>
      </ScrollSection>

      {/* 3 — VISITING */}
      <ScrollSection theme="light" className="items-center justify-center" style={{ background: '#faf9f7' }}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-6"
          >
            Visiting Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[clamp(2rem,4vw,3rem)] text-stone-900 mb-8"
          >
            Viewings by Appointment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-stone-500 text-sm leading-relaxed max-w-lg mx-auto"
          >
            {/* TODO: Add map embed and update visiting hours with client details */}
            We welcome all serious enquirers by appointment. Our showroom is available for private viewings seven days a week. Please contact us to arrange a time at your convenience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 p-8 bg-stone-100 text-left inline-block min-w-64"
          >
            {/* TODO: Replace with actual opening times */}
            <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-4">Opening Hours</p>
            {[
              ['Monday – Friday', '9:00 – 18:00'],
              ['Saturday', 'By appointment'],
              ['Sunday', 'By appointment'],
            ].map(([day, hours]) => (
              <div key={day} className="flex justify-between gap-12 py-2 border-b border-stone-200 text-sm last:border-0">
                <span className="text-stone-500">{day}</span>
                <span className="text-stone-800">{hours}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>
    </main>
  );
}
