/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif:      ['"Noto Serif KR"', 'serif'],
        sans:       ['"Pretendard"', '"Noto Sans KR"', 'sans-serif'],
        arabic:     ['"Noto Naskh Arabic"', 'serif'],
        hebrew:     ['"Noto Serif Hebrew"', 'serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
        japanese:   ['"Noto Serif JP"', 'serif'],
      },
      colors: {
        ink: {
          50:  '#f7f5f0',
          100: '#ede8de',
          200: '#d6ccb8',
          300: '#b8a98e',
          400: '#9a8566',
          500: '#7d6748',
          600: '#65512e',
          700: '#4e3d20',
          800: '#372a14',
          900: '#1f170a',
          950: '#0f0a05',
        },
        gold: {
          400: '#d4a843',
          500: '#b8931e',
        }
      }
    },
  },
  plugins: [],
}
