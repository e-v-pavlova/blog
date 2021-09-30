<template>
  <div>
    <div>
      <all-categories />
      <paginated-articles />
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
