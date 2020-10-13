<template lang="pug">
.to-top(
  v-scroll="handleScroll"
  @click="scroll"
  )
  BIconArrowUpSquare.to-top__icon(
    size="lg"
    )
</template>
<script>
import { BIconArrowUpSquare } from "bootstrap-vue";
export default {
  components: {
    BIconArrowUpSquare,
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style lang="scss">
.to-top {
  position: fixed;
  display: block;
  width: 50px;
  height: 50px;
  cursor: pointer;
  @media (min-width: 992px) {
    bottom: 5em;
    right: 2em;
  }
  @media (max-width: 992px) {
    bottom: 1em;
    right: 1em;
  }
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
