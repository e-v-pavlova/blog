<template>
  <div class="divide-y divide-gray-200">
    <div
      v-for="article of articles"
      :key="article.slug"
    >
      <nuxt-link
        :to="{ name: 'blog-articleSlug', params: { articleSlug: article.slug } }"
        class="flex flex-col py-5 cursor-pointer group lg:py-8 md:flex-row"
      >
        <div class="flex-shrink-0 mb-3 md:w-52 md:mb-0 sm:mb-6 lg:pt-1">
          <span class="text-sm text-gray-400 lg:text-base">
            {{ formatDate(article.createdAt) }}
          </span>
        </div>
        <div class="md:flex-grow">
          <h2 class="mb-2 text-gray-900 transition-colors group-hover:text-green-persian">
            {{ article.title }}
          </h2>
          <p class="leading-relaxed">
            {{ article.description }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-GB', options);
    },
  },
};
</script>
