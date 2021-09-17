<template>
  <div>
    <the-breadcrumbs :items="breadcrumbs" />
    <article>
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <p>Post was created: {{ formatDate(article.createdAt) }}</p>
      <p>Post last updated: {{ formatDate(article.updatedAt) }}</p>
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
    <share-buttons
      :url="`${$config.baseUrl}/blog/${$route.params.articleSlug}`"
      :title="article.title"
    />
    <prev-next
      :prev="prev"
      :next="next"
    />
  </div>
</template>

<script>
import getMetadata from '@/utils/getMetadata';

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.articleSlug).fetch();
    let categories;
    if (article.categories) {
      const categoryList = await $content('categories')
        .only(['name', 'slug'])
        .where({ name: { $containsAny: article.categories } })
        .fetch();
      categories = categoryList.map((obj) => ({ ...obj, url: `/blog/category/${obj.slug}` }));
    }
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.articleSlug)
      .fetch();
    return {
      article,
      categories,
      prev,
      next,
    };
  },
  head() {
    return {
      title: this.article.title,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog/${this.$route.params.articleSlug}`,
        },
      ],
      meta: [
        ...this.metadata,
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          property: 'article:tag',
          content: this.article.categories ? this.article.categories.toString() : '',
        },
      ],
    };
  },
  computed: {
    breadcrumbs() {
      const items = [
        {
          name: 'Blog',
          url: '/blog',
        },
      ];
      if (this.categories) {
        items.push({
          elems: this.categories,
        });
      }
      return items;
    },
    metadata() {
      const meta = {
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `${this.$config.baseUrl}/blog/${this.$route.params.articleSlug}`,
      };
      return getMetadata(meta, this.$config.baseUrl);
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
  },
};
</script>
