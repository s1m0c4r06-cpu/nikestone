/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0c2135',
        'ink-2': '#1A3A4A',
        teal: '#1A6B7C',
        bone: '#f5f1ea',
        'bone-2': '#ede7dc',
        paper: '#fbfaf7',
        stone: '#8a8780',
        'stone-2': '#6a6862',
        line: '#dcd6cb',
        'line-2': '#c6bfb1',
        accent: '#c4a572',
        'accent-2': '#9d8350',
        ok: '#3a7d4a',
        err: '#a02828',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Inter', 'sans-serif'],
      },
      maxWidth: { container: '1280px' },
      transitionTimingFunction: {
        curtain: 'cubic-bezier(.16,1,.3,1)',
        base: 'cubic-bezier(.4,0,.2,1)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(12,33,53,.06),0 8px 24px rgba(12,33,53,.06)',
        lift: '0 4px 12px rgba(12,33,53,.1),0 24px 60px rgba(12,33,53,.12)',
      },
    },
  },
  plugins: [],
};
