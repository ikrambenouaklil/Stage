/**

 */
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements-react/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'orange-brand': '#FF9500',
        'gray-brand': '#202224',
        'blue-brand': '#0095F6',
        'blue-sec-brand': '#1877F2',
        'gray-brand-background': '#EAECF0',
      },
    },
  },

  plugins: ['flowbite/plugin', require("tw-elements-react/dist/plugin.cjs")],
};
