<template lang="pug">
.content
  .content__header
    h1.category__title
      |カテゴリ: {{ items[0].category.name }}
  .content__body
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
  .content__footer
    b-button(
      to = "/"
      variant="outline-primary"
      ) TOP
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
      `https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/blog?filters=category[equals]${params.id}&limit=100`,
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
  @media (min-width: 992px) {
    padding: 5em;
  }
  @media (max-width: 991px) {
    padding: 2em;
  }
  &__time {
    text-align: right;
  }
}
</style>
