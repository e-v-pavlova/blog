<template>
  <div>
    <div>
      <all-categories />
      <paginated-articles
        pagination-route-name="blog-category-categorySlug-page-pageSlug"
        :articles-filter="{
          categoryName: category.name,
        }"
      />
    </div>
  </div>
</template>

<script>
import getMetadata from '@/utils/getMetadata';

export default {
  async asyncData({ $content, params }) {
    const categories = await $content('categories')
      .where({ slug: { $contains: params.categorySlug } })
      .limit(1)
      .fetch();
    const category = categories.length > 0 ? categories[0] : {};
    return {
      category,
    };
  },
  head() {
    return {
      title: `Blog: ${this.category.name}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog/category/${this.$route.params.categorySlug}`,
        },
      ],
      meta: this.metadata,
    };
  },
  computed: {
    metadata() {
      const meta = {
        title: `Blog: ${this.category.name}`,
        description: `Articles by category ${this.category.name}`,
        url: `${this.$config.baseUrl}/blog/category/${this.$route.params.categorySlug}`,
      };
      return getMetadata(meta, this.$config.baseUrl);
    },
  },
};
</script>
