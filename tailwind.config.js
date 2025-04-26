/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {colors:{
      'primary': '#27AAE1',
      'secondary': '#FF9237',
      'success': '#05B313',
      'warning': '#FBBD23',
      'error': '#E73E3E'
    },},
  },
  plugins: [],
}
