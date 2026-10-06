'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticRadius?: number;
  maxDisplacement?: number;
  asChild?: boolean;
}

export function MagneticButton({
  children,
  className,
  magneticRadius = 80,
  maxDisplacement = 14,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < magneticRadius) {
      const power = (magneticRadius - distance) / magneticRadius;
      const pullX = (deltaX / distance) * maxDisplacement * power;
      const pullY = (deltaY / distance) * maxDisplacement * power;
      setPosition({ x: pullX, y: pullY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.5 }}
      className={cn(
        'relative inline-flex items-center justify-center select-none font-medium cursor-pointer',
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
