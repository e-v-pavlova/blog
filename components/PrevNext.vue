<template>
  <div>
    <nuxt-link
      v-if="prev"
      :to="{ name: 'blog-articleSlug', params: { articleSlug: prev.slug } }"
    >
      {{ prev.title }}
    </nuxt-link>
    <span v-else>&nbsp;</span>
    <nuxt-link
      v-if="next"
      :to="{ name: 'blog-articleSlug', params: { articleSlug: next.slug } }"
    >
      {{ next.title }}
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
