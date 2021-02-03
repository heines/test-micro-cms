<template lang="pug">
.to-top(
  v-scroll="handleScroll"
  @click="scroll"
  )
  BIconArrowUpSquareFill.to-top__icon(
    variant="outline-secondary"
    size="lg"
    )
</template>
<script>
import { BIconArrowUpSquareFill } from "bootstrap-vue";
export default {
  components: {
    BIconArrowUpSquareFill,
  },
  directives: {
    scroll: {
      inserted(el, binding) {
        let f = function (evt) {
          binding.value(evt, el);
        };
        window.addEventListener("scroll", f);
      },
    },
  },
  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 0) {
        el.classList.add("is-show");
      } else {
        el.classList.remove("is-show");
      }
    },
    scroll() {
      const element = document.getElementById("app");
      const y = window.pageYOffset;
      const top = element.getBoundingClientRect().top;
      this.pageScroll(y, top + y);
    },
  },
};
</script>
<style lang="scss">
.to-top {
  display: block;
  width: 80px;
  height: 80px;
  cursor: pointer;
  &__icon {
    width: 100%;
    height: 100%;
  }

  // transition
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.2s;
  &.is-show {
    opacity: 1;
    transition-property: opacity;
    transition-duration: 0.2s;
  }
}
</style>
