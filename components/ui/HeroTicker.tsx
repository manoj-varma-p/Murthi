'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';

const keywords = [
  'Video Editing',
  'Motion Graphics',
  'Color Grading',
  'Visual Effects (VFX)',
  'High-Retention Reels',
  'Commercial Promos',
  'Sound Design',
  'DaVinci Resolve',
  'After Effects',
  'Brand Storytelling',
  'AI-Powered Creatives',
  'Thumbnail Design',
  'Creative Direction',
  '3D & 2D Animation',
];

export function HeroTicker() {
  const prefersReduced = useReducedMotion();
  // Duplicate for seamless infinite loop
  const repeated = [...keywords, ...keywords, ...keywords];

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0E0E0E] text-white py-5 sm:py-6 border-y border-white/15 select-none z-20"
      aria-label="Creative skills ticker"
    >
      {/* Subtle edge fades for smooth blending */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={
          prefersReduced
            ? {}
            : {
                x: ['0%', '-50%'],
              }
        }
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 20,
        }}
        className="flex shrink-0 items-center gap-6 sm:gap-10 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]"
      >
        {repeated.map((word, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10">
            <span className="font-display font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-wider text-white hover:text-[#EEFF04] transition-colors duration-200">
              {word}
            </span>
            {/* Electric yellow starburst / diamond icon separator */}
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#EEFF04] shrink-0 fill-current animate-pulse"
              viewBox="0 0 24 24"
            >
              <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
            </svg>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
