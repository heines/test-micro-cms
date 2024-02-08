import { defineNuxtConfig } from "@nuxt/bridge";
require("dotenv").config();
const { API_KEY } = process.env;
export default defineNuxtConfig({
  bridge: {
    nitro: true,
  },
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
    title: "しょんぼり技術ブログ",
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
  css: ["@/assets/base.scss", "@/assets/content.scss"],
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
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    /* Doc: https://bootstrap-vue.js.org */
    // "dayjs-nuxt",
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
  dayjs: {
    locales: ["ja"],
    defaultLocale: "ja",
  },
  webfontloader: {
    google: {
      families: ["Noto+Sans+JP:400,700", "Mochiy+Pop+P+One:400"],
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
});
