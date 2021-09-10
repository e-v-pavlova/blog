<template>
  <div>
    <h1>
      All categories
    </h1>
    <ul>
      <li
        v-for="(category, index) in categories"
        :key="`category-${index}`"
      >
        <nuxt-link
          :to="{
            name: 'blog-category-categorySlug',
            params: { categorySlug: category.toLowerCase() },
          }"
        >
          {{ category }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import getMetadata from '@/utils/getMetadata';

export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['categories'])
      .fetch();
    const categories = [...new Set(articles.flatMap((article) => article.categories))];
    return {
      categories,
    };
  },
  head() {
    return {
      title: 'All categories',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog/category`,
        },
      ],
      meta: this.metadata,
    };
  },
  computed: {
    metadata() {
      const meta = {
        title: 'All categories',
        description: 'Categories of articles',
        url: `${this.$config.baseUrl}/blog/category`,
      };
      return getMetadata(meta, this.$config.baseUrl);
    },
  },
};
</script>
