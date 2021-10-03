<template>
  <div>
    <span
      v-if="currentTag === 'All'"
    >
      {{ `All (${totalArticles})` }}
    </span>
    <nuxt-link
      v-else
      to="/blog"
    >
      {{ `All (${totalArticles})` }}
    </nuxt-link>
    <template
      v-for="tag of tags"
    >
      <span
        v-if="currentTag === tag.slug"
        :key="`tag-${tag.name}`"
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
    currentTag: 'All',
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
  },
};
</script>
