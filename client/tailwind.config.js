/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: 'rgba(167, 139, 250, 1)'
            },
            backgroundColor: {
                primary: 'rgba(167, 139, 250, 1)'
            }
        }
    },
    daisyui: {
        themes: ['night']
    },
    plugins: [require('daisyui')]
}
