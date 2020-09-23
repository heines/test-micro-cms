<template lang="pug">
  .category
    h1.category__title
      |カテゴリ: {{ items[0].category.name }}
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
      `https://heine.microcms.io/api/v1/blog?filters=category[equals]${params.id}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    return {
      items: data.contents,
    };
  },
};
</script>

<style lang="scss">
.category {
  padding: 5em;
  &__time {
    text-align: right;
  }
}
</style>
