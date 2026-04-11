'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollTheme } from '@/hooks/useScrollTheme';
import ScrollSection from '@/components/ScrollSection';
// import CarCard, { CarCardProps } from '@/components/CarCard';

/*
 * PHASE II — Uncomment and connect to Sanity CMS when collection goes live.
 *
 * import { sanityClient } from '@/lib/sanity';
 *
 * Example query:
 * const cars: CarCardProps[] = await sanityClient.fetch(`
 *   *[_type == "car" && status != "archived"] | order(year desc) {
 *     "slug": slug.current,
 *     make, model, year, price, status, shortDescription, mileage, colour,
 *     "mainImage": mainImage.asset->{ "url": url, "alt": alt }
 *   }
 * `);
 *
 * Example grid:
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200">
 *   {cars.map((car) => (
 *     <CarCard key={car.slug} {...car} />
 *   ))}
 * </div>
 */

export default function CollectionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollTheme(containerRef);

  return (
    <main
      ref={containerRef}
      style={{ scrollSnapType: 'y mandatory', overflowY: 'scroll', height: '100vh' }}
    >
      {/* PHASE II PLACEHOLDER — Replace with live collection */}
      <ScrollSection theme="dark" className="items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center text-white px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.4em] uppercase text-white/40 mb-6"
          >
            Coming Soon
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-none"
          >
            Collection
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="w-16 h-px bg-white/30 mx-auto mt-8 mb-10"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-sm text-white/50 tracking-wider max-w-md mx-auto leading-relaxed"
          >
            Our curated collection is being prepared. Register your interest and we will notify you when it launches.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-10"
          >
            <a
              href="/enquiries"
              className="text-xs tracking-[0.3em] uppercase border border-white/40 px-8 py-3.5 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Register Interest
            </a>
          </motion.div>
        </div>
      </ScrollSection>
    </main>
  );
}
