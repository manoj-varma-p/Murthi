'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from './useMediaQuery';

export function useParallax(distance: number = 50): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const normalY = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const staticY = useTransform(scrollYProgress, () => 0);

  return {
    ref,
    y: prefersReduced ? staticY : normalY,
  };
}
