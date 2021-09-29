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
import getAllCategories from '@/utils/getAllCategories';

export default {
  name: 'AllCategories',
  data: () => ({
    categories: [],
    totalArticles: 0,
  }),
  async fetch() {
    const articles = await this.$content('articles').only(['categories']).fetch();
    const categories = await this.$content('categories').only(['slug', 'name']).fetch();
    this.totalArticles = articles.length;
    this.categories = getAllCategories(articles, categories);
  },
};
</script>
