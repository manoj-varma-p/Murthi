'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { VideoItem } from '@/data/videos';
import { useScrollContext } from './SmoothScroll';

interface VideoModalProps {
  isOpen: boolean;
  video: VideoItem | null;
  currentIndex: number;
  totalVideos: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function VideoModal({
  isOpen,
  video,
  currentIndex,
  totalVideos,
  onClose,
  onPrev,
  onNext,
}: VideoModalProps) {
  const { stopScroll, startScroll } = useScrollContext();

  // Handle Lenis stop/start and keyboard events
  useEffect(() => {
    if (isOpen) {
      stopScroll();
    } else {
      startScroll();
    }
    return () => {
      startScroll();
    };
  }, [isOpen, stopScroll, startScroll]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !video) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Blurred Ivory Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          className="absolute inset-0 bg-bg-ivory/80 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Previous Arrow Button */}
          <button
            onClick={onPrev}
            aria-label="Previous project"
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-line shadow-editorial text-ink hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Centered 9:16 Video Player Container */}
          <motion.div
            layoutId={`video-card-${video.id}`}
            className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[9/16] max-h-[85vh] rounded-none overflow-hidden bg-black shadow-2xl border border-white/20 flex flex-col"
          >
            {/* Top Bar inside modal */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-ink/90 via-ink/40 to-transparent pointer-events-auto">
              <span className="px-3 py-1 rounded-none bg-black/80 backdrop-blur-md text-white font-display font-bold text-xs tracking-wider border border-white/20">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalVideos).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://youtube.com/shorts/${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in YouTube"
                  className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md text-ink flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md text-ink flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Iframe (Unmounts on close to stop playback) */}
            <div className="relative w-full h-full flex-1 bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Bottom details strip */}
            <div className="p-4 bg-surface text-ink border-t border-line">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-ink px-2 py-0.5 rounded">
                    {video.category}
                  </span>
                  <h4 className="font-display font-bold text-base mt-1 text-ink">
                    {video.title}
                  </h4>
                </div>
              </div>
              {video.tools && (
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {video.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-bg-light border border-line text-ink-soft"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Next Arrow Button */}
          <button
            onClick={onNext}
            aria-label="Next project"
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-line shadow-editorial text-ink hover:bg-accent transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="md:hidden fixed bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-4">
          <button
            onClick={onPrev}
            aria-label="Previous project"
            className="w-12 h-12 rounded-full bg-surface border border-line shadow-lg text-ink flex items-center justify-center active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="px-6 h-12 rounded-full bg-ink text-surface font-medium text-sm shadow-lg flex items-center justify-center active:scale-95"
          >
            Close Player
          </button>
          <button
            onClick={onNext}
            aria-label="Next project"
            className="w-12 h-12 rounded-full bg-surface border border-line shadow-lg text-ink flex items-center justify-center active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}
