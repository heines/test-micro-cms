<template lang="pug">
.tools
  .tools__box
    b-button(
      class="rounded-circle p-3"
      size="lg"
      variant="info"
      @click="toggleTools"
      )
      BIconGridFill(
        font-scale="2"
        )
    .tools__sub(
      :class = "{ 'is-opened' : isOpened }"
      )
      .tools__sub-btn
        b-button(
          class="rounded-circle p-2"
          size="sm"
          variant="outline-info"
          title="tag"
          v-b-modal.modal-1
          )
          BIconTagFill(
            font-scale="1"
            )
      .tools__sub-btn
        b-button(
          class="rounded-circle p-2"
          size="sm"
          variant="outline-info"
          title="category"
          v-b-modal.modal-2
          )
          BIconList(
            font-scale="1"
            )
      .tools__sub-btn
        b-button(
          class="rounded-circle p-2"
          size="sm"
          variant="outline-info"
          title="serch"
          v-b-modal.modal-3
          )
          BIconSearch(
            font-scale="1"
            )
  .tools__box
    b-button(
      href="https://app.microcms.io/signin"
      target="_blank"
      class="rounded-circle p-3"
      size="lg"
      variant="primary"
      )
      BIconPencil(
        font-scale="2"
        )
  .tools__box
    ToTop
</template>

<script>
import ToTop from "@/components/ToTop";
import {
  BIconPencil,
  BIconGridFill,
  BIconTagFill,
  BIconList,
  BIconSearch,
} from "bootstrap-vue";
export default {
  data() {
    return {
      isOpened: false,
    };
  },
  components: {
    BIconPencil,
    BIconGridFill,
    BIconTagFill,
    BIconList,
    BIconSearch,
    ToTop,
  },
  methods: {
    toggleTools() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

<style lang="scss">
.tools {
  position: fixed;
  display: block;
  @media (min-width: 992px) {
    bottom: 5em;
    right: 2em;
  }
  @media (max-width: 992px) {
    bottom: 1em;
    right: 1em;
  }
  &__box {
    position: relative;
    & .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
    }
    & + & {
      margin-top: 1em;
    }
  }
  &__sub {
    position: absolute;
    top: -3em;
    left: -3em;
    &-btn {
      position: absolute;
      background-color: rgba(#fff, 0.8);
      border-radius: 50%;
      &:first-child {
        top: -0.3em;
        left: 4em;
      }
      &:nth-child(2) {
        top: 1em;
        left: 1em;
      }
      &:nth-child(3) {
        top: 4em;
        left: 0;
      }
      & .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
      }
    }
  }

  // transition
  &__sub {
    &-btn {
      opacity: 0;
      pointer-events: none;
      transition-property: opacity, transform;
      transition-duration: 0.15s;
      transition-timing-function: ease-in-out;
      transform: scale(0.7, 0.7);
    }
    &.is-opened &-btn {
      pointer-events: auto;
      opacity: 1;
      transition-property: opacity, transform;
      transition-duration: 0.15s;
      transition-timing-function: ease-in-out;
      transform: scale(1, 1);
      &:nth-child(2) {
        transition-delay: 0.07s;
      }
      &:nth-child(3) {
        transition-delay: 0.14s;
      }
      &:hover {
        transform: scale(1.2, 1.2);
      }
    }
  }
}
</style>
