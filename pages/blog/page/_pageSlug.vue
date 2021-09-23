<template>
  <div>
    <category-list
      :categories="categories"
    />
    <article-list
      :articles="articles"
    />
    <article-pagination
      v-if="lastPage > 1"
      :total="lastPage"
      :current="currentPage"
    />
  </div>
</template>

<script>
import getPageContent from '@/utils/getPageContent';
import getMetadata from '@/utils/getMetadata';

export default {
  async asyncData({ $content, params, error }) {
    const currentPage = parseInt(params.pageSlug, 10);
    const pageContent = await getPageContent($content, currentPage, error);
    return {
      currentPage,
      lastPage: pageContent.lastPage,
      articles: pageContent.paginatedArticles,
      categories: pageContent.mountedCategories,
    };
  },
  head() {
    return {
      title: `Blog page ${this.$route.params.pageSlug}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog/page/${this.$route.params.pageSlug}`,
        },
      ],
      meta: this.metadata,
    };
  },
  computed: {
    metadata() {
      const meta = {
        title: `Blog page ${this.$route.params.pageSlug}`,
        description: 'List of articles',
        url: `${this.$config.baseUrl}/blog/page/${this.$route.params.pageSlug}`,
      };
      return getMetadata(meta, this.$config.baseUrl);
    },
  },
};
</script>
