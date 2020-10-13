<template lang="pug">
  .post
    .post__header
      h1
        |{{ item.title }}
      hr.my-4
      .post__time {{ $dateFns.format(new Date(item.createdAt), 'h:mm bbbb / eee do MMM, yyyy') }}
    .post__body
      .post__body-text(
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
  &__time {
    text-align: right;
  }
  &__header {
    background-color: #eee;
  }
  &__header,
  &__body {
    @media (min-width: 992px) {
      padding: 5em;
    }
    @media (max-width: 991px) {
      padding: 2em;
    }
  }
}
</style>
