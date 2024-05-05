/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(167, 139, 250, 1)',
        secondary: 'rgb(107, 138, 253)',
        textColor: 'rgb(156, 163, 175)'
      },
      backgroundColor: {
        themePrimary: 'rgb(19, 19, 19)',
        themeSecondary: 'rgb(32, 35, 41)',
        primary: 'rgba(167, 139, 250, 1)',
        secondary: 'rgb(46, 51, 61)',
        tertiary: 'rgb(107, 138, 253)'
      }
    }
  },
  daisyui: {
    themes: []
  },
  plugins: [require('daisyui')]
}
