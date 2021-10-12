<template>
  <div class="flex flex-col">
    <div class="max-w-full pt-4 w-content-plus-toc lg:ml-auto">
      <the-breadcrumbs :items="breadcrumbs" />
      <h1 class="mb-3 text-black lg:mb-4 mt-7 lg:mt-10">
        {{ article.title }}
      </h1>
      <div class="mt-3 mb-6 text-sm text-gray-500 lg:mb-8">
        <span
          v-if="article.createdAt"
        >
          Posted on {{ formatDate(article.createdAt) }}
        </span>
        <span
          v-if="article.updatedAt"
        >
          • Updated on {{ formatDate(article.updatedAt) }}
        </span>
      </div>
      <p class="text-base text-gray-700 lg:text-xl lg:pb-5">
        {{ article.description }}
      </p>
    </div>
    <div class="relative flex-row justify-end lg:flex">
      <div class="w-full lg:order-2 lg:w-toc-lg lg:pl-16 xl:pl-24 lg:pt-2">
        <table-of-content
          :toc="article.toc"
        />
      </div>
      <article class="max-w-full prose w-content lg:w-content-lg lg:prose-lg lg:order-1">
        <nuxt-content :document="article" />
      </article>
    </div>
    <share-buttons
      :url="`${$config.baseUrl}/blog/${$route.params.articleSlug}`"
      :title="article.title"
      class="my-3 ml-auto"
    />
    <div class="mb-10 lg:mb-14 mt-7">
      <prev-next
        :prev="prev"
        :next="next"
      />
    </div>
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
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-GB', options);
    },
  },
};
</script>
