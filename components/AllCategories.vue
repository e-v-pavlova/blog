<template>
  <div>
    <nuxt-link
      to="/blog"
    >
      {{ `All (${totalArticles})` }}
    </nuxt-link>
    <nuxt-link
      v-for="category of categories"
      :key="`category-${category.name}`"
      :to="{
        name: 'blog-category-categorySlug',
        params: { categorySlug: category.slug }
      }"
    >
      {{ `${category.name} (${category.count})` }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'AllCategories',
  data: () => ({
    categories: [],
    totalArticles: 0,
  }),
  async fetch() {
    const articles = await this.$content('articles').only(['categories']).fetch();
    const categories = await this.$content('categories').only(['slug', 'name']).fetch();
    this.mountData(articles, categories);
  },
  methods: {
    mountData(articles, categories) {
    this.totalArticles = articles.length;
      const categoriesUsedInArticles = this.countCategoriesUsedInArticles(articles);
      this.categories = this.mountCategories(categories, categoriesUsedInArticles);
      this.sortCategories(this.categories);
    },
    countCategoriesUsedInArticles(articles) {
      return articles.reduce((acc, article) => {
        if (article.categories) {
          article.categories.forEach((category) => {
            acc[category.toLowerCase()] = (acc[category.toLowerCase()] || 0) + 1;
          });
        }
        return acc;
      }, {});
    },
    mountCategories(availableCategories, categoriesUsedInArticles) {
      return availableCategories
        .filter((category) => (
          Object.prototype.hasOwnProperty.call(categoriesUsedInArticles, category.name.toLowerCase())
        )).map((category) => {
          const mountedCategory = { ...category };
          mountedCategory.count = categoriesUsedInArticles[category.name.toLowerCase()];
          return mountedCategory;
        });
    },
    sortCategories(categories) {
      return categories.sort((a, b) => (a.count < b.count ? 1 : -1));
    },
  },
};
</script>
