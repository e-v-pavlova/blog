export default function sitemapRouteGenerator() {
  this.nuxt.hook('generate:done', (context) => {
    const routes = Array.from(context.generatedRoutes);
    this.nuxt.options.sitemap.routes = [...routes];
  });
}
