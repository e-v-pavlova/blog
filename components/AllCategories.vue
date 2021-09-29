<template>
  <div>
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
  }),
  async fetch() {
    this.categories = await getAllCategories(this.$content);
  },
};
</script>
