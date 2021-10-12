<template>
  <div
    class="flex flex-row -mx-1 font-additional"
  >
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
        :class="item.disabled || !item.url ? '' : 'hover:text-green-persian transition-colors'"
        class="px-1 text-green-persian lg:text-current"
      >
        {{ item.name }}
      </nuxt-link>
      <span
        v-if="index !== items.length - 1"
        class="pr-1"
      >
        /
      </span>
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
