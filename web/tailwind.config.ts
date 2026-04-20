import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        matrix:   '#00FF41',
        cyber:    '#00D4FF',
        neon:     '#FF00FF',
        dark:     '#000000',
        surface:  '#050508',
        border:   '#1a1a2e',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow':  'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow':        'glow 2s ease-in-out infinite alternate',
        'scan':        'scan 8s linear infinite',
        'flicker':     'flicker 0.15s infinite linear',
        'matrix-fall': 'matrixFall 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%':   { textShadow: '0 0 4px #00FF41, 0 0 8px #00FF41' },
          '100%': { textShadow: '0 0 8px #00FF41, 0 0 20px #00FF41, 0 0 40px #00FF41' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
      },
      boxShadow: {
        'matrix':  '0 0 20px rgba(0, 255, 65, 0.3)',
        'cyber':   '0 0 20px rgba(0, 212, 255, 0.3)',
        'neon':    '0 0 20px rgba(255, 0, 255, 0.3)',
        'inner-matrix': 'inset 0 0 20px rgba(0, 255, 65, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
