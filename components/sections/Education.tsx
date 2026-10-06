'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { educationData, languagesData } from '@/data/education';
import { Reveal } from '@/components/ui/Reveal';
import { GraduationCap, Languages } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';

function LanguageGauge({
  item,
  index,
}: {
  item: (typeof languagesData)[0];
  index: number;
}) {
  const prefersReduced = useReducedMotion();
  // Semi-circle gauge (radius 64, circumference for half-circle is PI * 64 ≈ 201)
  const radius = 64;
  const circumference = Math.PI * radius;
  // Calculate target strokeDashoffset according to score out of 10
  // circumference * 2 = 0% filled; circumference = 100% filled (10/10)
  const fillRatio = Math.min(Math.max(item.score / 10, 0), 1);
  const targetOffset = circumference * 2 - circumference * fillRatio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-surface rounded-2xl sm:rounded-3xl p-3 sm:p-8 border border-line shadow-sm sm:shadow-editorial flex flex-col items-center text-center w-full"
    >
      <div className="relative w-24 h-14 sm:w-44 sm:h-24 overflow-hidden flex items-end justify-center mb-2 sm:mb-4">
        <svg className="w-24 h-24 sm:w-44 sm:h-44 -rotate-180" viewBox="0 0 160 160">
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#E4DCCD"
            strokeWidth="12"
            strokeDasharray={circumference * 2}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
          {/* Animated Saffron Gauge Arc */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#F5B800"
            strokeWidth="12"
            strokeDasharray={circumference * 2}
            initial={{ strokeDashoffset: circumference * 2 }}
            whileInView={{ strokeDashoffset: targetOffset }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReduced ? 0 : 1.5,
              delay: prefersReduced ? 0 : 0.3 + index * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute bottom-0 sm:bottom-1 font-display font-black text-lg sm:text-2xl text-ink">
          {item.rating}
        </div>
      </div>

      <h4 className="font-display font-bold text-sm sm:text-xl text-ink mt-1 sm:mt-2">{item.name}</h4>
      <p className="text-[10px] sm:text-xs text-ink-muted uppercase tracking-wider mt-0.5 sm:mt-1">{item.level}</p>
    </motion.div>
  );
}

export function Education() {
  return (
    <section
      id="education"
      className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 md:pb-36 bg-bg-ivory text-ink overflow-x-clip border-t border-line/60"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Eyebrow Tab — Centered */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-surface border border-line shadow-sm text-xs font-bold uppercase tracking-[0.18em] text-ink">
            <GraduationCap className="w-3.5 h-3.5 text-accent" />
            BACKGROUND
          </div>
          <span className="text-xs uppercase tracking-widest text-ink-muted hidden sm:inline-block">
            Education & Communication
          </span>
        </div>

        <Reveal className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-ink uppercase">
            Education & <span className="font-serif italic font-normal text-accent lowercase">languages</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-ink-soft max-w-xl mx-auto font-sans">
            Formal foundations and bilingual proficiency empowering seamless collaboration with creators worldwide.
          </p>
        </Reveal>

        {/* 3-Column Education Cards (Sticky scroll stack on mobile, 3-col on desktop) */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 mb-14 sm:mb-20">
          {educationData.map((edu, idx) => (
            <motion.div
              key={edu.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              style={{ top: `calc(4.5rem + ${idx * 1.5}rem)` }}
              className="group bg-surface rounded-3xl p-5 sm:p-8 border border-line shadow-[0_12px_36px_rgba(0,0,0,0.12)] md:shadow-editorial hover:shadow-editorial-hover transition-all duration-300 flex flex-col justify-between sticky top-16 sm:top-20 md:static md:top-auto z-10"
            >
              <div>
                {/* Outlined Huge Year Numeral */}
                <div className="font-display font-black text-5xl sm:text-7xl text-transparent stroke-outline group-hover:text-accent group-hover:stroke-transparent transition-colors duration-300 leading-none mb-4 sm:mb-6">
                  {edu.year}
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-accent bg-ink px-2.5 py-0.5 rounded-full inline-block mb-2 sm:mb-3">
                  {edu.degree}
                </span>

                <h3 className="font-display font-bold text-lg sm:text-xl text-ink group-hover:text-ink transition-colors">
                  {edu.institution}
                </h3>

                {edu.location && (
                  <p className="text-xs text-ink-muted uppercase tracking-wider mt-1">
                    {edu.location}
                  </p>
                )}
              </div>

              {edu.note && (
                <p className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-line/60 text-xs sm:text-sm text-ink-soft font-sans leading-relaxed">
                  {edu.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Languages Section with Semicircle Gauges (Side-by-side 3 columns) */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 text-center">
            <Languages className="w-5 h-5 text-accent" />
            <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-ink">
              Language Fluency
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-8 max-w-4xl mx-auto">
            {languagesData.map((lang, idx) => (
              <LanguageGauge key={lang.name} item={lang} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
