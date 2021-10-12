<template>
  <header class="container flex justify-center min-w-full">
    <div class="px-2.5 sm:px-5 py-2.5 flex-1 flex items-center justify-between md:max-w-7xl">
      <div class="flex items-center">
        <nuxt-link
          to="/"
        >
          <svg
            width="13.229mm"
            height="13.229mm"
            viewBox="0 0 13.229 13.229"
          >
            <g transform="translate(-107.91 -127.48)">
              <circle
                cx="114.53"
                cy="134.09"
                r="6.6146"
                fill="#aeff00"
                opacity=".74522"
                style="paint-order:normal"
              />
            </g>
          </svg>
        </nuxt-link>
        <div class="pl-2.5 font-additional font-bold text-lg text-black">
          Blog
        </div>
      </div>
      <social-buttons />
    </div>
  </header>
</template>
