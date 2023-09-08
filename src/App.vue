<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
  components: {
    TheHeader
  },
}

</script>

<style lang="scss">
@import '@/scss/main.scss';
* {
  box-sizing: border-box;
}
</style>
