<template>
  <div>
    <div
      v-for="(item, index) in items"
      :key="`breadcrumb-${index}`"
    >
      <div
        v-if="item.multiple"
      >
        <link-set
          :items="item.elems"
        />
      </div>
      <div
        v-else-if="item.disabled || !item.url"
      >
        {{ item.name }}
      </div>
      <nuxt-link
        v-else
        :to="item.url"
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
