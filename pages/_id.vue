<template lang="pug">
  .post
    h1
      |{{ item.title }}
    .post__time {{ $dateFns.format(new Date(item.createdAt), 'h:mm bbbb / eee do MMM, yyyy') }}
    div(
      v-html="item.body"
      )
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
      `https://heine.microcms.io/api/v1/blog/${params.id}`,
      {
        headers: { "X-API-KEY": process.env.API_KEY },
      }
    );
    return {
      item: data,
    };
  },
};
</script>

<style lang="scss">
.post {
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
