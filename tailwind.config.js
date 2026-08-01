/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#07060c',
          800: '#0c0a17',
          700: '#131026',
          600: '#1b1735',
          500: '#272248',
        },
        brand: {
          purple: '#8b5cf6',
          violet: '#7c3aed',
          glow: '#a855f7',
          light: '#c084fc',
          accent: '#e9d5ff',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-dot': '0 0 12px 3px rgba(168, 85, 247, 0.8)',
      }
    },
  },
  plugins: [],
}
