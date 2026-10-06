'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Copy, Check, ExternalLink, Sparkles, Clock, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

// Official WhatsApp Vector Icon
function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contact() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('🎬 Video Editing');

  const topics = [
    {
      label: '🎬 Video Editing',
      message: 'Hi Praveen, I saw your portfolio and would like to discuss high-retention video editing services for my content.',
    },
    {
      label: '✨ Motion Graphics',
      message: 'Hi Praveen, I am interested in creative motion graphics and visual effects for my brand/project.',
    },
    {
      label: '🚀 Brand Promo / Commercial',
      message: 'Hi Praveen, I want to create a high-impact promo video / commercial. Can we discuss timeline and details?',
    },
    {
      label: '💼 Full-Time / Retainer',
      message: 'Hi Praveen, we would love to discuss a full-time or monthly retainer opportunity with you.',
    },
  ];

  const activeTopic = topics.find((t) => t.label === selectedTopic) || topics[0];
  const whatsappUrl = `https://wa.me/919346031058?text=${encodeURIComponent(activeTopic.message)}`;

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(`Copied ${label} to clipboard!`);
    setTimeout(() => {
      setCopiedKey(null);
      setToastMessage(null);
    }, 2500);
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-24 md:py-36 bg-bg-medium text-ink overflow-x-clip border-t border-line/60"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Eyebrow Tab — Centered */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-surface border border-line shadow-sm text-xs font-bold uppercase tracking-[0.18em] text-ink">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            LET&apos;S TALK
          </div>
          <span className="text-xs uppercase tracking-widest text-ink-muted hidden sm:inline-block">
            Open for Commissions & Full-Time
          </span>
        </div>

        {/* Giant Headline with Centered Layout */}
        <div className="flex flex-col items-center text-center mb-16 max-w-4xl mx-auto">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-ink uppercase leading-[1.05]">
            Let&apos;s create something{' '}
            <span className="font-serif italic font-normal text-accent lowercase">
              unforgettable.
            </span>
          </h2>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-surface border border-line shadow-sm mt-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-bold text-ink">
              Currently accepting new projects
            </span>
          </div>
        </div>

        {/* Grid: 3 Contact Tiles Left, WhatsApp Hub Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: 3 Contact Tiles */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {/* Phone */}
            <MagneticButton
              onClick={() => handleCopy(siteConfig.contact.phone, 'phone', 'Phone number')}
              className="w-full text-left"
            >
              <div className="w-full bg-surface rounded-3xl p-6 sm:p-7 border border-line shadow-editorial hover:shadow-editorial-hover transition-all duration-300 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-bg-light border border-line flex items-center justify-center text-ink group-hover:bg-accent transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-ink-muted">
                      Direct Line / WhatsApp
                    </span>
                    <p className="font-display font-bold text-lg sm:text-xl text-ink">
                      {siteConfig.contact.phone}
                    </p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-bg-light border border-line flex items-center justify-center text-ink-muted group-hover:text-ink">
                  {copiedKey === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </div>
              </div>
            </MagneticButton>

            {/* Email */}
            <MagneticButton
              onClick={() => handleCopy(siteConfig.contact.email, 'email', 'Email address')}
              className="w-full text-left"
            >
              <div className="w-full bg-surface rounded-3xl p-6 sm:p-7 border border-line shadow-editorial hover:shadow-editorial-hover transition-all duration-300 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-bg-light border border-line flex items-center justify-center text-ink group-hover:bg-accent transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-ink-muted">
                      Direct Email
                    </span>
                    <p className="font-display font-bold text-base sm:text-xl text-ink break-all">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-bg-light border border-line flex items-center justify-center text-ink-muted group-hover:text-ink">
                  {copiedKey === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </div>
              </div>
            </MagneticButton>

            {/* Location */}
            <div className="w-full bg-surface rounded-3xl p-6 sm:p-7 border border-line shadow-editorial flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-bg-light border border-line flex items-center justify-center text-ink">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-ink-muted">
                  Base Location
                </span>
                <p className="font-display font-bold text-lg sm:text-xl text-ink">
                  {siteConfig.contact.location}
                </p>
                <p className="text-xs text-ink-soft mt-0.5">
                  Available for Remote Worldwide & On-Site
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dedicated WhatsApp Connect Hub */}
          <div className="lg:col-span-7 relative overflow-hidden bg-surface rounded-3xl p-8 sm:p-12 border border-line shadow-editorial flex flex-col justify-between">
            {/* Ambient emerald backlight glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-[#25D366]/15 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Status Header */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <span>Fastest Response • Usually within minutes</span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.08]">
                Connect on WhatsApp
              </h3>
              <p className="text-sm sm:text-base text-ink-soft font-sans leading-relaxed mt-3 max-w-xl">
                Skip the wait and long email threads. Chat with me directly on WhatsApp to discuss your next video edit, motion design project, timeline, or full-time collaboration.
              </p>

              {/* Topic Starter Chips */}
              <div className="mt-7">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  Select a topic to start with:
                </p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => {
                    const isSelected = selectedTopic === t.label;
                    return (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => setSelectedTopic(t.label)}
                        className={cn(
                          'px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer select-none',
                          isSelected
                            ? 'bg-ink text-surface border-ink shadow-md scale-105'
                            : 'bg-bg-light hover:bg-surface border-line text-ink-soft hover:text-ink'
                        )}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Preview Box */}
              <div className="mt-5 p-4 rounded-2xl bg-bg-light/80 border border-line/80 text-xs text-ink-soft font-mono flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <p className="italic text-ink leading-relaxed">
                  &ldquo;{activeTopic.message}&rdquo;
                </p>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="relative z-10 mt-8 pt-4 border-t border-line/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-[0_12px_32px_rgba(37,211,102,0.38)] hover:shadow-[0_16px_40px_rgba(37,211,102,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <WhatsAppIcon className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="w-4 h-4 ml-0.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Available Mon – Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy-to-clipboard Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[9000] px-5 py-3 rounded-full bg-ink text-surface font-sans text-xs font-semibold shadow-2xl flex items-center gap-2 border border-line"
          >
            <Check className="w-4 h-4 text-accent" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
