<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Search articles"
      autocomplete="off"
    >
    <ul v-if="articles.length">
      <li
        v-for="article in articles"
        :key="article.slug"
      >
        <nuxt-link
          :to="{ name: 'blog-articleSlug', params: { articleSlug: article.slug } }"
        >
          <div>
            <p>{{ article.title }}</p>
            <p>{{ article.description }}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      articles: [],
    };
  },
  watch: {
    async searchQuery(searchQuery) {
      if (!searchQuery) {
        this.articles = [];
        return;
      }
      this.articles = await this.$content('articles')
        .limit(6)
        .search(searchQuery)
        .only(['title', 'description', 'slug'])
        .fetch();
    },
  },
};
</script>
