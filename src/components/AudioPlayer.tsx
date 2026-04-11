'use client';

import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* TODO: Replace /audio/background.mp3 with client-supplied audio file */}
      <audio ref={audioRef} src="/audio/background.mp3" loop preload="none" />

      <button
        onClick={toggle}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
          </svg>
        )}
      </button>

      <span className="absolute -top-7 right-0 text-[10px] tracking-widest uppercase text-white/60 whitespace-nowrap">
        {isPlaying ? 'Music on' : 'Music off'}
      </span>
    </div>
  );
}
