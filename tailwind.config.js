/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'secondary': '#B7B7B7',
        'blue-link': '#00659E',
      }
    },
  },
  plugins: [],
}

