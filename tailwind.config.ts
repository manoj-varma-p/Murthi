import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': '#FAF8F4',
        'bg-ivory': '#F3EFE8',
        'bg-medium': '#E4DCCD',
        'bg-stone': '#CFC6B6',
        'bg-hero': '#CEC9BD',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#1C1B19',
          soft: '#5C574F',
          muted: '#8A8378',
        },
        accent: {
          DEFAULT: '#F5B800',
          soft: '#FCE9A6',
          neon: '#EEFF04',
        },
        neon: '#EEFF04',
        line: 'rgba(28, 27, 25, 0.10)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Syne', 'sans-serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        editorial: '0 20px 60px -20px rgba(28, 27, 25, 0.12)',
        'editorial-hover': '0 30px 80px -25px rgba(28, 27, 25, 0.20)',
        soft: '0 10px 30px -10px rgba(28, 27, 25, 0.08)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 20s linear infinite',
        'spin-badge': 'spinSlow 12s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
