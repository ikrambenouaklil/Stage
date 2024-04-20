
const flowbite = require('flowbite-react/tailwind');
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        'orange-brand': '#fbbb76',
        'blue-brand': '#0095F6',
        'blue-sec-brand': '#1877F2',
      },
    },
  },

  plugins: [flowbite.plugin()],
};
