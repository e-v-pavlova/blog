<template>
  <div>
    <article-list
      :articles="paginatedArticles"
    />
    <article-pagination
      v-if="lastPage > 1"
      :total="lastPage"
      :current="currentPage"
    />
  </div>
</template>

<script>
export default {
  name: 'PaginatedArticles',
  data: () => ({
    perPage: 5,
    allArticles: [],
    totalArticles: 0,
    currentPage: 1,
    lastPage: 1,
    skipNumber: 0,
    paginatedArticles: [],
  }),
  async fetch() {
    this.allArticles = await this.$content('articles').only(['categories']).fetch();
    this.mountData();
    this.paginatedArticles = await this.$content('articles')
      .only(['title', 'description', 'slug', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .limit(this.perPage)
      .skip(this.skipNumber)
      .fetch();
    this.checkForErrors();
  },
  methods: {
    mountData() {
      this.totalArticles = this.allArticles.length;
      if (this.$route.params.pageSlug) {
        this.currentPage = parseInt(this.$route.params.pageSlug, 10);
      }
      this.lastPage = Math.ceil(this.totalArticles / this.perPage);
      this.skipNumber = this.calculateSkipNumber();
    },
    calculateSkipNumber() {
      const modulo = this.totalArticles % this.perPage;
      const lastPageArticlesCount = modulo === 0 ? this.perPage : modulo;
      switch (this.currentPage) {
        case 1:
          return 0;
        case this.lastPage:
          return this.totalArticles - lastPageArticlesCount;
        default:
          return (this.currentPage - 1) * this.perPage;
      }
    },
    checkForErrors() {
      if (this.currentPage === 0
        || Number.isNaN(this.currentPage)
        || this.currentPage > this.lastPage
        || !this.paginatedArticles.length) {
        this.dispatchError();
      }
    },
    dispatchError() {
      return this.$nuxt.error({ statusCode: 404, message: 'No articles found' });
    },
  },
};
</script>
