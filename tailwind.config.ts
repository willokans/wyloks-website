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
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9333EA',
          50: '#F9F6FE',
          100: '#F3ECFD',
          200: '#E2D1FA',
          300: '#D0B5F7',
          400: '#BE99F4',
          500: '#AC7DF1',
          600: '#9333EA',
          700: '#7B2BC4',
          800: '#63239E',
          900: '#4B1B78',
        },
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
