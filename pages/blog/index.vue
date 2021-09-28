<template>
  <div>
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
  </div>
</template>

<script>
import getMetadata from '@/utils/getMetadata';
import getPageContent from '@/utils/getPageContent';
import getAllCategories from '@/utils/getAllCategories';

export default {
  async asyncData({ $content, error }) {
    const currentPage = 1;
    const pageContent = await getPageContent($content, currentPage, error);
    const categories = await getAllCategories($content);
    return {
      currentPage,
      lastPage: pageContent.lastPage,
      articles: pageContent.paginatedArticles,
      categories,
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
      meta: this.metadata,
    };
  },
  computed: {
    metadata() {
      const meta = {
        title: 'Blog',
        description: 'List of articles',
        url: `${this.$config.baseUrl}/blog`,
      };
      return getMetadata(meta, this.$config.baseUrl);
    },
  },
};
</script>
