import { Hero } from '@/components/sections/Hero';
import { HeroTicker } from '@/components/ui/HeroTicker';
import { About } from '@/components/sections/About';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="relative w-full overflow-x-clip">
      {/* 1. Hero Section (bg light) */}
      <Hero />

      {/* Infinite Keywords Marquee Ticker (Dark Accent) */}
      <HeroTicker />

      {/* 2. About & Career Summary (bg ivory) */}
      <About />

      {/* 3. Selected Work: Video Showcase (bg light -> medium) */}
      <Work />

      {/* 4. Experience & Studio Journey (bg medium) */}
      <Experience />

      {/* 5. Skills & Software Arsenal (bg light) */}
      <Skills />

      {/* 6. Education & Languages (bg ivory) */}
      <Education />

      {/* 7. Contact & Project Inquiries (bg medium) */}
      <Contact />

      {/* 8. Global Wordmark Footer */}
      <Footer />
    </div>
  );
}
