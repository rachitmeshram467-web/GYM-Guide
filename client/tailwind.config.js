/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gym: {
          950: '#07090e',
          900: '#0c1017',
          850: '#111722',
          800: '#172030',
          700: '#233048',
          600: '#334155',
          neon: '#10b981',
          'neon-glow': '#34d399',
          cyan: '#06b6d4',
          amber: '#f59e0b',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
        'cyan': '0 0 20px -3px rgba(6, 182, 212, 0.35)',
        'amber': '0 0 20px -3px rgba(245, 158, 11, 0.35)',
        'glow': '0 0 30px -5px rgba(16, 185, 129, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
