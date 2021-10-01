<template>
  <div>
    <span
      v-if="currentCategory === 'All'"
    >
      {{ `All (${totalArticles})` }}
    </span>
    <nuxt-link
      v-else
      to="/blog"
    >
      {{ `All (${totalArticles})` }}
    </nuxt-link>
    <template
      v-for="category of categories"
    >
      <span
        v-if="currentCategory === category.slug"
        :key="`category-${category.name}`"
      >
        {{ `${category.name} (${category.count})` }}
      </span>
      <nuxt-link
        v-else
        :key="`category-${category.name}`"
        :to="{
          name: 'blog-category-categorySlug',
          params: { categorySlug: category.slug }
        }"
      >
        {{ `${category.name} (${category.count})` }}
      </nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AllCategories',
  data: () => ({
    categories: [],
    totalArticles: 0,
    currentCategory: 'All',
  }),
  async fetch() {
    const articles = await this.$content('articles').only(['case_insensitive__categories']).fetch();
    const categories = await this.$content('categories').only(['slug', 'name']).fetch();
    this.mountData(articles, categories);
  },
  methods: {
    mountData(articles, categories) {
      this.totalArticles = articles.length;
      const categoriesUsedInArticles = this.countCategoriesUsedInArticles(articles);
      this.categories = this.mountCategories(categories, categoriesUsedInArticles);
      this.sortCategories(this.categories);
      this.currentCategory = this.$route.params.categorySlug ? this.$route.params.categorySlug : 'All';
    },
    countCategoriesUsedInArticles(articles) {
      return articles.reduce((acc, article) => {
        if (article.case_insensitive__categories) {
          article.case_insensitive__categories.forEach((category) => {
            acc[category] = (acc[category] || 0) + 1;
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
