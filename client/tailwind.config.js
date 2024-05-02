/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(167, 139, 250, 1)',
        secondary: 'rgb(107, 138, 253)'
      },
      backgroundColor: {
        themePrimary: 'rgb(19, 19, 19)',
        themeSecondary: 'rgb(32, 35, 41)',
        primary: 'rgba(167, 139, 250, 1)',
        secondary: 'rgb(46, 51, 61)'
      }
    }
  },
  daisyui: {
    themes: []
  },
  plugins: [require('daisyui')]
}
