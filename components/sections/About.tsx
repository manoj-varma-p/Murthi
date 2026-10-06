'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/data/site';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';

function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="inline-block relative mr-[0.3em] mb-1">
      <motion.span style={{ opacity }} className="text-ink">
        {word}
      </motion.span>
    </span>
  );
}

export function About() {
  const prefersReduced = useReducedMotion();
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const bioWords = siteConfig.bio.split(' ');

  return (
    <section
      id="about"
      className="relative py-14 sm:py-18 md:py-20 bg-bg-ivory text-ink overflow-x-clip border-t border-line/60"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 flex flex-col items-center">
        {/* Eyebrow Tab — Centered */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-surface border border-line shadow-sm text-xs font-bold uppercase tracking-[0.18em] text-ink">
            <span className="w-2 h-2 rounded-full bg-accent" />
            CAREER SUMMARY
          </div>
          <span className="text-xs uppercase tracking-widest text-ink-muted hidden sm:inline-block">
            About Rai Praveen
          </span>
        </div>

        {/* Section Heading — Page Center */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-ink uppercase">
            About <span className="font-serif italic font-normal text-accent lowercase">me</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm uppercase font-bold tracking-[0.2em] text-ink-muted">
            Story & Vision
          </p>
        </div>

        {/* Centered Scroll-linked Reading Paragraph — Much Larger & Fuller */}
        <div ref={textRef} className="max-w-5xl mx-auto text-center">
          <div className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.25] tracking-[-0.03em] text-center">
            {prefersReduced
              ? siteConfig.bio
              : bioWords.map((word, i) => {
                  const start = i / bioWords.length;
                  const end = start + 1 / bioWords.length;
                  return (
                    <ScrollWord
                      key={i}
                      word={word}
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  );
                })}
          </div>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-ink-soft leading-relaxed font-sans max-w-3xl mx-auto text-center">
            Dedicated to translating raw ideas into compelling visual stories that captivate attention within the first three seconds. From high-retention vertical reels to brand launch cinematics, I blend technical precision with creative instinct.
          </p>
        </div>

        {/* Bottom Counters Row — Centered with Tighter Spacing */}
        <Reveal className="w-full max-w-5xl mx-auto mt-12 sm:mt-16 pt-8 border-t border-line/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {siteConfig.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ink tracking-tight flex items-baseline justify-center">
                  <Counter value={stat.value} suffix={stat.suffix} duration={1.6} />
                </div>
                <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-ink-soft text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
