<template>
  <div
    class="my-3 lg:my-8 flex flex-wrap -m-1.5 font-additional text-black text-base"
  >
    <span
      v-if="currentTag === 'All'"
      :class="getTagStyles(true)"
    >
      {{ `All (${totalArticles})` }}
    </span>
    <nuxt-link
      v-else
      to="/blog"
      :class="getTagStyles(false)"
    >
      {{ `All (${totalArticles})` }}
    </nuxt-link>
    <template
      v-for="tag of tags"
    >
      <span
        v-if="currentTag === tag.slug"
        :key="`tag-${tag.name}`"
        :class="getTagStyles(true)"
      >
        {{ `${tag.name} (${tag.count})` }}
      </span>
      <nuxt-link
        v-else
        :key="`tag-${tag.name}`"
        :to="{
          name: 'blog-tag-tagSlug',
          params: { tagSlug: tag.slug }
        }"
        :class="getTagStyles(false)"
      >
        {{ `${tag.name} (${tag.count})` }}
      </nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AllTags',
  data: () => ({
    tags: [],
    totalArticles: 0,
    currentTag: '',
  }),
  async fetch() {
    const articles = await this.$content('articles').only(['lowercaseTags']).fetch();
    const tags = await this.$content('tags').only(['slug', 'name']).fetch();
    this.mountData(articles, tags);
  },
  methods: {
    mountData(articles, tags) {
      this.totalArticles = articles.length;
      const tagsUsedInArticles = this.countTagsUsedInArticles(articles);
      this.tags = this.mountTags(tags, tagsUsedInArticles);
      this.sortTags(this.tags);
      this.currentTag = this.$route.params.tagSlug ? this.$route.params.tagSlug : 'All';
    },
    countTagsUsedInArticles(articles) {
      return articles.reduce((acc, article) => {
        if (article.lowercaseTags) {
          article.lowercaseTags.forEach((tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
          });
        }
        return acc;
      }, {});
    },
    mountTags(availableTags, tagsUsedInArticles) {
      return availableTags
        .filter((tag) => (
          Object.prototype.hasOwnProperty.call(tagsUsedInArticles, tag.name.toLowerCase())
        )).map((tag) => {
          const mountedTag = { ...tag };
          mountedTag.count = tagsUsedInArticles[tag.name.toLowerCase()];
          return mountedTag;
        });
    },
    sortTags(tags) {
      return tags.sort((a, b) => (a.count < b.count ? 1 : -1));
    },
    getTagStyles(tagIsCurrent) {
      const styles = tagIsCurrent ? 'bg-gray-900 border-gray-900 text-white cursor-default' : 'cursor-pointer';
      return `${styles} cursor-pointer px-3 py-1.5 m-1.5 border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors`;
    },
  },
};
</script>
