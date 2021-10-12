<template>
  <div>
    <all-tags class="md:pl-52" />
    <paginated-articles />
  </div>
</template>

<script>
import getMetadata from '@/utils/getMetadata';

export default {
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
