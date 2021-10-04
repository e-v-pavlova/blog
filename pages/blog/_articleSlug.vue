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
    let tags;
    if (article.tags) {
      const tagList = await $content('tags')
        .only(['name', 'slug'])
        .fetch();
      tags = tagList.filter((tag) => (
        (article.lowercaseTags || article.tags).indexOf(tag.name.toLowerCase()) !== -1
      )).map((obj) => ({ ...obj, url: `/blog/tag/${obj.slug}` }));
    }
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.articleSlug)
      .fetch();
    return {
      article,
      tags,
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
          content: this.article.tags ? this.article.tags.toString() : '',
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
      if (this.tags) {
        items.push({
          elems: this.tags,
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
