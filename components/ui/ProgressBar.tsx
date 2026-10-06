'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[100] origin-left pointer-events-none"
    />
  );
}
