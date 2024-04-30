const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line tells Tailwind to look for any type of file React might use within the src directory
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#007bff', // Example custom color
        'custom-gray': '#f6f6f6', // Another custom color
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    forms, // You already required it at the top
  ],
}
