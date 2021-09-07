export default {
  target: 'static',
  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],
  buildModules: [
    '@/modules/sitemapRouteGenerator',
  ],
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-vs.css',
      },
    },
  },
  components: true,
  sitemap: {
    hostname: process.env.BASE_URL,
  },
};
