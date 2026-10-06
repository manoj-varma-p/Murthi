'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollContext } from './SmoothScroll';

export function Preloader() {
  const { isPreloaderFinished, setPreloaderFinished } = useScrollContext();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isPreloaderFinished) return;

    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setIsDone(true);
      setPreloaderFinished(true);
    };

    const startTime = performance.now();
    const duration = 1400;

    // Failsafe: force-dismiss after 3s regardless
    const failsafe = setTimeout(finish, 3000);

    // 50ms interval (20fps) is plenty smooth and avoids thrashing
    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(elapsed / duration, 1);
      const eased = Math.round((1 - Math.pow(1 - pct, 3)) * 100);
      setProgress(eased);

      if (pct >= 1) {
        clearInterval(timer);
        clearTimeout(failsafe);
        setTimeout(finish, 180);
      }
    }, 50);

    return () => {
      finished = true;
      clearInterval(timer);
      clearTimeout(failsafe);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clamp runner so head never goes past the track edges
  const runnerLeft = `clamp(0px, calc(${progress}% - 12px), calc(100% - 24px))`;

  return (
    <AnimatePresence>
      {!isPreloaderFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0e0e0e] select-none pointer-events-none"
        >
          {/* Name */}
          <motion.h1
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="font-display font-black tracking-[-0.03em] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none text-[#EEFF04] uppercase mb-12 sm:mb-16 md:mb-20 drop-shadow-sm select-none text-center px-4"
          >
            PRAVEEN
          </motion.h1>

          {/* Runner track container */}
          <motion.div
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-64 sm:w-80 md:w-96"
          >

            {/* Running stick figure */}
            <div
              className="absolute"
              style={{ bottom: '14px', left: runnerLeft, transition: 'left 80ms linear' }}
            >
              <svg
                width="24"
                height="38"
                viewBox="0 0 24 38"
                fill="none"
                aria-hidden="true"
                style={{ overflow: 'visible' }}
              >
                {/* Head */}
                <circle cx="12" cy="5" r="4.5" fill="#EEFF04" />
                {/* Animated body group */}
                <g className="r-body">
                  {/* Torso */}
                  <line x1="12" y1="9.5" x2="12" y2="22" stroke="#EEFF04" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Back arm */}
                  <g className="r-ab">
                    <line x1="12" y1="13" x2="3" y2="19" stroke="#EEFF04" strokeWidth="2" strokeLinecap="round" />
                  </g>
                  {/* Front arm */}
                  <g className="r-af">
                    <line x1="12" y1="13" x2="21" y2="19" stroke="#EEFF04" strokeWidth="2" strokeLinecap="round" />
                  </g>
                  {/* Back leg */}
                  <g className="r-lb">
                    <line x1="12" y1="22" x2="5" y2="36" stroke="#EEFF04" strokeWidth="2.2" strokeLinecap="round" />
                  </g>
                  {/* Front leg */}
                  <g className="r-lf">
                    <line x1="12" y1="22" x2="19" y2="36" stroke="#EEFF04" strokeWidth="2.2" strokeLinecap="round" />
                  </g>
                </g>
              </svg>
            </div>

            {/* Track */}
            <div
              className="w-full h-[3px] bg-white/10 rounded-full"
              style={{ marginTop: '48px' }}
            >
              <div
                className="h-full bg-[#EEFF04] rounded-full"
                style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
              />
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-2 text-[10px] font-mono tracking-widest text-white/25">
              <span>0%</span>
              <span className="text-[#EEFF04] font-bold text-xs tabular-nums">
                {String(progress).padStart(3, '0')}%
              </span>
              <span>100%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}