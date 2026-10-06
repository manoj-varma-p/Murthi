'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/site';
import { useScrollContext } from '@/components/ui/SmoothScroll';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';

// Geometric SVG Icons matching reference design
function PacmanIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={`${className} text-[#EEFF04] fill-current shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]`} viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 10 10c0-1.4-.3-2.7-.8-3.9l-6.2 3.9L12 12l8.2-5.1C18.6 3.9 15.5 2 12 2z" />
    </svg>
  );
}

function FourPetalIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={`${className} text-[#EEFF04] fill-current shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]`} viewBox="0 0 24 24">
      <path d="M12 2a4 4 0 0 0-4 4c0 1.7.9 3.1 2.2 3.8A4.004 4.004 0 0 0 2 12a4 4 0 0 0 7.8 1.8c-.8 1.3-1.8 2.5-1.8 4.2a4 4 0 1 0 8 0c0-1.7-1-2.9-1.8-4.2A4.004 4.004 0 0 0 22 12a4 4 0 0 0-8.2-2.2C15.1 9.1 16 7.7 16 6a4 4 0 0 0-4-4z" />
    </svg>
  );
}

function CrownIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={`${className} text-[#EEFF04] fill-current shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]`} viewBox="0 0 24 24">
      <path d="M3 18h18v3H3v-3zm2-13l4.5 5.5L12 4l2.5 6.5L19 5l-1.5 10H6.5L5 5z" />
    </svg>
  );
}

function DiamondStarIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={`${className} text-[#EEFF04] fill-current shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]`} viewBox="0 0 24 24">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" />
    </svg>
  );
}

function AsteriskBurstIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={`${className} text-[#EEFF04] fill-current shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]`} viewBox="0 0 24 24">
      <path d="M11 2h2v7.2l5.1-5.1 1.4 1.4L14.4 10.6H22v2h-7.6l5.1 5.1-1.4 1.4L13 14.0V22h-2v-8.0l-5.1 5.1-1.4-1.4 5.1-5.1H2v-2h7.6L4.5 5.5l1.4-1.4L11 9.2V2z" />
    </svg>
  );
}

// Brand Monogram Mark
function StylizedMark({ className = 'w-14 h-11 text-3xl' }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center font-display font-black tracking-tighter text-[#EEFF04] select-none [-webkit-text-stroke:0.5px_rgba(28,27,25,0.2)] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] shrink-0`}>
      RP
    </div>
  );
}

