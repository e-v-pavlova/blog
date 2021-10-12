module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      primary: ['Lato', 'sans-serif'],
      secondary: ['Vollkorn', 'sans-serif'],
      additional: ['Ubuntu', 'sans-serif'],
  },
    extend: {
      colors: {
        'green-persian': '#00a693',
      },
    },
  },
  variants: {},
  plugins: [],
};
