<template>
  <div>
    <all-tags class="md:pl-52" />
    <paginated-articles
      :articles-filter="{
        tagName: tag.name,
      }"
    />
  </div>
</template>

<script>
import getMetadata from '@/utils/getMetadata';

export default {
  async asyncData({ $content, params }) {
    const tags = await $content('tags')
      .where({ slug: { $contains: params.tagSlug } })
      .limit(1)
      .fetch();
    const tag = tags.length > 0 ? tags[0] : {};
    return {
      tag,
    };
  },
  head() {
    return {
      title: `Blog: ${this.tag.name}, page ${this.$route.params.pageSlug}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog/tag/${this.$route.params.tagSlug}/page/${this.$route.params.pageSlug}`,
        },
      ],
      meta: this.metadata,
    };
  },
  computed: {
    metadata() {
      const meta = {
        title: `Blog: ${this.tag.name}`,
        description: `Articles by tag ${this.tag.name}`,
        url: `${this.$config.baseUrl}/blog/tag/${this.$route.params.tagSlug}/page/${this.$route.params.pageSlug}`,
      };
      return getMetadata(meta, this.$config.baseUrl);
    },
  },
};
</script>
