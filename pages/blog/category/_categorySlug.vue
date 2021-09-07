<template>
  <div>
    <h1>
      {{ category.name }}
    </h1>
    <nuxt-content :document="category" />
    <div>
      <h3>
        Articles by category {{ category.name }}:
      </h3>
      <ul>
        <li
          v-for="article in articles"
          :key="article.slug"
        >
          <nuxt-link
            :to="{ name: 'blog-articleSlug', params: { articleSlug: article.slug } }"
          >
            <div>
              <h2>
                {{ article.title }}
              </h2>
              <p>{{ article.description }}</p>
              <p>
                {{ formatDate(article.updatedAt) }}
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const categories = await $content('categories')
      .where({ slug: { $contains: params.categorySlug } })
      .limit(1)
      .fetch();
    const category = categories.length > 0 ? categories[0] : {};
    const articles = await $content('articles')
      .where({ categories: { $contains: category.name } })
      .sortBy('createdAt', 'asc')
      .fetch();
    return {
      articles,
      category,
    };
  },
  head() {
    return {
      title: `Category: ${this.$route.params.categorySlug}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog/category/${this.$route.params.categorySlug}`,
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
  },
};
</script>
