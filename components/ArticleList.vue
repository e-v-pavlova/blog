<template>
  <div>
    <div
      v-for="article of articles"
      :key="article.slug"
    >
      <nuxt-link
        :to="{ name: 'blog-articleSlug', params: { articleSlug: article.slug } }"
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
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
