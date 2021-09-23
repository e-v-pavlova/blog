<template>
  <div>
    <div
      v-for="category of categories"
      :key="`category-${category.name}`"
    >
      <nuxt-link
        :to="{
          name: 'blog-category-categorySlug',
          params: { categorySlug: category.slug }
        }"
      >
        <div>
          {{ `${category.name} (${category.count})` }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
