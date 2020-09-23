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
</template>

<script>
import axios from "axios";
import _uniqWith from "lodash/uniqWith";
import _isEqual from "lodash/isEqual";
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
  },
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