export function Hero() {
  const { scrollTo, isPreloaderFinished } = useScrollContext();
  const prefersReduced = useReducedMotion();
  const nameRef = React.useRef<HTMLSpanElement>(null);
  const [nameWidth, setNameWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const measure = () => {
      if (nameRef.current) {
        setNameWidth(nameRef.current.offsetWidth);
      }
    };

    measure();

    const ro = new ResizeObserver(() => {
      measure();
    });

    ro.observe(el);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isPreloaderFinished]);

  // Full desktop links
  const leftNav = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT ME', href: '#about' },
    { label: 'PROJECTS', href: '#work' },
  ];

  const rightNav = [
    { label: 'SERVICES', href: '#skills' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'CONTACT', href: '#contact' },
  ];

  // Mobile streamlined links
  const mobileLeftNav = [
    { label: 'HOME', href: '#hero' },
    { label: 'WORK', href: '#work' },
  ];

  const mobileRightNav = [
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] h-[100dvh] sm:h-screen w-full bg-bg-light text-ink overflow-hidden flex flex-col justify-between pt-4 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-8 md:px-12 select-none"
    >
      {/* 1. TOP SPLIT NAVIGATION (Aligned starting with 'P' and ending with 'N') */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: nameWidth ? `${nameWidth}px` : undefined,
          maxWidth: '100%',
        }}
        className="w-full mx-auto flex items-center justify-between z-30 pt-2 transition-[width] duration-150"
      >
        {/* Desktop Left Nav Links */}
        <nav className="hidden sm:flex items-center gap-2.5 sm:gap-3.5 md:gap-5 text-xs md:text-sm font-bold tracking-wider text-ink uppercase">
          {leftNav.map((item, idx) => (
            <React.Fragment key={item.label}>
              {idx > 0 && <span className="text-ink/30 font-normal">|</span>}
              <button
                onClick={() => scrollTo(item.href)}
                className="hover:text-black transition-colors focus:outline-none"
              >
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile Left Nav Links */}
        <nav className="flex sm:hidden items-center gap-2 text-[11px] font-extrabold tracking-wider text-ink uppercase">
          {mobileLeftNav.map((item, idx) => (
            <React.Fragment key={item.label}>
              {idx > 0 && <span className="text-ink/30 font-normal">|</span>}
              <button
                onClick={() => scrollTo(item.href)}
                className="hover:text-black transition-colors focus:outline-none"
              >
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop Right Nav Links */}
        <nav className="hidden sm:flex items-center gap-2.5 sm:gap-3.5 md:gap-5 text-xs md:text-sm font-bold tracking-wider text-ink uppercase">
          {rightNav.map((item, idx) => (
            <React.Fragment key={item.label}>
              {idx > 0 && <span className="text-ink/30 font-normal">|</span>}
              <button
                onClick={() => scrollTo(item.href)}
                className="hover:text-black transition-colors focus:outline-none"
              >
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile Right Nav Links */}
        <nav className="flex sm:hidden items-center gap-2 text-[11px] font-extrabold tracking-wider text-ink uppercase">
          {mobileRightNav.map((item, idx) => (
            <React.Fragment key={item.label}>
              {idx > 0 && <span className="text-ink/30 font-normal">|</span>}
              <button
                onClick={() => scrollTo(item.href)}
                className="hover:text-black transition-colors focus:outline-none"
              >
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </nav>
      </motion.header>

      {/* 2. GIANT BACKGROUND TEXT — glides up and expands from loader center into hero position */}
      <div className="absolute inset-x-0 top-[9%] sm:top-[3.5%] md:top-[3%] flex justify-center items-center pointer-events-none select-none z-0">
        <motion.span
          ref={nameRef}
          initial={{ opacity: 1, y: '30vh', scale: 0.42 }}
          animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black leading-none tracking-[-0.02em] text-[#EEFF04] uppercase text-center drop-shadow-sm [-webkit-text-stroke:1px_rgba(28,27,25,0.18)] inline-block"
          style={{ fontSize: 'clamp(2.8rem, 12.2vw, 24rem)', whiteSpace: 'nowrap' }}
        >
          PRAVEEN
        </motion.span>
      </div>

      {/* 3. HERO CENTER AREA: PORTRAIT + FLOATING GLASS BADGES */}
      <div className="relative w-full max-w-[1680px] 2xl:max-w-[1920px] mx-auto flex-1 flex flex-col items-center justify-end z-10 pb-2 sm:pb-4">
        {/* LEFT FLOATING BADGES (Desktop only — hidden on mobile to avoid covering the creator portrait) */}
        <div className="hidden md:flex absolute left-4 lg:left-8 xl:left-12 2xl:left-16 top-1/2 -translate-y-1/2 flex-col gap-5 lg:gap-6 z-20 pointer-events-auto">
          {/* Badge 1: 80+ Projects */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.92 }}
            animate={isPreloaderFinished ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04, y: -3 }}
            className="relative overflow-hidden rounded-3xl p-5 sm:p-6 lg:p-7 flex items-center gap-4 backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/80 to-white/90 border border-white/80 shadow-[0_20px_50px_rgba(28,27,25,0.12),0_4px_16px_rgba(28,27,25,0.06),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04)] transition-all duration-300 min-w-[195px] sm:min-w-[220px] lg:min-w-[240px]"
          >
            {/* Glossy top reflection sheen */}
            <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/85 via-white/25 to-transparent pointer-events-none rounded-t-3xl" />
            <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4 w-full">
              <StylizedMark />
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-2xl sm:text-3xl text-ink leading-none">
                  80+
                </span>
                <span className="text-xs sm:text-sm font-bold text-ink-soft tracking-wider mt-1.5">
                  Projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* Badge 2: 4+ Years Experience */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.92 }}
            animate={isPreloaderFinished ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04, y: -3 }}
            className="relative overflow-hidden rounded-3xl p-5 sm:p-6 lg:p-7 flex flex-col text-left backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/80 to-white/90 border border-white/80 shadow-[0_20px_50px_rgba(28,27,25,0.12),0_4px_16px_rgba(28,27,25,0.06),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04)] transition-all duration-300 min-w-[195px] sm:min-w-[220px] lg:min-w-[240px]"
          >
            {/* Glossy top reflection sheen */}
            <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/85 via-white/25 to-transparent pointer-events-none rounded-t-3xl" />
            <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />

            <div className="relative z-10 flex flex-col text-left w-full">
              <span className="font-display font-black text-5xl sm:text-6xl text-ink leading-none">
                <span className="text-[#EEFF04] [-webkit-text-stroke:1px_rgba(28,27,25,0.25)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">4+</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-ink-soft tracking-wider mt-2">
                Years of experience
              </span>
            </div>
          </motion.div>
        </div>

        {/* CENTER CREATOR PORTRAIT — Rises smoothly from down below, dynamically scales with viewport */}
        <div className="absolute inset-x-0 bottom-[175px] sm:bottom-[-20px] md:bottom-[-25px] lg:bottom-[-30px] xl:bottom-[-35px] flex justify-center pointer-events-none z-10">
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.94 }}
            animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative w-[305px] xs:w-[335px] sm:w-auto sm:h-[65vh] md:h-[70vh] lg:h-[74vh] xl:h-[76vh] 2xl:h-[78vh] sm:max-h-[1600px] max-w-[88vw] aspect-[3/4]"
            >
              <Image
                src="/Smiling_Creator_with_Headphones-removebg-preview.png"
                alt="Rai Praveen — Creative Video Editor & Motion Designer"
                fill
                priority
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 500px, (max-width: 1600px) 700px, 900px"
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* HEADLINE & BUTTONS — Clear, prominent, fully visible */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 pb-1 sm:pb-0 max-w-lg">
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-ink sm:text-white sm:drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.08] tracking-tight"
          >
            Motion,{' '}
            <span className="sm:hidden">Applied Differently.</span>
            <span className="hidden sm:inline">
              <br />Applied
              <br />Differently.
            </span>
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2.5 sm:mt-4 flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap"
          >
            <a
              href="/Rai_Praveen_CV.jpg"
              download="Rai_Praveen_CV.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#EEFF04] text-black font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download CV</span>
            </a>
            <button
              onClick={() => scrollTo('#about')}
              className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#EEFF04] text-black font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              About Me
            </button>
          </motion.div>

          {/* Mobile Stats Pills — Cleanly placed under buttons with zero portrait overlap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isPreloaderFinished ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex md:hidden items-center justify-center gap-2.5 mt-2.5 text-[11px] font-extrabold uppercase tracking-wider text-black"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-br from-white/95 via-white/80 to-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)]">
              80+ Projects
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-br from-white/95 via-white/80 to-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)]">
              4+ Yrs Exp
            </span>
          </motion.div>
        </div>

        {/* RIGHT FLOATING PILL/CARD (Desktop only — hidden on mobile to avoid covering portrait) */}
        <div className="hidden md:flex absolute right-4 lg:right-8 xl:right-12 2xl:right-16 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={isPreloaderFinished ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, y: -2 }}
            className="relative overflow-hidden rounded-3xl p-6 sm:p-7 lg:p-8 backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/80 to-white/90 border border-white/80 shadow-[0_20px_50px_rgba(28,27,25,0.12),0_4px_16px_rgba(28,27,25,0.06),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04)] flex flex-col min-w-[190px] sm:min-w-[220px] lg:min-w-[240px]"
          >
            {/* Glossy top reflection sheen */}
            <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/85 via-white/25 to-transparent pointer-events-none rounded-t-3xl" />
            <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4 sm:gap-5 w-full">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <PacmanIcon className="w-6 h-6" />
                <span className="text-sm sm:text-base font-bold text-ink tracking-wide">
                  Creative
                </span>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-4">
                <FourPetalIcon className="w-6 h-6" />
                <span className="text-sm sm:text-base font-bold text-ink tracking-wide">
                  Reliable
                </span>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-4">
                <CrownIcon className="w-6 h-6" />
                <span className="text-sm sm:text-base font-bold text-ink tracking-wide">
                  Strategist
                </span>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-4">
                <DiamondStarIcon className="w-6 h-6" />
                <span className="text-sm sm:text-base font-bold text-ink tracking-wide">
                  Builder
                </span>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-4">
                <AsteriskBurstIcon className="w-6 h-6" />
                <span className="text-sm sm:text-base font-bold text-ink tracking-wide">
                  Efficient
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. HERO BOTTOM FLANKING CAPTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1680px] 2xl:max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-1 sm:gap-4 pt-1 z-20 pb-0.5 sm:pb-0"
      >
        {/* Bottom Left Note */}
        <div className="text-center sm:text-left max-w-xs">
          <p className="text-[11px] sm:text-sm font-sans font-medium text-ink/75 leading-tight">
            The Motion & Visuals Expert • <span className="font-bold text-ink">That&apos;s Rai Praveen.</span>
          </p>
        </div>

        {/* Bottom Right Description */}
        <div className="text-left sm:text-right max-w-sm sm:max-w-md hidden sm:block">
          <p className="text-xs sm:text-[13px] font-sans text-ink/80 leading-relaxed">
            Working closely with creators and brands to deliver high-retention video edits and motion graphics that merge creativity, technical excellence, and long-term value.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
