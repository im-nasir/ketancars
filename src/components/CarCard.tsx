'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export interface CarCardProps {
  slug: string;
  make: string;
  model: string;
  year: number;
  price?: string;
  status: 'available' | 'sold' | 'enquire';
  mainImage: {
    url: string;
    alt: string;
  };
  shortDescription?: string;
  mileage?: string;
  colour?: string;
}

export default function CarCard({
  slug,
  make,
  model,
  year,
  price,
  status,
  mainImage,
  shortDescription,
  mileage,
  colour,
}: CarCardProps) {
  const statusLabel = {
    available: 'Available',
    sold: 'Sold',
    enquire: 'Enquire',
  }[status];

  const statusColor = {
    available: 'text-emerald-700',
    sold: 'text-stone-400',
    enquire: 'text-amber-700',
  }[status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-white overflow-hidden"
    >
      <Link href={`/collection/${slug}`} className="block overflow-hidden aspect-[4/3] bg-stone-100">
        <Image
          src={mainImage.url}
          alt={mainImage.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400">{year}</p>
            <h3 className="font-serif text-xl mt-1">
              {make} {model}
            </h3>
          </div>
          <span className={`text-xs tracking-[0.15em] uppercase mt-1 ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {shortDescription && (
          <p className="text-sm text-stone-500 leading-relaxed mt-2 flex-1">{shortDescription}</p>
        )}

        <dl className="mt-4 flex gap-6 text-xs text-stone-400">
          {colour && (
            <div>
              <dt className="tracking-widest uppercase">Colour</dt>
              <dd className="text-stone-700 mt-0.5">{colour}</dd>
            </div>
          )}
          {mileage && (
            <div>
              <dt className="tracking-widest uppercase">Mileage</dt>
              <dd className="text-stone-700 mt-0.5">{mileage}</dd>
            </div>
          )}
          {price && (
            <div className="ml-auto text-right">
              <dt className="tracking-widest uppercase">Price</dt>
              <dd className="text-stone-900 font-medium mt-0.5">{price}</dd>
            </div>
          )}
        </dl>

        <Link
          href={`/collection/${slug}`}
          className="mt-5 text-xs tracking-[0.25em] uppercase border-b border-stone-300 pb-0.5 self-start hover:border-stone-900 transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}
