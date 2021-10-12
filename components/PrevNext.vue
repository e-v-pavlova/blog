<template>
  <div class="flex flex-col justify-between lg:flex-row">
    <nuxt-link
      v-if="prev"
      :to="{ name: 'blog-articleSlug', params: { articleSlug: prev.slug } }"
      class="pr-3 my-2 group"
    >
      <div class="text-base text-gray-400">
        &lt; Previous Post
      </div>
      <div
        class="transition-colors text-green-persian lg:text-current group-hover:text-green-persian"
      >
        {{ prev.title }}
      </div>
    </nuxt-link>
    <span v-else>&nbsp;</span>
    <nuxt-link
      v-if="next"
      :to="{ name: 'blog-articleSlug', params: { articleSlug: next.slug } }"
      class="pl-3 my-2 text-right group"
    >
      <div class="text-base text-gray-400">
        Next Post &gt;
      </div>
      <div
        class="transition-colors text-green-persian lg:text-current group-hover:text-green-persian"
      >
        {{ next.title }}
      </div>
    </nuxt-link>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
};
</script>
