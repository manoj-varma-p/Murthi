'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videos, videoCategories, VideoCategory, VideoItem } from '@/data/videos';
import { VideoCard } from '@/components/ui/VideoCard';
import { VideoModal } from '@/components/ui/VideoModal';
import { LayoutGrid, Rows3 } from 'lucide-react';

export function Work() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('All');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'stream' | 'grid'>('stream');

  // Filtered videos list
  const filteredVideos =
    activeCategory === 'All'
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  // Split into two lanes for opposite scrolling directions
  const lane1Videos = filteredVideos.filter((_, i) => i % 2 === 0);
  const lane2Videos = filteredVideos.filter((_, i) => i % 2 !== 0);

  const activeLane1 = lane1Videos.length > 0 ? lane1Videos : filteredVideos;
  const activeLane2 = lane2Videos.length > 0 ? lane2Videos : filteredVideos;

  // Duplicate arrays 4x for infinite seamless loop
  const repeatedLane1 = [...activeLane1, ...activeLane1, ...activeLane1, ...activeLane1];
  const repeatedLane2 = [...activeLane2, ...activeLane2, ...activeLane2, ...activeLane2];

  // Modal Handlers
  const handleSelectVideo = (video: VideoItem) => {
    const idx = videos.findIndex((v) => v.id === video.id);
    setSelectedVideo(video);
    setSelectedIndex(idx >= 0 ? idx : 0);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handlePrevVideo = () => {
    const newIdx = (selectedIndex - 1 + videos.length) % videos.length;
    setSelectedIndex(newIdx);
    setSelectedVideo(videos[newIdx]);
  };

  const handleNextVideo = () => {
    const newIdx = (selectedIndex + 1) % videos.length;
    setSelectedIndex(newIdx);
    setSelectedVideo(videos[newIdx]);
  };

  return (
    <section
      id="work"
      className="relative py-24 sm:py-32 md:py-36 bg-[#0E0E0E] text-white transition-colors border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Top Header Strip — Centered */}
        <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 border border-white/15 shadow-sm text-xs font-bold uppercase tracking-[0.18em] text-[#EEFF04] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#EEFF04] animate-pulse" />
            SHOWCASE 2026
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase">
            Selected <span className="font-serif italic font-normal text-[#EEFF04] lowercase">work</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-lg font-sans">
            Short-form edits, promos and motion pieces crafted for high impact and engagement.
          </p>

          {/* Controls: View Switcher (Dual Stream vs Grid) */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/15 shadow-sm">
              <button
                onClick={() => setViewMode('stream')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  viewMode === 'stream'
                    ? 'bg-[#EEFF04] text-black shadow-sm font-extrabold'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-label="Automatic dual stream view"
              >
                <Rows3 className="w-3.5 h-3.5" />
                <span>Dual Stream</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#EEFF04] text-black shadow-sm font-extrabold'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-label="Gallery grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Strip with Animated Pill & Active Count — Centered */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-white/15 mb-10">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full mx-auto sm:mx-0">
            {videoCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="relative px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shrink-0 focus:outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-category-pill"
                      className="absolute inset-0 rounded-full bg-[#EEFF04] text-black -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? 'text-black font-extrabold' : 'text-white/60 hover:text-white'}>
                    {category}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="font-display font-bold text-xs sm:text-sm tracking-widest text-white/50 text-center sm:text-right">
            {String(filteredVideos.length).padStart(2, '0')} PROJECTS AVAILABLE
          </div>
        </div>
      </div>

      {/* DISPLAY MODE 1: Dual Lane Automatic Scroll (Left & Right) */}
      {viewMode === 'stream' ? (
        <div className="relative w-full space-y-6 select-none -mx-0">
          {/* Edge Vignette Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#0E0E0E] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#0E0E0E] to-transparent z-20" />

          {/* Lane 1: Automatic Scroll moving to LEFT */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="animate-video-left pause-on-hover gap-6">
              {repeatedLane1.map((video, idx) => (
                <VideoCard
                  key={`lane1-${video.id}-${idx}`}
                  video={video}
                  index={idx % activeLane1.length}
                  onSelect={handleSelectVideo}
                />
              ))}
            </div>
          </div>

          {/* Lane 2: Automatic Scroll moving to RIGHT */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="animate-video-right pause-on-hover gap-6">
              {repeatedLane2.map((video, idx) => (
                <VideoCard
                  key={`lane2-${video.id}-${idx}`}
                  video={video}
                  index={idx % activeLane2.length}
                  onSelect={handleSelectVideo}
                />
              ))}
            </div>
          </div>

          {/* Bottom Helpful Hint */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 pt-4 flex items-center justify-between text-xs text-white/40 uppercase tracking-widest font-semibold">
            <span>Hover on any card to preview & pause</span>
            <span>Click to watch full video</span>
          </div>
        </div>
      ) : (
        /* DISPLAY MODE 2: Responsive Grid Showcase */
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-2">
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="flex justify-center"
                >
                  <VideoCard
                    video={video}
                    index={index}
                    onSelect={handleSelectVideo}
                    className="w-full max-w-[340px]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Video Modal Player (YouTube 9:16 with Sound & Navigation) */}
      <VideoModal
        isOpen={Boolean(selectedVideo)}
        video={selectedVideo}
        currentIndex={selectedIndex}
        totalVideos={videos.length}
        onClose={handleCloseModal}
        onPrev={handlePrevVideo}
        onNext={handleNextVideo}
      />
    </section>
  );
}
