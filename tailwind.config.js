const colors = require('tailwindcss/colors')

const customColors = {
  blue: {
    50: '#DEEBFF',
    100: '#4C9AFF',
    200: '#2684FF',
    300: '#0065FF',
    400: '#0052CC',
    500: '#0747A6',
    600: '#003E8A',
    700: '#003066',
    800: '#00224D',
    900: '#001637'
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
