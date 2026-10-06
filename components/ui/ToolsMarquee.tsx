'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';

export interface ToolIconDef {
  id: string;
  name: string;
}

export const toolsList: ToolIconDef[] = [
  { id: 'adobe', name: 'Adobe' },
  { id: 'pr', name: 'Adobe Premiere Pro' },
  { id: 'ae', name: 'Adobe After Effects' },
  { id: 'ps', name: 'Adobe Photoshop' },
  { id: 'ai', name: 'Adobe Illustrator' },
  { id: 'cc', name: 'Adobe Creative Cloud' },
  { id: 'dv', name: 'DaVinci Resolve' },
  { id: 'figma', name: 'Figma' },
  { id: 'blender', name: 'Blender' },
  { id: 'canva', name: 'Canva' },
  { id: 'midjourney', name: 'Midjourney' },
  { id: 'runway', name: 'Runway Gen-2' },
  { id: 'capcut', name: 'CapCut' },
  { id: 'topaz', name: 'Topaz Video AI' },
  { id: 'c4d', name: 'Cinema 4D' },
];

function PureToolIcon({ id }: { id: string }) {
  switch (id) {
    case 'adobe':
      // Official mathematically exact Adobe red "A" vector (pure glyph, no background)
      return (
        <svg
          viewBox="0 0 100 85"
          className="w-14 h-12 sm:w-16 sm:h-14 md:w-20 md:h-16 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(250,15,0,0.4)]"
        >
          <polygon points="0,0 35.8,0 0,84.6" fill="#FA0F00" />
          <polygon points="100,0 64.2,0 100,84.6" fill="#FA0F00" />
          <polygon points="49.8,34.5 67.8,77.2 55.4,77.2 49.8,63.1 40.5,63.1" fill="#FA0F00" />
        </svg>
      );

    case 'cc':
      // Adobe Creative Cloud multi-gradient infinity loop
      return (
        <svg
          viewBox="0 0 100 70"
          className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(234,119,255,0.35)]"
        >
          <defs>
            <linearGradient id="adobeCCGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FA0F00" />
              <stop offset="25%" stopColor="#EA77FF" />
              <stop offset="50%" stopColor="#9999FF" />
              <stop offset="75%" stopColor="#31A8FF" />
              <stop offset="100%" stopColor="#FF9A00" />
            </linearGradient>
          </defs>
          <path
            d="M74 20 C68 20 63 24 60 29 C56 21 47 16 37 16 C22 16 10 28 10 43 C10 58 22 70 37 70 C47 70 56 64 60 56 C63 61 68 65 74 65 C82 65 89 58 89 50 C89 45 86 41 82 38 C86 35 89 31 89 26 C89 23 83 20 74 20 Z"
            fill="url(#adobeCCGrad2)"
          />
        </svg>
      );

    case 'pr':
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(234,119,255,0.4)]"
        >
          <rect width="64" height="64" rx="16" fill="#180026" stroke="#EA77FF" strokeWidth="2.5" />
          <text
            x="32"
            y="43"
            fill="#EA77FF"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            Pr
          </text>
        </svg>
      );

    case 'ae':
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(153,153,255,0.4)]"
        >
          <rect width="64" height="64" rx="16" fill="#03002E" stroke="#9999FF" strokeWidth="2.5" />
          <text
            x="32"
            y="43"
            fill="#9999FF"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            Ae
          </text>
        </svg>
      );

    case 'ps':
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(49,168,255,0.4)]"
        >
          <rect width="64" height="64" rx="16" fill="#001E36" stroke="#31A8FF" strokeWidth="2.5" />
          <text
            x="32"
            y="43"
            fill="#31A8FF"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            Ps
          </text>
        </svg>
      );

    case 'ai':
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(255,154,0,0.4)]"
        >
          <rect width="64" height="64" rx="16" fill="#241000" stroke="#FF9A00" strokeWidth="2.5" />
          <text
            x="32"
            y="43"
            fill="#FF9A00"
            fontSize="28"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            textAnchor="middle"
          >
            Ai
          </text>
        </svg>
      );

    case 'dv':
      // Pure DaVinci Resolve color wheel without background box
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(255,69,58,0.35)]"
        >
          <g transform="translate(32, 32)">
            <path d="M0,0 L0,-28 A28,28 0 0,1 24.2,-14 Z" fill="#FF453A" />
            <path d="M0,0 L24.2,-14 A28,28 0 0,1 24.2,14 Z" fill="#FF9F0A" />
            <path d="M0,0 L24.2,14 A28,28 0 0,1 0,28 Z" fill="#FFD60A" />
            <path d="M0,0 L0,28 A28,28 0 0,1 -24.2,14 Z" fill="#30D158" />
            <path d="M0,0 L-24.2,14 A28,28 0 0,1 -24.2,-14 Z" fill="#0A84FF" />
            <path d="M0,0 L-24.2,-14 A28,28 0 0,1 0,-28 Z" fill="#BF5AF2" />
            <circle cx="0" cy="0" r="7.5" fill="#FAF8F4" />
          </g>
        </svg>
      );

    case 'figma':
      // Pure Figma 5-piece color logo without background box
      return (
        <svg
          viewBox="0 0 38 57"
          className="w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(162,89,255,0.35)]"
        >
          <path d="M19 0H9.5C4.25 0 0 4.25 0 9.5s4.25 9.5 9.5 9.5H19V0z" fill="#F24E1E" />
          <path d="M19 0h9.5C33.75 0 38 4.25 38 9.5S33.75 19 28.5 19H19V0z" fill="#FF7262" />
          <path d="M19 19H9.5C4.25 19 0 23.25 0 28.5S4.25 38 9.5 38H19V19z" fill="#A259FF" />
          <circle cx="28.5" cy="28.5" r="9.5" fill="#1ABCFE" />
          <path
            d="M19 38H9.5C4.25 38 0 42.25 0 47.5S4.25 57 9.5 57 19 52.75 19 47.5V38z"
            fill="#0ACF83"
          />
        </svg>
      );

    case 'blender':
      // Pure Blender 3D logo without background box
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(234,118,0,0.35)]"
        >
          <circle cx="32" cy="36" r="16" fill="#EA7600" />
          <circle cx="32" cy="36" r="9" fill="#265787" />
          <circle cx="32" cy="36" r="4.5" fill="#FFFFFF" />
          <path
            d="M32 8 L32 20 M8 22 L18 28 M56 22 L46 28"
            stroke="#EA7600"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'canva':
      // Pure Canva circular icon
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(0,196,204,0.35)]"
        >
          <defs>
            <linearGradient id="canvaPureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C4CC" />
              <stop offset="100%" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#canvaPureGrad)" />
          <path
            d="M38 23c-3-3.3-7.5-4.5-11.5-3.6-6 1.4-10.5 7.5-9.9 13.6.6 6.3 5.7 11.3 12 11.3 4.3 0 8.1-2.2 10.3-5.5.7-1-.1-2.4-1.3-2.4-.7 0-1.2.4-1.6 1-1.7 2.5-4.5 4.1-7.6 4.1-4.8 0-8.8-3.7-9.3-8.5-.6-5.3 3.1-10.2 8.4-11 3.1-.5 6.1.4 8.2 2.5.6.6 1.3.6 1.8 0l1.2-1.2c.6-.6.3-1.4-.3-1.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'capcut':
      // Pure CapCut geometric bowtie/hourglass logo without background box
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
        >
          <path d="M4 14 L30 29 L4 44 Z" fill="#0E0E0E" />
          <path d="M60 14 L34 29 L60 44 Z" fill="#0E0E0E" />
          <circle cx="32" cy="29" r="5" fill="#0E0E0E" />
        </svg>
      );

    case 'midjourney':
      // Pure Midjourney sailboat logo without background box
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(2,132,199,0.35)]"
        >
          <g transform="translate(8, 6) scale(1.35)">
            <path d="M18 2 L32 26 L18 21 Z" fill="#0E0E0E" />
            <path d="M15 6 L2 26 L15 21 Z" fill="#475569" />
            <path d="M3 28 Q18 36 33 28 L18 31 Z" fill="#0284C7" />
          </g>
        </svg>
      );

    case 'runway':
      // Pure Runway Gen-2 'R' logo without background box
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(238,255,4,0.45)]"
        >
          <g transform="translate(14, 10) scale(1.1)">
            <path
              d="M0 0 H18 C25 0 30 4.5 30 11.5 C30 18.5 25 23 18 23 H8 V38 H0 V0 Z M8 8 V15 H17 C20.5 15 22 13.5 22 11.5 C22 9.5 20.5 8 17 8 H8 Z"
              fill="#0E0E0E"
            />
            <path d="M16 22 L30 38 H20 L8 23 Z" fill="#EEFF04" />
          </g>
        </svg>
      );

    case 'topaz':
      // Pure Topaz Video AI sapphire crystal glyph without background box
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(14,165,233,0.35)]"
        >
          <polygon points="32,2 58,16 32,60 6,16" fill="none" stroke="#0284C7" strokeWidth="3" />
          <polygon points="32,2 44,16 32,60 20,16" fill="#0EA5E9" opacity="0.8" />
          <polygon points="32,2 58,16 44,16" fill="#38BDF8" />
          <polygon points="32,2 6,16 20,16" fill="#0284C7" />
        </svg>
      );

    case 'c4d':
      // Pure Cinema 4D logo
      return (
        <svg
          viewBox="0 0 64 64"
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
        >
          <circle cx="32" cy="32" r="28" fill="#001433" />
          <text
            x="32"
            y="42"
            fill="#38BDF8"
            fontSize="21"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
          >
            C4D
          </text>
        </svg>
      );

    default:
      return null;
  }
}

export function ToolsMarquee({ speed = 12 }: { speed?: number }) {
  const prefersReduced = useReducedMotion();
  // Duplicate list 3 times for seamless infinite loop
  const repeatedList = [...toolsList, ...toolsList, ...toolsList];

  return (
    <div className="relative w-full overflow-hidden py-6 select-none group">
      {/* Soft edge gradient fades for seamless loop transition */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-bg-light to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-bg-light to-transparent z-10" />

      <motion.div
        animate={
          prefersReduced
            ? {}
            : {
                x: ['0%', '-33.333%'],
              }
        }
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed, // Sped up from 24s to 12s per user request
        }}
        className="flex shrink-0 items-center gap-12 sm:gap-16 md:gap-20 group-hover:[animation-play-state:paused]"
      >
        {repeatedList.map((tool, idx) => (
          <div
            key={`${tool.id}-${idx}`}
            title={tool.name}
            className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-125 cursor-pointer"
          >
            <PureToolIcon id={tool.id} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
