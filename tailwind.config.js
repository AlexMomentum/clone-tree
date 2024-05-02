// tailwind.config.js
const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tells Tailwind to consider all typical files used in a React project within the src directory
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#007bff', // Custom blue color
        'custom-gray': '#f6f6f6', // Custom gray color
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    forms, // Adds the Tailwind Forms plugin for better form styling
  ],
}
