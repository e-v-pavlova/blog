<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="`breadcrumb-${index}`"
    >
      <div
        v-if="item.elems && Array.isArray(item.elems)"
      >
        <link-set
          :items="item.elems"
        />
      </div>
      <nuxt-link
        :is="item.disabled || !item.url ? 'div' : 'nuxt-link' "
        v-else-if="item.name"
        :to="item.disabled || !item.url ? undefined : item.url"
      >
        {{ item.name }}
      </nuxt-link>
    </div>
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
