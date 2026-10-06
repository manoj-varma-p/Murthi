'use client';

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import Lenis from 'lenis';

interface ScrollContextType {
  lenis: Lenis | null;
  stopScroll: () => void;
  startScroll: () => void;
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
  isPreloaderFinished: boolean;
  setPreloaderFinished: (finished: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  stopScroll: () => {},
  startScroll: () => {},
  scrollTo: () => {},
  isPreloaderFinished: false,
  setPreloaderFinished: () => {},
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);
  const setPreloaderFinished = useCallback((finished: boolean) => setIsPreloaderFinished(finished), []);
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Only initialize smooth scroll on non-touch devices or when window is defined
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      reqIdRef.current = requestAnimationFrame(raf);
    }

    reqIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      lenis.destroy();
    };
  }, []);

  const stopScroll = () => {
    if (lenisInstance) {
      lenisInstance.stop();
    }
    document.body.style.overflow = 'hidden';
  };

  const startScroll = () => {
    if (lenisInstance) {
      lenisInstance.start();
    }
    document.body.style.overflow = '';
  };

  const scrollTo = (target: string | HTMLElement | number, options?: any) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, options);
    } else if (typeof target === 'string' && target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        lenis: lenisInstance,
        stopScroll,
        startScroll,
        scrollTo,
        isPreloaderFinished,
        setPreloaderFinished,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
