import type { Metadata, Viewport } from 'next';
import { Syne, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { Preloader } from '@/components/ui/Preloader';
import { Cursor } from '@/components/ui/Cursor';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Navbar } from '@/components/ui/Navbar';
import { siteConfig } from '@/data/site';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FAF8F4',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Rai Praveen — Graphic Designer, Video Editor & Motion Graphic Designer',
  description:
    'Creative portfolio of Rai Praveen based in Hyderabad, India. Specializing in high-retention short-form video editing, motion graphics, commercial promos, and AI-powered visual assets.',
  keywords: [
    'Rai Praveen',
    'Graphic Designer Hyderabad',
    'Video Editor India',
    'Motion Graphics Designer',
    'Reels Editor',
    'Commercial Video Editor',
    'DaVinci Resolve Colorist',
    'After Effects Motion',
  ],
  authors: [{ name: 'Rai Praveen', url: 'https://raipraveen.com' }],
  creator: 'Rai Praveen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raipraveen.com',
    title: 'Rai Praveen — Graphic Designer & Motion Artist',
    description:
      '4+ years crafting social creatives, promotional videos, motion graphics and AI-powered visuals.',
    siteName: 'Rai Praveen Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Rai Praveen Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rai Praveen — Graphic Designer & Motion Artist',
    description:
      'Crafting motion that moves people. Short-form edits, promos, and visual narratives.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: 'https://raipraveen.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'India',
    },
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    sameAs: siteConfig.socials.map((s) => s.url),
    knowsAbout: [
      'Graphic Design',
      'Video Editing',
      'Motion Graphic Design',
      'After Effects',
      'Premiere Pro',
      'DaVinci Resolve',
      'Visual Effects',
    ],
  };

  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-light text-ink antialiased selection:bg-accent selection:text-ink">
        <SmoothScroll>
          {/* Film Grain Subtle Overlay */}
          <div className="film-grain" />

          {/* Interactive Custom Cursor (Desktop only) */}
          <Cursor />

          {/* Global Scroll Progress Bar */}
          <ProgressBar />

          {/* Page Load Preloader */}
          <Preloader />

          {/* Fixed Floating Island Navbar */}
          <Navbar />

          <main id="main-content">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
