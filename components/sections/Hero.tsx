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
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const updateScale = () => {
      // Golden 1440x840 artboard scale-to-fit
      const s = Math.min(window.innerWidth / 1440, window.innerHeight / 840);
      setScale(Math.max(0.4, s));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
      className="relative min-h-[100dvh] h-[100dvh] sm:h-screen w-full bg-bg-light text-ink overflow-hidden select-none"
    >
      {/* =========================================================================
          1. DESKTOP / TABLET HERO: IMMUTABLE SCALE-TO-FIT ARTBOARD
          Maintains 100.0% identical composition on ANY screen size or window resize
          ========================================================================= */}
      <div className="hidden md:flex relative items-center justify-center w-full h-full overflow-hidden select-none">
        <div
          style={{
            width: '1440px',
            height: '840px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
          className="relative flex flex-col justify-between p-8 select-none shrink-0"
        >
          {/* Top Navigation */}
          <motion.header
            initial={{ opacity: 0, y: -25 }}
            animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-[1240px] mx-auto flex items-center justify-between z-30 pt-1"
          >
            <nav className="flex items-center gap-5 text-sm font-bold tracking-wider text-ink uppercase">
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

            <nav className="flex items-center gap-5 text-sm font-bold tracking-wider text-ink uppercase">
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
          </motion.header>

          {/* Giant Background Name: PRAVEEN */}
          <div className="absolute inset-x-0 top-[36px] flex justify-center items-center pointer-events-none select-none z-0">
            <motion.span
              initial={{ opacity: 1, y: '30vh', scale: 0.42 }}
              animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black leading-none tracking-[-0.02em] text-[#EEFF04] uppercase text-center drop-shadow-sm [-webkit-text-stroke:1.5px_rgba(28,27,25,0.2)] inline-block text-[182px]"
            >
              PRAVEEN
            </motion.span>
          </div>

          {/* Center Stage: Floating Cards + Portrait + Headline/Buttons */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-end z-10 pb-3">
            {/* Left Floating Badges */}
            <div className="absolute left-[45px] top-[402px] flex flex-col gap-6 z-20 pointer-events-auto">
              {/* Badge 1: 80+ Projects */}
              <motion.div
                initial={{ opacity: 0, x: -60, scale: 0.92 }}
                animate={isPreloaderFinished ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, y: -3 }}
                className="relative overflow-hidden rounded-3xl p-6 flex items-center gap-4 backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/80 to-white/90 border border-white/80 shadow-[0_20px_50px_rgba(28,27,25,0.12),0_4px_16px_rgba(28,27,25,0.06),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04)] transition-all duration-300 w-[240px]"
              >
                <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/85 via-white/25 to-transparent pointer-events-none rounded-t-3xl" />
                <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4 w-full">
                  <StylizedMark />
                  <div className="flex flex-col text-left">
                    <span className="font-display font-black text-3xl text-ink leading-none">80+</span>
                    <span className="text-sm font-bold text-ink-soft tracking-wider mt-1.5">Projects</span>
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: 4+ Years Experience */}
              <motion.div
                initial={{ opacity: 0, x: -60, scale: 0.92 }}
                animate={isPreloaderFinished ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, y: -3 }}
                className="relative overflow-hidden rounded-3xl p-6 flex flex-col text-left backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/80 to-white/90 border border-white/80 shadow-[0_20px_50px_rgba(28,27,25,0.12),0_4px_16px_rgba(28,27,25,0.06),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04)] transition-all duration-300 w-[240px]"
              >
                <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/85 via-white/25 to-transparent pointer-events-none rounded-t-3xl" />
                <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
                <div className="relative z-10 flex flex-col text-left w-full">
                  <span className="font-display font-black text-6xl text-ink leading-none">
                    <span className="text-[#EEFF04] [-webkit-text-stroke:1px_rgba(28,27,25,0.25)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">4+</span>
                  </span>
                  <span className="text-sm font-bold text-ink-soft tracking-wider mt-2">Years of experience</span>
                </div>
              </motion.div>
            </div>

            {/* Center Creator Portrait */}
            <div className="absolute inset-x-0 bottom-[-112px] flex justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.94 }}
                animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative w-[550px] h-[733px]">
                  <Image
                    src="/Smiling_Creator_with_Headphones-removebg-preview.png"
                    alt="Rai Praveen — Creative Video Editor & Motion Designer"
                    fill
                    priority
                    sizes="600px"
                    className="object-contain object-bottom drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* Headline & Buttons */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-lg mb-0">
              <motion.h2
                initial={{ opacity: 0, y: 35 }}
                animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.0, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-5xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] leading-[1.08] tracking-tight"
              >
                Motion,
                <br />Applied
                <br />Differently.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 flex items-center justify-center gap-4 flex-wrap"
              >
                <a
                  href="/Rai_Praveen_CV.jpg"
                  download="Rai_Praveen_CV.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-[#EEFF04] text-black font-extrabold text-sm tracking-wide uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Download CV</span>
                </a>
                <button
                  onClick={() => scrollTo('#about')}
                  className="px-8 py-3.5 rounded-full bg-[#EEFF04] text-black font-extrabold text-sm tracking-wide uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  About Me
                </button>
              </motion.div>
            </div>

            {/* Right Floating Card */}
            <div className="absolute right-[45px] top-[388px] z-20 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                animate={isPreloaderFinished ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 1.0, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="relative overflow-hidden rounded-3xl p-8 backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/80 to-white/90 border border-white/80 shadow-[0_20px_50px_rgba(28,27,25,0.12),0_4px_16px_rgba(28,27,25,0.06),inset_0_1.5px_1px_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.04)] flex flex-col w-[240px]"
              >
                <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/85 via-white/25 to-transparent pointer-events-none rounded-t-3xl" />
                <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-5 w-full">
                  <div className="flex items-center gap-4">
                    <PacmanIcon className="w-6 h-6" />
                    <span className="text-base font-bold text-ink tracking-wide">Creative</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <FourPetalIcon className="w-6 h-6" />
                    <span className="text-base font-bold text-ink tracking-wide">Reliable</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CrownIcon className="w-6 h-6" />
                    <span className="text-base font-bold text-ink tracking-wide">Strategist</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <DiamondStarIcon className="w-6 h-6" />
                    <span className="text-base font-bold text-ink tracking-wide">Builder</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <AsteriskBurstIcon className="w-6 h-6" />
                    <span className="text-base font-bold text-ink tracking-wide">Efficient</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Flanking Captions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-[1360px] mx-auto flex items-end justify-between pt-1 z-20"
          >
            <div className="text-left max-w-xs">
              <p className="text-sm font-sans font-medium text-ink/75 leading-tight">
                The Motion & Visuals Expert • <span className="font-bold text-ink">That&apos;s Rai Praveen.</span>
              </p>
            </div>

            <div className="text-right max-w-md">
              <p className="text-[13px] font-sans text-ink/80 leading-relaxed">
                Working closely with creators and brands to deliver high-retention video edits and motion graphics that merge creativity, technical excellence, and long-term value.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          2. MOBILE HERO: STREAMLINED PHONE-SPECIFIC VERTICAL STACK
          Tailored specifically for narrow mobile phone viewports (< 768px)
          ========================================================================= */}
      <div className="flex md:hidden flex-col justify-between w-full h-full pt-4 pb-3 px-4 select-none">
        {/* Mobile Header */}
        <motion.header
          initial={{ opacity: 0, y: -25 }}
          animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-between z-30 pt-2"
        >
          <nav className="flex items-center gap-2 text-[11px] font-extrabold tracking-wider text-ink uppercase">
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

          <nav className="flex items-center gap-2 text-[11px] font-extrabold tracking-wider text-ink uppercase">
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

        {/* Mobile Background Text */}
        <div className="absolute inset-x-0 top-[9%] flex justify-center items-center pointer-events-none select-none z-0">
          <motion.span
            initial={{ opacity: 1, y: '30vh', scale: 0.42 }}
            animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black leading-none tracking-[-0.02em] text-[#EEFF04] uppercase text-center drop-shadow-sm [-webkit-text-stroke:1px_rgba(28,27,25,0.18)] inline-block text-[48px] xs:text-[54px]"
          >
            PRAVEEN
          </motion.span>
        </div>

        {/* Mobile Stage: Portrait + Headline + Buttons + Pills */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-end z-10 pb-2">
          {/* Mobile Creator Portrait */}
          <div className="absolute inset-x-0 bottom-[175px] flex justify-center pointer-events-none z-10">
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.94 }}
              animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-[305px] xs:w-[335px] aspect-[3/4]">
                <Image
                  src="/Smiling_Creator_with_Headphones-removebg-preview.png"
                  alt="Rai Praveen — Creative Video Editor & Motion Designer"
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, 440px"
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Mobile Headline & Buttons */}
          <div className="relative z-20 flex flex-col items-center text-center px-4 pb-1 max-w-lg">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-2xl xs:text-3xl text-ink leading-[1.08] tracking-tight"
            >
              Motion, Applied Differently.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={isPreloaderFinished ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 flex items-center justify-center gap-2.5 flex-wrap"
            >
              <a
                href="/Rai_Praveen_CV.jpg"
                download="Rai_Praveen_CV.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#EEFF04] text-black font-extrabold text-xs tracking-wide uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span>Download CV</span>
              </a>
              <button
                onClick={() => scrollTo('#about')}
                className="px-5 py-2.5 rounded-full bg-[#EEFF04] text-black font-extrabold text-xs tracking-wide uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                About Me
              </button>
            </motion.div>

            {/* Mobile Stats Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isPreloaderFinished ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-2.5 mt-2.5 text-[11px] font-extrabold uppercase tracking-wider text-black"
            >
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-br from-white/95 via-white/80 to-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)]">
                80+ Projects
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-br from-white/95 via-white/80 to-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)]">
                4+ Yrs Exp
              </span>
            </motion.div>
          </div>
        </div>

        {/* Mobile Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isPreloaderFinished ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center pt-1 z-20 pb-0.5"
        >
          <div className="text-center max-w-xs">
            <p className="text-[11px] font-sans font-medium text-ink/75 leading-tight">
              The Motion & Visuals Expert • <span className="font-bold text-ink">That&apos;s Rai Praveen.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
