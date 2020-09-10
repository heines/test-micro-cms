<template>
  <div class="container">
    <div>
      <div class="links">
        <div v-for="item in items">
          <div>{{ item.title }}</div>
          <div v-html="item.body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: []
    };
  },
  async asyncData() {
    const { data } = await axios.get(
      "https://heine.microcms.io/api/v1/blog",
      {
        headers: {"X-API-KEY": process.env.API_KEY }
      }
    );
    return {
      items: data.contents
    };
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
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

.links {
  padding-top: 15px;
}
</style>
