<!-- eslint-disable max-len -->
<template>
  <div>
    <a
      :href="`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`"
      title="Facebook"
      target="_blank"
    >
      <span>
        <svg
          width="11"
          height="20"
          viewBox="0 0 10.4 20"
          fill="inherit"
        >
          <path d="M6.7 20v-9.1h3.1l.5-3.6H6.7V5.1c0-1 .3-1.7 1.8-1.7h1.9V.1C10.1.1 8.9 0 7.6 0 4.9 0 3.1 1.7 3.1 4.7v2.6H0v3.6h3.1V20h3.6z" />
        </svg>
      </span>
    </a>
    <a
      :href="`https://twitter.com/share?url=${url}&text=${title}`"
      title="Twitter"
      target="_blank"
    >
      <span>
        <svg
          width="22"
          height="18"
          viewBox="0 0 22.1 18"
          fill="inherit"
        >
          <path d="M7 18c8.4 0 12.9-6.9 12.9-12.9v-.6c.9-.6 1.7-1.4 2.3-2.4-.8.4-1.7.6-2.6.7.9-.6 1.7-1.5 2-2.5-.9.5-1.9.9-2.9 1.1-.8-.9-2-1.4-3.3-1.4-2.5 0-4.5 2-4.5 4.5 0 .4 0 .7.1 1-3.8-.2-7.1-2-9.4-4.7-.4.7-.7 1.5-.7 2.3 0 1.6.8 3 2 3.8-.7 0-1.4-.2-2.1-.6v.1c0 2.2 1.6 4 3.6 4.5-.2 0-.6.1-1.1.1-.3 0-.6 0-.9-.1.6 1.8 2.3 3.1 4.2 3.2C5.2 15.3 3.2 16 1.1 16H0c2 1.2 4.4 2 7 2" />
        </svg>
      </span>
    </a>
    <a
      :href="`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`"
      title="LinkedIn"
      target="_blank"
    >
      <span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="inherit"
        >
          <path d="M.3 6.6h4.2V20H.3z" />
          <circle
            cx="2.4"
            cy="2.4"
            r="2.4"
          />
          <path d="M20 20h-4.2v-6.5c0-1.5 0-3.5-2.2-3.5s-2.5 1.7-2.5 3.4V20h-4V6.6h4v1.8h.1c.6-1.1 1.9-2.2 3.9-2.2 4.2 0 5 2.8 5 6.4V20z" />
        </svg>
      </span>
    </a>
    <a
      :href="`https://t.me/share/url?url=${url}&text=${title}`"
      title="Telegram"
      target="_blank"
    >
      <span>
        <svg
          width="20"
          height="17"
          viewBox="0 0 20 16.5"
          fill="inherit"
        >
          <style>.st0{opacity:.2}</style>
          <path
            class="st0"
            d="M17.2 2.1L5 7.8l-.1 1.6 2.2 6.1s.2.4.4.5h.1c.2 0 .5-.1.9-.6C9.9 14 11.2 13 11.2 13l-.2-.1c.7-.8 1.3-1.4 1.3-1.4l4.9-9.4z"
          />
          <path
            class="st0"
            d="M5 7.8l-.1 1.6 2.2 6.1s.2.4.4.5c-.2-.1-.1-.6-.1-.6l.4-4.4 3.2 1.9c.7-.8 1.3-1.4 1.3-1.4l4.9-9.4L5 7.8z"
          />
          <path d="M4.9 9.6L.4 8.1s-.5-.2-.4-.7c0-.1.1-.2.3-.3 1-.7 18.5-7 18.5-7s.5-.2.8-.1c.1.1.2.1.3.3v.8c-.1 1.7-3.3 14.6-3.3 14.6s-.2.8-.9.8c-.2 0-.6 0-.9-.4-1.3-1.2-6-4.3-7-5-.1 0-.1-.1-.1-.1 0-.1.1-.2.1-.2s8.1-7.2 8.3-7.9c0-.1 0-.1-.1-.1-.5.3-9.8 6.2-10.9 6.8h-.2z" />
        </svg>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
