<template lang="pug">
.content
  .content__header
    h1.content__title
      |キーワード: {{ $route.params.keyword }}
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
      `https://heine.microcms.io/api/v1/blog?q=${params.keyword}`,
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
