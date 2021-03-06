require("dotenv").config();
const { API_KEY } = process.env;
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  env: {
    API_KEY,
  },
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Global CSS
   */
  css: ["@/assets/base.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["@/plugins/mixin-common-methods"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    /* Doc: https://github.com/nuxt-community/eslint-module */
    "@nuxtjs/eslint-module",
    /* Simple usage */
    "@nuxtjs/date-fns",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    /* Doc: https://bootstrap-vue.js.org */
    [
      "bootstrap-vue/nuxt",
      {
        css: false,
      },
    ],
    /* Doc: https://axios.nuxtjs.org/usage */
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "nuxt-webfontloader",
  ],
  webfontloader: {
    google: {
      families: ["Noto+Sans+JP:400,700"],
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
};
