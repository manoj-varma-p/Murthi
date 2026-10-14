'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number; // duration in seconds
  className?: string;
  outlineText?: boolean;
}

export function Marquee({
  items,
  direction = 'left',
  className,
  outlineText = true,
}: MarqueeProps) {
  // Duplicate array 2 times for mathematically seamless 50% translation
  const list = [...items, ...items];

  return (
    <div
      className={cn(
        'group flex overflow-hidden select-none py-3 -my-3',
        className
      )}
      data-cursor="drag"
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-6 md:gap-10 pause-on-hover will-change-transform',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        )}
      >
        {list.map((item, index) => {
          const isBullet = item === '•';
          return (
            <div
              key={index}
              className={cn(
                'whitespace-nowrap font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight transition-all duration-300',
                isBullet
                  ? 'text-accent text-lg sm:text-xl md:text-2xl'
                  : outlineText
                  ? 'text-transparent stroke-outline hover:text-ink hover:stroke-transparent cursor-pointer'
                  : 'text-ink/80 hover:text-ink'
              )}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
