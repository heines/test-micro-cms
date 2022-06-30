<template lang="pug">
  #app
    Nuxt
</template>

<script></script>
<style lang="scss">
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
