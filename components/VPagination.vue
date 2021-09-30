<template>
  <div class="pagination">
    <nuxt-link
      :is="current <= 1 ? 'span' : 'nuxt-link'"
      :to="current <= 1
        ? undefined
        : { name: (routeName || $route.name), params: { pageSlug: current - 1 } }"
    >
      Prev
    </nuxt-link>
    <template
      v-for="index in total"
    >
      <template
        v-if="index !== 1
          && index !== total
          && (index < current - offset || index > current + offset)
          && !(index === 2 && current === 3 + offset)
          && !(index === total - 1 && current === total - (2 + offset))
        "
      >
        <span
          v-show="Math.abs(current - index) === offset + 1"
          :key="`page-${index}`"
          class="item separator"
        >
          {{ separator }}
        </span>
      </template>
      <span
        v-else-if="current === index"
        :key="`page-${index}`"
        class="item disabled current"
      >
        {{ index }}
      </span>
      <nuxt-link
        v-else
        :key="`page-${index}`"
        class="item"
        :to="{ name: (routeName || $route.name), params: { pageSlug: index } }"
      >
        {{ index }}
      </nuxt-link>
    </template>
    <nuxt-link
      :is="current >= total ? 'span' : 'nuxt-link'"
      :to="current >= total
        ? undefined
        : { name: (routeName || $route.name), params: { pageSlug: current + 1} }"
    >
      Next
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 0,
    },
    separator: {
      type: String,
      default: '...',
    },
    offset: {
      type: Number,
      default: 1,
    },
    routeName: {
      type: String,
      default: '',
    },
  },
};
</script>
