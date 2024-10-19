const colors = require('tailwindcss/colors')

const customColors = {
  blue: {
    50: '#DEEBFF',
    100: '#B3D4FF',
    200: '#4C9AFF',
    300: '#2684FF',
    400: '#0065FF',
    500: '#0052CC',
    600: '#0747A6'
    // 700: '#000000',
    // 800: '#000000',
    // 900: '#000000'
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
    extend: {
      transitionProperty: {
        height: 'height',
        minheight: 'min-height',
        display: 'display',
        spacing: 'margin, padding'
      }
    }
  },
  plugins: []
}
