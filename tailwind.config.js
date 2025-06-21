/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.svg',
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-blue': '#130562',
      },
    },
  },
  plugins: [],
};