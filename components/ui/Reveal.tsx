'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface RevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  viewportMargin?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  yOffset = 40,
  className,
  viewportMargin = '-12%',
  ...props
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  const initialVariant = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, y: yOffset, filter: 'blur(8px)' };

  const animateVariant = prefersReduced
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.div
      initial={initialVariant}
      whileInView={animateVariant}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
