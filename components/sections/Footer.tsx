'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { useScrollContext } from '@/components/ui/SmoothScroll';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function Footer() {
  const { scrollTo } = useScrollContext();

  return (
    <footer className="relative bg-[#0E0E0E] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-between">
        {/* Top Strip with Navigation & Back to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            {siteConfig.navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              onClick={() => scrollTo('#hero')}
              className="px-5 py-2.5 rounded-full bg-white/10 border border-white/15 shadow-sm text-xs font-bold uppercase tracking-wider text-white hover:bg-[#EEFF04] hover:text-black transition-colors flex items-center gap-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>

        {/* Big Wordmark */}
        <div className="py-12 md:py-16 text-center overflow-hidden select-none px-4">
          <h1 className="font-display font-black text-[clamp(2.5rem,8.5vw,7.5rem)] leading-[0.9] tracking-[-0.03em] uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.4)] hover:[-webkit-text-stroke:1.5px_#EEFF04] hover:text-[#EEFF04] transition-all duration-500 cursor-default">
            RAI PRAVEEN
          </h1>
        </div>

        {/* Bottom Credits Strip */}
        <div className="flex items-center justify-start text-xs font-medium text-white/50 border-t border-white/10 pt-8 text-left">
          <p>@ 2026</p>
        </div>
      </div>
    </footer>
  );
}
