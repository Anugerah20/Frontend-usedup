// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    flowbite.content()
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
        'primary': '#000000',
        'secondary': '#B7B7B7',
        'blue-link': '#0897D4',
        'btn-grey': '#A4A4A4',
        'shadow': '#ECECEC',
        'btn-search': '#EFEFEF',
        'check-green': '#32CD32',
        'check-red': '#FF0000',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}