<template lang="pug">
div
  b-jumbotron(
    header="Nuxt.js for Micro CMS"
    lead="しょんぼり技術ブログ"
    header-level="4"
    bg-variant="secondary"
    text-variant="light"
    fluid
    )
    hr.my-4
    p
      |フロントエンドに関することを幅広く書きます。時々雑記。
  .container
    b-card-group(
      card-deck
      )
      b-link(
        v-for="(item, index) in items"
        :to="item.id"
        :key="item.id"
        class="p-3"
        )
        b-card(
          :title="item.title"
          )
          b-card-text
            |{{ $dateFns.format(new Date(item.createdAt), 'dd/MM/yyyy') }}
    Tools
    Modals(
      :catList="catList(items)"
      :tagList="tagList(items)"
      )
</template>

<script>
import axios from "axios";
import _uniqWith from "lodash/uniqWith";
import _isEqual from "lodash/isEqual";
import _flatten from "lodash/flatten";
export default {
  data() {
    return {
      items: [],
    };
  },
  async asyncData() {
    const { data } = await axios.get("https://heine.microcms.io/api/v1/blog", {
      headers: { "X-API-KEY": process.env.API_KEY },
    });
    return {
      items: data.contents,
    };
  },
  methods: {
    catList(items) {
      return _uniqWith(
        items.map((x) => {
          let obj = {};
          obj.id = x.category.id;
          obj.name = x.category.name;
          return obj;
        }),
        _isEqual
      );
    },
    tagList(items) {
      return _uniqWith(
        _flatten(
          items.map((x) => {
            return x.tag.map((y) => {
              let obj = {};
              obj.id = y.id;
              obj.name = y.name;
              return obj;
            });
          })
        ),
        _isEqual
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  &__tools {
    position: fixed;
    display: block;
    @media (min-width: 992px) {
      bottom: 10em;
      right: 2em;
    }
    @media (max-width: 992px) {
      bottom: 1em;
      right: 1em;
    }
  }
  &__tool {
    position: relative;
    & + & {
      margin-top: 1em;
    }
  }
  &__subtools {
    position: absolute;
    top: -3em;
    left: -3em;
    &-btn {
      position: absolute;
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
    }
  }

  // transition
  &__subtools {
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
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.jumbotron {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    background-image: url("~@/assets/hero.png");
    background-position: right top;
    background-repeat: no-repeat;
    @media (min-width: 992px) {
      background-size: contain;
    }
    @media (max-width: 991px) {
      opacity: 0.3;
      background-size: auto 50%;
    }
  }
}
</style>
