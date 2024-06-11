/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './storage/framework/views/*.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
],
  theme: {
    extend: {
        colors: {
            'logo-color': '#0c2840',
          }
    },
  },
  plugins: [],
}

