import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#2872fa',                 // ✅ real brand blue
        surface: { DEFAULT: '#0f172a', soft: '#111827' },
        base: { bg: '#0b1020', fg: '#f3f4f6' }, // brighter default text
        border: '#1f2937',
        // brighter secondary text tokens
        text: {
          primary: '#f3f4f6',  // near-white
          secondary: '#d1d5db',// much brighter than before
          subtle: '#cbd5e1'
        }
      }
    }
  },
  plugins: [],
}
export default config

