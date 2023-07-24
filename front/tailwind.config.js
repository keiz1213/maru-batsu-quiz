/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        bash: '#01F941',
        'mac-finder-side': '#D0C8C7',
        'mac-finder-top': '#FAF2F1',
        'my-blue': '#1095FF',
        'my-red': '#E93342'
      }
    }
  },
  plugins: [require('daisyui')]
}
