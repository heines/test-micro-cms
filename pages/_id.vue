<template lang="pug">
  div
    h1
      |{{ item.title }}
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
      items: []
    };
  },
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://heine.microcms.io/api/v1/blog/${params.id}`,
      {
        headers: {"X-API-KEY": process.env.API_KEY }
      }
    );
    return {
      item: data
    };
  }
};
</script>

<style></style>
