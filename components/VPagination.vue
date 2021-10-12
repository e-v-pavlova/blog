<template>
  <div class="flex justify-center -mx-2 text-base text-gray-400">
    <nuxt-link
      :is="current <= 1 ? 'span' : 'nuxt-link'"
      :to="current <= 1
        ? undefined
        : { name: (routeName || $route.name), params: { pageSlug: current - 1 } }"
      :class="current <= 1
        ? 'cursor-default opacity-0'
        : 'hover:text-green-persian cursor-pointer'"
      class="flex items-center justify-center w-10 p-1 mx-2 item"
    >
      <svg
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
        class="w-5 h-5 feather feather-chevron-left"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
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
          class="p-1 mx-2 cursor-default item separator"
        >
          {{ separator }}
        </span>
      </template>
      <span
        v-else-if="current === index"
        :key="`page-${index}`"
        class="p-1 mx-2 font-bold text-black cursor-default item disabled current"
      >
        {{ index }}
      </span>
      <nuxt-link
        v-else
        :key="`page-${index}`"
        :to="{ name: (routeName || $route.name), params: { pageSlug: index } }"
        class="p-1 mx-2 transition-colors cursor-pointer item hover:text-green-persian"
      >
        {{ index }}
      </nuxt-link>
    </template>
    <nuxt-link
      :is="current >= total ? 'span' : 'nuxt-link'"
      :to="current >= total
        ? undefined
        : { name: (routeName || $route.name), params: { pageSlug: current + 1} }"
      :class="current >= total
        ? 'cursor-default opacity-0'
        : 'hover:text-green-persian cursor-pointer'"
      class="flex items-center justify-center w-10 p-1 mx-2 item"
    >
      <svg
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
        class="w-5 h-5 feather feather-chevron-right"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
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
