<template>
  <div class="relative w-full h-full text-base leading-6">
    <nav
      ref="toc"
      :class="isFixed ? 'lg:fixed' : 'lg:absolute'"
      class="lg:py-1.5"
    >
      <ul>
        <li
          v-for="(item, index) of toc"
          :key="item.id"
          :class="index === indexOfActiveItem ? 'lg:font-bold lg:text-black' : ''"
          class="my-3 text-green-persian lg:text-current"
        >
          <nuxt-link
            :to="`#${item.id}`"
            class="transition-colors hover:text-green-persian"
          >
            {{ item.text }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    requestId: 0,
    isFixed: false,
    indexOfActiveItem: 0,
  }),
  mounted() {
    this.addDomElems();
    window.addEventListener('scroll', this.onWindowChange, true);
    window.addEventListener('resize', this.onWindowChange);
    this.setStyle();
    this.detectActiveItem();
  },
  unmounted() {
    window.removeEventListener('scroll', this.onWindowChange);
    window.removeEventListener('resize', this.onWindowChange);
  },
  methods: {
    addDomElems() {
      this.toc.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.domElem = document.getElementById(item.id);
      });
    },
    onWindowChange() {
      if (this.requestId) {
        window.cancelAnimationFrame(this.requestId);
      }
      this.requestId = window.requestAnimationFrame(() => {
        this.setStyle();
        this.detectActiveItem();
      });
    },
    setStyle() {
      const el = this.$refs.toc.getBoundingClientRect();
      const p = this.$refs.toc.parentNode.getBoundingClientRect();
      this.setFixedClass(el, p);
      this.setTopPosition(el, p);
      this.setWidth(p);
    },
    setFixedClass(el, p) {
      this.isFixed = p.top < 0 && p.height + p.top > el.height;
    },
    setTopPosition(el, p) {
      this.$refs.toc.style.top = this.isFixed || p.top > 0
        ? '0px'
        : `${Math.abs(p.top) - (el.height - p.bottom)}px`;
    },
    setWidth(p) {
      this.$refs.toc.style.width = this.isFixed
        ? `${p.width}px`
        : 'auto';
    },
    detectActiveItem() {
      this.toc.some((item, index, array) => {
        const nextDomElem = array[index + 1] ? array[index + 1].domElem : undefined;
        if (this.inView(item.domElem, nextDomElem)) {
          this.indexOfActiveItem = index;
          return true;
        }
        return false;
      });
    },
    inView(elem, nextElem, waypoint = 0.3) {
      const topCoord = elem.getBoundingClientRect().top;
      const bottomCoord = nextElem
        ? nextElem.getBoundingClientRect().top
        : elem.parentNode.getBoundingClientRect().bottom;
      return topCoord < -1
        ? bottomCoord > waypoint * window.innerHeight
        : topCoord < waypoint * window.innerHeight;
    },
  },
};
</script>
