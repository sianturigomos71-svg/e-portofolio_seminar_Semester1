/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ppg: {
          DEFAULT: '#1a3a6b',
          dark: '#102447',
          light: '#2c5494',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          soft: '#3a3a3a',
          muted: '#6b6b6b',
        },
        paper: {
          DEFAULT: '#fafaf8',
          warm: '#f5f4f0',
          card: '#ffffff',
        },
        line: {
          DEFAULT: '#d4d4d0',
          soft: '#e8e8e4',
        },
      },
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
      },
      fontSize: {
        body: ['17px', { lineHeight: '1.8' }],
      },
      maxWidth: {
        prose: '740px',
        editorial: '960px',
      },
    },
  },
  plugins: [],
};
