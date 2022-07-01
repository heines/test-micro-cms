<template lang="pug">
div
  b-jumbotron(
    header="しょんぼり技術ブログ"
    lead="Nuxt.js for Micro CMS"
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
      template(
        v-for="(item, index) in items"
      )
        b-link(
          :to="item.id"
          class="p-3"
          v-show="index < count"
          )
          b-card(
            :title="item.title"
            )
            b-card-text
              |{{ $dateFns.format(new Date(item.createdAt), 'dd/MM/yyyy') }}
    b-button.btn-block(
      @click="addItems"
      variant="outline-primary"
      :class="{ 'is-disabled': isDisabled }"
      ) MORE
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
import _sortBy from "lodash/sortBy";
const ADD_ITEMS = 10;
const FIRST_ITEMS = 10;
export default {
  data() {
    return {
      items: [],
    };
  },
  async asyncData() {
    const { data } = await axios.get(
      "https://heine.microcms.io/api/v1/blog?limit=1000",
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    return {
      items: data.contents,
      total: data.contents.length,
      count: FIRST_ITEMS,
    };
  },
  computed: {
    isDisabled() {
      return this.count >= this.total;
    },
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
      return _sortBy(
        _uniqWith(
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
        ),
        "id"
      );
    },
    addItems() {
      this.count += ADD_ITEMS;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-bottom: 1.5rem;
}
.title {
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
  margin-bottom: 0;
  padding-bottom: 0;
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

.btn {
  @media (min-width: 576px) {
    margin-right: 1em;
    margin-left: 1em;
  }
  &.is-disabled {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
