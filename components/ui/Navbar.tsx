'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { siteConfig } from '@/data/site';
import { MagneticButton } from './MagneticButton';
import { useScrollContext } from './SmoothScroll';
import { ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const { scrollTo } = useScrollContext();
  const { scrollY } = useScroll();
  // Start hidden at top so hero's native split-nav displays cleanly
  const [hidden, setHidden] = useState(true);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Show floating nav only after scrolling past hero top, and hide on rapid scroll down
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < 120) {
      setHidden(true);
    } else if (latest > previous && latest > 250) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = siteConfig.navLinks.find((link) => link.href === `#${id}`);
            if (match) setActiveSection(match.name);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    siteConfig.navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string, name: string) => {
    setActiveSection(name);
    setMobileOpen(false);
    scrollTo(href, { offset: -30 });
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -90, opacity: 0 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center px-4 sm:px-6 pointer-events-none"
      >
        <div className="relative pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-surface/75 backdrop-blur-xl border border-line shadow-editorial max-w-[960px] w-full mx-auto">
          {/* Logo RP. */}
          <button
            onClick={() => handleNavClick('#hero', 'Home')}
            className="group flex items-center gap-1.5 focus:outline-none"
            aria-label="Rai Praveen Home"
          >
            <span className="font-display font-black text-xl tracking-tight text-ink group-hover:text-accent transition-colors">
              RP
            </span>
            <span className="w-2 h-2 rounded-full bg-accent -mb-2 group-hover:scale-125 transition-transform" />
          </button>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.name)}
                  className="relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-ink focus:outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-bg-medium/70 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? 'text-ink font-bold' : 'text-ink-soft'}>
                    {link.name}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Hire Me */}
          <div className="flex items-center gap-3">
            <MagneticButton
              onClick={() => handleNavClick('#contact', 'Contact')}
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-ink text-surface text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-accent hover:text-ink transition-colors"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1 inline-block" />
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50"
              aria-label="Toggle Navigation Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-ink origin-center transition-transform"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-ink transition-opacity"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-ink origin-center transition-transform"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay with Clip Path Circle Expand */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 90% 40px)' }}
            animate={{ clipPath: 'circle(150% at 90% 40px)' }}
            exit={{ clipPath: 'circle(0% at 90% 40px)' }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 bg-bg-ivory flex flex-col justify-between p-8 md:hidden text-ink"
          >
            <div className="pt-24 flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">
                Navigation
              </span>
              <div className="flex flex-col gap-4">
                {siteConfig.navLinks.map((link, idx) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06, duration: 0.5 }}
                    onClick={() => handleNavClick(link.href, link.name)}
                    className="text-left font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-ink hover:text-accent transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="border-t border-line/60 pt-6 flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-ink-muted">
                Get In Touch
              </span>
              <p className="font-display text-lg font-bold text-ink">
                {siteConfig.contact.email}
              </p>
              <p className="text-sm text-ink-soft">{siteConfig.contact.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
