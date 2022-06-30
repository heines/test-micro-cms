<template lang="pug">
.post
  .post__header
    h1
      |{{ item.title }}
    hr.my-4
    .post__linkblock
      .post__links
        |tags:
        template(
          v-for="(tag, index) in item.tag"
        )
          span(
            v-if="index > 0"
          )
            |,
          b-link.post__link(
            :to="{name: 'tag-id', params: { id: tag.id } }"
          )
            |{{ tag.name }}
      .post__links
        |category:
        b-link.post__link(
          :to="{name: 'category-id', params: { id: item.category.id } }"
        )
          |{{ item.category.name }}
    .post__time
      |{{ $dateFns.format(new Date(item.createdAt), 'h:mm bbbb / eee do MMM, yyyy') }}
  .post__body
    .post__body-text(
      v-html="item.body"
      )
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
  &__linkblock {
    display: flex;
    justify-content: flex-end;
  }
  &__links {
    display: flex;
    justify-content: flex-end;
    margin-left: 1em;
  }
  &__link {
    margin-left: 0.5em;
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
  &__body {
    h2 {
      margin-top: 1em;
      padding-bottom: 0.2em;
      border-bottom: 1px solid #ddd;
    }
    a {
      overflow-wrap: break-word;
    }
    code {
      padding: 0.1em 0.3em;
      margin: 0.1em 0.3em;
      background-color: rgba(#e83e8c, 0.05);
      border-radius: 0.1em;
    }
    pre {
      padding: 0.5em;
      background-color: #ddd;
      border-radius: 0.1em;
      code {
        padding: 0 !important;
        margin: 0 !important;
        background-color: transparent !important;
        border-radius: 0 !important;
      }
    }
    img {
      width: auto;
      max-width: 100%;
    }
  }
}
</style>
