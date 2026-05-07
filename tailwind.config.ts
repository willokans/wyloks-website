import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      colors: {
        cream: {
          DEFAULT: '#f5f1ea',
          dark: '#ece7de',
          darker: '#d9d3c8',
        },
        ink: {
          DEFAULT: '#16120b',
          mid: '#241e15',
          soft: '#3d3528',
          muted: '#7a6e60',
        },
        terra: {
          DEFAULT: '#c9622f',
          dark: '#a8461e',
          light: '#d97a4a',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease both',
        'fade-up-d1': 'fade-up 0.7s 0.15s ease both',
        'fade-up-d2': 'fade-up 0.7s 0.3s ease both',
        'fade-up-d3': 'fade-up 0.7s 0.45s ease both',
        'fade-in': 'fade-in 0.5s ease both',
        'line-grow': 'line-grow 0.8s 0.3s ease both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}

export default config
