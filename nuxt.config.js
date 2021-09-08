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
  head: {
    htmlAttrs: {
      lang: 'en-GB',
    },
    title: 'Blog site',
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: process.env.BASE_URL,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    ],
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
};
