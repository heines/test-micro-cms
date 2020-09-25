<template lang="pug">
  .container
    div
      h1
        |micro CMSお試しブログ
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
      div
        b-link(
          v-for="cat in catList(items)"
          :to="{ name: 'category-id', params: { id: cat.id } }"
          :key="cat.id"
          )
          |{{ cat.name }}
      div
        b-button(
          v-for="tag in tagList(items)"
          :to="{ name: 'tag-id', params: { id: tag.id } }"
          :key="tag.id"
          size="sm"
          variant="outline-primary"
          class="mr-1"
          )
          |{{ tag.name }}
      .container__tools
        .container__tool
          b-button(
            class="rounded-circle p-3"
            size="lg"
            variant="info"
            @click="toggleTools"
            )
            BIconGridFill(
              font-scale="2"
              )
          .container__subtool(
            :class = "{ 'is-opened' : isOpened }"
            )
            b-button(
              class="rounded-circle p-2"
              size="sm"
              variant="outline-info"
              )
              BIconTagFill(
                font-scale="1"
                )
            b-button(
              class="rounded-circle p-2"
              size="sm"
              variant="outline-info"
              )
              BIconList(
                font-scale="1"
                )
            b-button(
              class="rounded-circle p-2"
              size="sm"
              variant="outline-info"
              )
              BIconSearch(
                font-scale="1"
                )
        .container__tool
          b-button(
            href="https://microcms.io/"
            target="_blank"
            class="rounded-circle p-3"
            size="lg"
            variant="primary"
            )
            BIconPencil(
              font-scale="2"
              )
</template>

<script>
import axios from "axios";
import _uniqWith from "lodash/uniqWith";
import _isEqual from "lodash/isEqual";
import _flatten from "lodash/flatten";
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
      items: [],
      isOpened: false,
    };
  },
  components: {
    BIconPencil,
    BIconGridFill,
    BIconTagFill,
    BIconList,
    BIconSearch,
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
    toggleTools() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  &__subtool {
    position: absolute;
    top: -3em;
    left: -3em;
    opacity: 0;
    pointer-events: none;
    &.is-opened {
      opacity: 1;
      pointer-events: auto;
    }
    button:first-child {
      position: absolute;
      top: 0;
      left: 4em;
    }
    button:nth-child(2) {
      position: absolute;
      top: 1.5em;
      left: 1em;
    }
    button:nth-child(3) {
      position: absolute;
      top: 5em;
      left: 0;
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
</style>
