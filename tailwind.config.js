/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                twiceApricot: '#FEC194',
                twiceNeonMagenta: '#E0115F',
                hogwartsGold: '#C5A059',
                hogwartsWine: '#621021',
            }
        },
    },
    plugins: [],
}