const colors = require('tailwindcss/colors')

const customColors = {
  blue: {
    50: '#e3f2fe',
    100: '#bbdefd',
    200: '#8fcafc',
    300: '#61b5fa',
    400: '#3ca5fa',
    500: '#1396f8',
    600: '#1388ea',
    700: '#1076d7',
    800: '#0d65c5',
    900: '#0747a6'
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      ...customColors,
      primary: customColors.blue
    },
    extend: {}
  },
  plugins: []
}
