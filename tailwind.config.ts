import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#1A1A1A',
          secondary: '#2D2D2D',
          accent: '#4ECDC4',
          highlight: '#FF6B6B',
          text: '#E5E5E5',
          muted: '#A0A0A0',
        },
        light: {
          primary: '#FDFCDC',
          secondary: '#F5F4D9',
          accent: '#1A535C',
          highlight: '#4ECDC4',
          text: '#2D2D2D',
          muted: '#666666',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            a: {
              color: 'var(--tw-prose-links)',
              '&:hover': {
                color: 'var(--tw-prose-links-hover)',
              },
            },
            h1: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'transparent',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'transparent',
              overflowX: 'auto',
              fontWeight: '400',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: '0.875em',
              color: 'inherit',
              fontFamily: 'inherit',
            }
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config 
