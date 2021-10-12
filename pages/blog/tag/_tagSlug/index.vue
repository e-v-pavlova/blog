<template>
  <div>
    <div>
      <all-tags class="md:pl-52" />
      <paginated-articles
        pagination-route-name="blog-tag-tagSlug-page-pageSlug"
        :articles-filter="{
          tagName: tag.name,
        }"
      />
    </div>
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
      title: `Blog: ${this.tag.name}`,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.baseUrl}/blog/tag/${this.$route.params.tagSlug}`,
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
        url: `${this.$config.baseUrl}/blog/tag/${this.$route.params.tagSlug}`,
      };
      return getMetadata(meta, this.$config.baseUrl);
    },
  },
};
</script>
