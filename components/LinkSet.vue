<template>
  <div>
    <nuxt-link
      :is="item.url ? 'nuxt-link' : 'div'"
      v-for="(item, index) in items"
      :key="`link-${index}`"
      :to="item.url ? item.url : undefined"
    >
      {{ item.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
