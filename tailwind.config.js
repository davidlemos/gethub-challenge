/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: 'Nunito, sans-serif'
      }      
    },
  },
  plugins: [
  require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
