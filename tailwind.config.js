/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-white': '#FFFFFF',
        'primary-yellow': '#FFD700', // Gold color
        'primary-black': '#000000',
        'accent-red': '#FF0000', // For CTAs and important accents
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern sans-serif
        // You can add more font families here if needed
      },
      spacing: {
        'section-padding': '80px', // Custom padding for sections
      }
    },
  },
  plugins: [],
}