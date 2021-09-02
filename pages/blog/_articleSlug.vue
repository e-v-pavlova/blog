<template>
  <div>
    <article>
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <p>Post was created: {{ formatDate(article.createdAt) }}</p>
      <p>Post last updated: {{ formatDate(article.updatedAt) }}</p>
      <span
        v-for="(category, index) in article.categories"
        :key="`category-${index}`"
      >
        <nuxt-link
          :to="{
            name: 'blog-category-categorySlug',
            params: { categorySlug: categories[category].slug },
          }"
        >
          <span>
            {{ categories[category].name }}
          </span>
        </nuxt-link>
      </span>
      <nuxt-content :document="article" />
    </article>
    <nav>
      <ul>
        <li
          v-for="link of article.toc"
          :key="link.id"
        >
          <nuxt-link
            :to="`#${link.id}`"
          >
            {{ link.text }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.articleSlug).fetch();
    const categoryList = await $content('categories')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.categories } })
      .fetch();
    const categories = Object.assign({}, ...categoryList.map((s) => ({ [s.name]: s })));
    return {
      article,
      categories,
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
