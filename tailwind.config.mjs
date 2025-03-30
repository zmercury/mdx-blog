import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
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
        },
        ui: {
          teal: '#1A535C',
          cyan: '#4ECDC4',
          coral: '#FF6B6B',
          purple: '#6a4c93',
          orange: '#ee964b',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            a: {
              color: 'var(--tw-prose-links)',
              '&:hover': {
                color: '#4ECDC4',
              },
            },
            h1: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
              marginBottom: '1.5em',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              marginTop: '1.25em',
              marginBottom: '0.75em',
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600',
            },
            code: {
              color: 'var(--tw-prose-code)',
              backgroundColor: 'rgba(26, 83, 92, 0.1)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontSize: '0.875em',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              color: 'var(--tw-prose-pre)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '1.5em',
              borderRadius: '0.75em',
              overflowX: 'auto',
              border: '1px solid rgba(0, 0, 0, 0.03)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: '0.875em',
              color: 'inherit',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            ':root': {
              '--tw-prose-pre': '#2D2D2D',
              '--tw-prose-pre-bg': '#F5F4D9',
            },
            '.dark': {
              '--tw-prose-pre': '#E5E5E5',
              '--tw-prose-pre-bg': '#2D2D2D',
            },
            p: {
              color: 'var(--tw-prose-body)',
              marginTop: '1em',
              marginBottom: '1em',
              lineHeight: '1.75',
            },
            li: {
              color: 'var(--tw-prose-body)',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            blockquote: {
              borderLeftColor: 'rgba(0, 0, 0, 0.05)',
              color: 'var(--tw-prose-quotes)',
              fontStyle: 'italic',
              paddingLeft: '1em',
            },
            ul: {
              marginTop: '1em',
              marginBottom: '1em',
              paddingLeft: '1.5em',
            },
            ol: {
              marginTop: '1em',
              marginBottom: '1em',
              paddingLeft: '1.5em',
            },
            hr: {
              marginTop: '2em',
              marginBottom: '2em',
              borderColor: 'rgba(0, 0, 0, 0.03)',
            },
            table: {
              width: '100%',
              marginTop: '1em',
              marginBottom: '1em',
              borderCollapse: 'collapse',
            },
            th: {
              padding: '0.5em',
              borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
              fontWeight: '600',
            },
            td: {
              padding: '0.5em',
              borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
            },
            // Prism.js styles for light mode
            '.light .token.comment': { color: '#6e7f8e' },
            '.light .token.prolog': { color: '#6e7f8e' },
            '.light .token.doctype': { color: '#6e7f8e' },
            '.light .token.cdata': { color: '#6e7f8e' },
            '.light .token.punctuation': { color: '#4a5568' },
            '.light .token.property': { color: '#0550ae' },
            '.light .token.tag': { color: '#116329' },
            '.light .token.boolean': { color: '#1a5f7a' },
            '.light .token.number': { color: '#1a5f7a' },
            '.light .token.constant': { color: '#0550ae' },
            '.light .token.symbol': { color: '#1a5f7a' },
            '.light .token.selector': { color: '#6b2e85' },
            '.light .token.attr-name': { color: '#8a4600' },
            '.light .token.string': { color: '#6b2e85' },
            '.light .token.char': { color: '#6b2e85' },
            '.light .token.builtin': { color: '#1a5f7a' },
            '.light .token.operator': { color: '#4a5568' },
            '.light .token.entity': { color: '#1a5f7a' },
            '.light .token.url': { color: '#0550ae' },
            '.light .token.variable': { color: '#0550ae' },
            '.light .token.keyword': { color: '#1a5f7a' },

            // Keep the dark mode Prism.js styles as they are
            '.token.comment': { color: '#6a9955' },
            '.token.prolog': { color: '#6a9955' },
            '.token.doctype': { color: '#6a9955' },
            '.token.cdata': { color: '#6a9955' },
            '.token.punctuation': { color: '#d4d4d4' },
            '.token.property': { color: '#9cdcfe' },
            '.token.tag': { color: '#569cd6' },
            '.token.boolean': { color: '#b5cea8' },
            '.token.number': { color: '#b5cea8' },
            '.token.constant': { color: '#9cdcfe' },
            '.token.symbol': { color: '#b5cea8' },
            '.token.deleted': { color: '#ce9178' },
            '.token.selector': { color: '#d7ba7d' },
            '.token.attr-name': { color: '#9cdcfe' },
            '.token.string': { color: '#ce9178' },
            '.token.char': { color: '#d7ba7d' },
            '.token.builtin': { color: '#d7ba7d' },
            '.token.inserted': { color: '#b5cea8' },
            '.token.operator': { color: '#d4d4d4' },
            '.token.entity': { color: '#dd6e42' },
            '.token.url': { color: '#9cdcfe' },
            '.token.variable': { color: '#9cdcfe' },
            '.token.keyword': { color: '#569cd6' },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}

export default config 
