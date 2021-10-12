<template>
  <div class="my-10 text-black lg:pl-52">
    <h1
      v-if="error.statusCode === 404"
      class="my-5 lg:my-16"
    >
      404: Page not found
    </h1>
    <h1
      v-else
    >
      An error occurred
    </h1>
    <nuxt-link
      to="/"
      class="mt-20 transition-colors text-green-persian hover:text-green-persian lg:text-gray-700"
    >
      Go to Home page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
};
</script>
