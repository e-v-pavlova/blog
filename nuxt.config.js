import getMetadata from './utils/getMetadata';

const metadata = getMetadata(undefined, process.env.BASE_URL);

export default {
  target: 'static',
  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
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
    meta: [
      ...metadata,
      {
        charset: 'utf-8',
      },
      {
        name: 'HandheldFriendly',
        content: 'True',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        property: 'og:site_name',
        content: 'Nuxt blog',
      },
      {
        property: 'og:image:width',
        content: '968',
      },
      {
        property: 'og:image:height',
        content: '504',
      },
      {
        name: 'twitter:site',
        content: '@username',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
  generate: {
    fallback: '404.html',
    subFolders: false,
  },
};
