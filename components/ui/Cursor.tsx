'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'link' | 'video' | 'drag';

export function Cursor() {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  // Springs for 40px trailing ring
  const ringX = useSpring(0, { stiffness: 220, damping: 20 });
  const ringY = useSpring(0, { stiffness: 220, damping: 20 });

  // Direct position for 8px dot
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch / coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setDotPos({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'video') {
        setVariant('video');
        return;
      }
      if (cursorAttr === 'drag') {
        setVariant('drag');
        return;
      }

      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setVariant('link');
      } else {
        setVariant('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [ringX, ringY]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Small 8px center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-ink z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotPos.x,
          y: dotPos.y,
          opacity: variant === 'video' || variant === 'drag' ? 0 : 1,
        }}
      />

      {/* Trailing Ring / Expanding badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center font-display font-bold uppercase tracking-wider text-ink -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: variant === 'video' || variant === 'drag' ? 84 : variant === 'link' ? 56 : 40,
          height: variant === 'video' || variant === 'drag' ? 84 : variant === 'link' ? 56 : 40,
          scale: isClicking ? 0.88 : 1,
          borderColor:
            variant === 'video' || variant === 'drag'
              ? 'rgba(245, 184, 0, 0.95)'
              : variant === 'link'
              ? 'rgba(245, 184, 0, 0.85)'
              : 'rgba(28, 27, 25, 0.35)',
          backgroundColor:
            variant === 'video' || variant === 'drag'
              ? '#F5B800'
              : variant === 'link'
              ? 'rgba(245, 184, 0, 0.24)'
              : 'transparent',
          borderWidth: variant === 'video' || variant === 'drag' ? '0px' : '1.5px',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        {variant === 'video' && (
          <span className="text-xs tracking-widest text-ink font-extrabold select-none">
            PLAY
          </span>
        )}
        {variant === 'drag' && (
          <span className="text-xs tracking-widest text-ink font-extrabold select-none">
            DRAG
          </span>
        )}
      </motion.div>
    </>
  );
}
