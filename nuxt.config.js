export default {
  target: 'static',
  modules: [
    '@nuxt/content',
  ],
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-vs.css',
      },
    },
  },
  components: true,
};
