<template>
  <div class="flex flex-col justify-between h-screen">
    <the-header />
    <main class="container flex justify-center flex-1 min-w-full">
      <div class="w-full xl:max-w-7xl px-2.5 sm:px-5">
        <nuxt />
      </div>
    </main>
    <the-footer />
  </div>
</template>
