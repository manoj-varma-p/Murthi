'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  children: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function SplitText({
  children,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as: Component = 'div',
}: SplitTextProps) {
  const prefersReduced = useReducedMotion();
  const words = children.split(' ');

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component className={cn('inline-flex flex-wrap gap-x-[0.25em] gap-y-1', className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1 -my-1">
          <motion.span
            initial={{ y: '115%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
            className={cn('inline-block', wordClassName)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
