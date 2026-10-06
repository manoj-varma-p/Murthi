'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { VideoItem } from '@/data/videos';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: VideoItem;
  index: number;
  onSelect: (video: VideoItem, index: number) => void;
  className?: string;
}

export function VideoCard({ video, index, onSelect, className }: VideoCardProps) {
  const [thumbSrc, setThumbSrc] = useState<string>(
    `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
  );
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const handleMouseEnter = () => {
    if (isTouchRef.current) return;
    setIsHovered(true);
    // Immediately trigger inline muted video playback on cursor enter
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPreview(false);
  };

  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      layoutId={`video-card-${video.id}`}
      data-cursor="video"
      onClick={() => onSelect(video, index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex-shrink-0 w-[230px] sm:w-[280px] md:w-[320px] aspect-[9/16] rounded-none overflow-hidden bg-black/60 border border-white/15 shadow-2xl cursor-pointer select-none transition-all duration-300 hover:border-white/40 hover:shadow-2xl',
        className
      )}
    >
      {/* Background Image / Thumbnail (Fades out when preview video is active) */}
      <motion.div
        animate={{ scale: isHovered ? 1.04 : 1, opacity: showPreview ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={thumbSrc}
          alt={video.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 280px, 320px"
          className="object-cover"
          onError={() => {
            // Fallback to standard high-quality YouTube thumbnail
            setThumbSrc(`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`);
          }}
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </motion.div>

      {/* Hover preview video iframe (Plays immediately when cursor enters block) */}
      {showPreview && (
        <div className="absolute inset-0 w-full h-full z-10 overflow-hidden rounded-none pointer-events-none transition-opacity duration-300 bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${video.id}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
            title={video.title}
            className="w-full h-full object-cover scale-[1.3] origin-center pointer-events-none"
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="eager"
          />
        </div>
      )}

      {/* Top Bar with Number Badge */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="px-2.5 py-1 rounded-none bg-black/80 backdrop-blur-md text-white font-display font-bold text-xs tracking-wider border border-white/20 shadow-sm">
          {formattedNumber}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>

      {/* Center Glass Play Button (Smoothly hides when hovering so video plays unobstructed) */}
      <div
        className={cn(
          'absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300',
          isHovered ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
          <Play className="w-6 h-6 fill-current translate-x-0.5" />
        </div>
      </div>

      {/* Bottom Information (Subtly dims on hover so video is prominently viewed) */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 p-5 z-20 pointer-events-none bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-12 transition-opacity duration-300',
          isHovered ? 'opacity-50' : 'opacity-100'
        )}
      >
        <div className="inline-block px-2.5 py-0.5 rounded-none bg-[#EEFF04] text-black text-[11px] font-extrabold tracking-wider uppercase mb-2">
          {video.category}
        </div>
        <h3 className="text-white font-display font-semibold text-lg leading-tight line-clamp-1">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-white/75 text-xs line-clamp-1 mt-1 font-sans">
            {video.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
