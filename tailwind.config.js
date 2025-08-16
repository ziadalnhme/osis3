/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['Noor', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
