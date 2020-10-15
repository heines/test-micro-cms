import Vue from "vue";
const easeing = require("easing-js");

Vue.mixin({
  methods: {
    pageScroll(start, end) {
      scrollAnimation(0, start, end);

      function scrollAnimation(p, sy, ey) {
        p = Math.min(p, 1.0);
        if (p < 1)
          window.requestAnimationFrame(() => {
            scrollAnimation(p + 0.02, sy, ey);
          });

        const tP = easeing.easeInOutQuad(p);
        scrollTo(0, (ey - sy) * tP + sy);
      }
    },
  },
});
