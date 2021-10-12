<template>
  <div
    class="flex flex-row"
  >
    <nuxt-link
      :is="item.url ? 'nuxt-link' : 'div'"
      v-for="(item, index) in items"
      :key="`link-${index}`"
      :to="item.url ? item.url : undefined"
      :class="item.url ? 'hover:text-green-persian transition-colors' : ''"
      class="px-1 text-green-persian lg:text-current"
    >
      {{ `${item.name}${index !== items.length - 1 ? ',' : ''}` }}
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
