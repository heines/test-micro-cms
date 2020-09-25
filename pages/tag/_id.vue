<template lang="pug">
  .tag
    h1.tag__title
      |タグ: {{ getTagName($route.params.id) }}
    div
      b-card-group(
        card-deck
        )
        b-link(
          v-for="(item, index) in items"
          :to="{name: 'id', params: {id: item.id}}"
          :key="item.id"
          class="p-3"
          )
          b-card(
            :title="item.title"
            )
            b-card-text
              |{{ $dateFns.format(new Date(item.createdAt), 'dd/MM/yyyy') }}
    b-button(
      to = "/"
      variant="outline-primary"
      ) 戻る
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: [],
    };
  },
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://heine.microcms.io/api/v1/blog?filters=tag[contains]${params.id}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    return {
      items: data.contents,
    };
  },
  computed: {
    getTagName() {
      return (id) => {
        return this.items[0].tag.filter((x) => {
          return x.id == id;
        })[0].name;
      };
    },
  },
};
</script>

<style lang="scss">
.tag {
  padding: 5em;
  &__time {
    text-align: right;
  }
}
</style>
