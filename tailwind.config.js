/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-breadcrumb': '#A4A4A4',
        'gray-breadcrumb-secondary': '#B7B7B7',
        'blue-breadcrumb': '#00659E',
        'white-breadcrumb': '#FFFFFF',
        'black-breadcrumb': '#000000',
        'black-breadcrumb-secondary': '#393939',
        'input-gray': '#ECECEC',
      }
    },
  },
  plugins: [],
}

