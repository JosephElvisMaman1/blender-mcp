import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:          '#09090B',
        surface:     '#111117',
        'surface-2': '#18181F',
        border:      '#1F2028',
        'text-1':    '#EFEFEF',
        'text-2':    '#A0A0AC',
        'text-3':    '#5C5C6E',
        flame:       '#FF5F1F',
        'flame-dim': '#C44010',
        sky:         '#38BDF8',
        'sky-dim':   '#0EA5E9',
        violet:      '#818CF8',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'glow-pulse':'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
      },
      boxShadow: {
        'flame':    '0 0 24px rgba(255,95,31,0.25), 0 0 64px rgba(255,95,31,0.08)',
        'flame-sm': '0 0 12px rgba(255,95,31,0.2)',
        'sky':      '0 0 24px rgba(56,189,248,0.2)',
        'card':     '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
