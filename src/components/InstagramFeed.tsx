'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const PLACEHOLDER_POSTS = [
  { id: '1', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop', alt: 'Classic Ferrari' },
  { id: '2', src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80&auto=format&fit=crop', alt: 'Porsche 911' },
  { id: '3', src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&auto=format&fit=crop', alt: 'Classic coupe' },
  { id: '4', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&auto=format&fit=crop', alt: 'Vintage sports car' },
  { id: '5', src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&auto=format&fit=crop', alt: 'Classic in garage' },
  { id: '6', src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&auto=format&fit=crop', alt: 'Vintage detail' },
];

interface InstagramFeedProps {
  beholdAccountId?: string;
}

export default function InstagramFeed({ beholdAccountId }: InstagramFeedProps) {
  if (beholdAccountId) {
    return (
      <div className="w-full h-full">
        {/* TODO: Replace with Behold.so embed widget once account ID is supplied */}
        <div
          id={`behold-widget-${beholdAccountId}`}
          data-behold-id={beholdAccountId}
          className="w-full h-full"
        />
        <script async src="https://w.behold.so/widget.js" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-3 gap-0.5 flex-1">
        {PLACEHOLDER_POSTS.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative bg-stone-100 overflow-hidden group cursor-pointer aspect-square"
          >
            <Image
              src={post.src}
              alt={post.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 33vw, 20vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="py-6 text-center">
        {/* TODO: Replace href with client Instagram profile URL */}
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-[0.3em] uppercase text-stone-600 hover:text-stone-900 transition-colors border-b border-stone-300 pb-0.5"
        >
          Follow @classica
        </Link>
      </div>
    </div>
  );
}
