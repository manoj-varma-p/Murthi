'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences } from '@/data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

function ExperienceCard({
  item,
  index,
  isLeft,
  anchorRef,
}: {
  item: (typeof experiences)[0];
  index: number;
  isLeft: boolean;
  anchorRef: (el: HTMLDivElement | null) => void;
}) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt on hover (max 4°)
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full">
      <motion.div
        initial={{
          opacity: 0,
          x: prefersReduced ? 0 : isLeft ? -50 : 50,
          filter: 'blur(8px)',
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
        }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        className="relative w-full bg-surface rounded-3xl p-6 sm:p-8 border border-line shadow-editorial hover:shadow-editorial-hover transition-all duration-300 z-10"
      >
        {/* Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-4 mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent bg-ink px-2.5 py-0.5 rounded-full inline-block mb-1">
              0{index + 1}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-ink tracking-tight">
              {item.company}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted bg-bg-light px-3 py-1 rounded-full border border-line">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{item.period}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">
          <Briefcase className="w-3.5 h-3.5 text-accent" />
          <span>{item.role}</span>
          <span className="text-ink-muted">•</span>
          <span className="flex items-center gap-1 text-ink-muted">
            <MapPin className="w-3 h-3" />
            {item.location}
          </span>
        </div>

        <p className="text-sm sm:text-base text-ink leading-relaxed font-sans mb-4">
          {item.description}
        </p>

        {/* Highlights */}
        <div className="space-y-2 mb-5">
          {item.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-ink-soft">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {item.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-bg-light border border-line text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Desktop Zigzag Anchor Node (Sits on the inner edge of each card) */}
      <div
        ref={anchorRef}
        className={cn(
          'hidden lg:flex absolute top-14 items-center justify-center z-20 pointer-events-none',
          isLeft ? '-right-3.5 translate-x-1/2' : '-left-3.5 -translate-x-1/2'
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 350, damping: 20, delay: index * 0.15 }}
          className="relative flex items-center justify-center"
        >
          <span className="w-8 h-8 rounded-full bg-[#EEFF04]/35 animate-ping absolute" />
          <span className="w-6 h-6 rounded-full bg-surface border-[3px] border-[#EEFF04] shadow-md flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-ink" />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorElements = useRef<(HTMLDivElement | null)[]>([]);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.7'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Measure exact coordinates of each card's anchor point relative to the container
  const updatePoints = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pts = anchorElements.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });
    setPoints(pts);
  }, []);

  useEffect(() => {
    updatePoints();
    const t1 = setTimeout(updatePoints, 100);
    const t2 = setTimeout(updatePoints, 400);
    const t3 = setTimeout(updatePoints, 1000);
    window.addEventListener('resize', updatePoints);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updatePoints);
    };
  }, [updatePoints]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-36 bg-bg-medium text-ink overflow-x-clip border-t border-line/60"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Eyebrow Tab — Centered */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-surface border border-line shadow-sm text-xs font-bold uppercase tracking-[0.18em] text-ink">
            <span className="w-2 h-2 rounded-full bg-accent" />
            EXPERIENCE
          </div>
          <span className="text-xs uppercase tracking-widest text-ink-muted hidden sm:inline-block">
            Proven Studio Track Record
          </span>
        </div>

        <Reveal className="mb-14 sm:mb-20 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-ink uppercase">
            Creative <span className="font-serif italic font-normal text-accent lowercase">journey</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-ink-soft max-w-xl mx-auto font-sans">
            Over four years collaborating across production studios, creative agencies, and mobile content powerhouses.
          </p>
        </Reveal>

        {/* Timeline Container with Dynamic Zigzag Slanted Lines */}
        <div ref={containerRef} className="relative mt-8 sm:mt-12">
          {/* Desktop Zigzag Slanted Connecting Lines between Blocks */}
          {points.length >= 2 && (
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ overflow: 'visible' }}
            >
              {points.slice(0, -1).map((p0, i) => {
                const p1 = points[i + 1];
                if (!p0 || !p1 || (p0.x === 0 && p0.y === 0) || (p1.x === 0 && p1.y === 0)) return null;
                return (
                  <g key={`slant-${i}`}>
                    {/* Background guide dashed line */}
                    <line
                      x1={p0.x}
                      y1={p0.y}
                      x2={p1.x}
                      y2={p1.y}
                      stroke="rgba(28, 27, 25, 0.16)"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                    />

                    {/* Animated Slanted Dashed Line */}
                    <motion.path
                      d={`M ${p0.x} ${p0.y} L ${p1.x} ${p1.y}`}
                      stroke="#EEFF04"
                      strokeWidth="3.5"
                      strokeDasharray="8 6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-5%' }}
                      transition={{
                        duration: 1.1,
                        delay: 0.2 + i * 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* Mobile Left Line */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-line">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-accent origin-top"
            />
          </div>

          {/* Experience Items (Sticky scroll stack on mobile, alternating zigzag on desktop) */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-16 pb-8">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={exp.id}
                  style={{ top: `calc(4.5rem + ${index * 1.5}rem)` }}
                  className="relative sticky top-16 sm:top-20 lg:static lg:top-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10"
                >
                  {/* Column Content */}
                  <div
                    className={`pl-10 sm:pl-12 lg:pl-0 ${
                      isLeft ? 'lg:pr-12' : 'lg:order-2 lg:pl-12'
                    }`}
                  >
                    <ExperienceCard
                      item={exp}
                      index={index}
                      isLeft={isLeft}
                      anchorRef={(el) => {
                        anchorElements.current[index] = el;
                      }}
                    />
                  </div>

                  {/* Mobile Left Timeline Node */}
                  <div className="lg:hidden absolute left-4 -translate-x-1/2 top-6 flex items-center justify-center z-20">
                    <div className="w-5 h-5 rounded-full bg-surface border-4 border-accent shadow-md" />
                  </div>

                  {/* Empty balancing column on desktop */}
                  <div className={`hidden lg:block ${isLeft ? 'lg:order-2' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
