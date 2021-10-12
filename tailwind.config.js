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
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#00a693',
              textDecoration: 'none',
              '&:hover': {
                color: '#00a693',
                textDecoration: 'underline',
              },
            },
          },
        },
      },
      width: {
        content: '37.7rem',
        'content-lg': '42.4rem',
        'toc-lg': '23rem',
        'content-plus-toc': '65.4rem',
      },
    },
  },
  variants: {},
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/typography'),
  ],
};
