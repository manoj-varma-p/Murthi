'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { softwareTools, marqueeRow1, marqueeRow2 } from '@/data/skills';
import { Marquee } from '@/components/ui/Marquee';
import { ToolsMarquee } from '@/components/ui/ToolsMarquee';
import { Reveal } from '@/components/ui/Reveal';
import { Wrench } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';

function SoftwareCard({ item, index }: { item: (typeof softwareTools)[0]; index: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative bg-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-line shadow-sm sm:shadow-editorial hover:shadow-editorial-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          {/* Brand Style Icon Tile */}
          <motion.div
            whileHover={{ rotate: prefersReduced ? 0 : 6 }}
            style={{
              backgroundColor: item.badgeColor.bg,
              borderColor: item.badgeColor.border,
            }}
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300"
          >
            <span
              style={{ color: item.badgeColor.text }}
              className="font-display font-extrabold text-lg sm:text-2xl tracking-tighter"
            >
              {item.badge}
            </span>
          </motion.div>

          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-ink-muted bg-bg-light px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-line">
            {item.experience}
          </span>
        </div>

        <h3 className="font-display font-bold text-base sm:text-xl text-ink group-hover:text-ink transition-colors">
          {item.name}
        </h3>
        <p className="text-[11px] sm:text-xs text-ink-soft mt-0.5 sm:mt-1 line-clamp-1">{item.category}</p>
      </div>

      {/* Animated Proficiency Bar */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-line/60">
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold mb-1.5 sm:mb-2">
          <span className="text-ink-muted uppercase tracking-wider">Proficiency</span>
          <span className="text-ink font-bold">{item.proficiency}%</span>
        </div>
        <div className="w-full h-1.5 sm:h-2 rounded-full bg-bg-medium/60 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${item.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-accent rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="relative pt-16 sm:pt-20 md:pt-28 pb-0 bg-bg-light text-ink overflow-x-clip border-t border-line/60"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Eyebrow Tab — Centered */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-surface border border-line shadow-sm text-xs font-bold uppercase tracking-[0.18em] text-ink">
            <Wrench className="w-3.5 h-3.5 text-accent" />
            ARSENAL & CRAFT
          </div>
          <span className="text-xs uppercase tracking-widest text-ink-muted hidden sm:inline-block">
            Skills & Software
          </span>
        </div>

        <Reveal className="mb-12 sm:mb-14 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-ink uppercase">
            Tools & <span className="font-serif italic font-normal text-accent lowercase">capabilities</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-ink-soft max-w-xl mx-auto font-sans">
            A comprehensive suite of industry-standard creative software, cutting-edge AI generation engines, and design disciplines.
          </p>
        </Reveal>

        {/* Infinite Tool Icons Marquee — Moving Right to Left */}
        <div className="mb-12 sm:mb-16 -mx-4 sm:-mx-8 md:-mx-12 overflow-hidden">
          <ToolsMarquee speed={12} />
        </div>

        {/* Software Cards Grid (2 cols on mobile, 4 on desktop) */}
        <div className="mb-14 md:mb-16">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted mb-4 sm:mb-6">
            Primary Production Software
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {softwareTools.map((tool, idx) => (
              <SoftwareCard key={tool.name} item={tool} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Two Marquee Rows (Opposite directions, pause on hover) */}
      <div className="relative border-y border-line/60 bg-bg-ivory/50 py-3 flex flex-col gap-1.5">
        <Marquee items={marqueeRow1} direction="left" speed={35} outlineText={true} />
        <Marquee items={marqueeRow2} direction="right" speed={40} outlineText={true} />
      </div>
    </section>
  );
}
