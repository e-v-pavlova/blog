<template>
  <div>
    <the-header />
    <div
      v-for="article in articles"
      :key="article.slug"
    >
      <nuxt-link
        :to="{ name:'blog-articleSlug', params: { articleSlug: article.slug } }"
      >
        <div>
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch();
    return {
      articles,
    };
  },
  head() {
    return {
      title: 'Blog',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog`,
        },
      ],
    };
  },
};
</script>
