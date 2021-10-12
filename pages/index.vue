<template>
  <div>
    <div>
      <all-tags class="md:pl-52" />
      <paginated-articles
        pagination-route-name="blog-page-pageSlug"
      />
    </div>
  </div>
</template>

<script>
import getMetadata from '@/utils/getMetadata';

export default {
  head() {
    return {
      title: 'Blog',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: this.$config.baseUrl,
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
      };
      return getMetadata(meta, this.$config.baseUrl);
    },
  },
};
</script>
