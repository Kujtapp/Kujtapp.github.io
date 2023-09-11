<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
    <the-footer v-if="$route.path === '/home'"></the-footer>
  </div>
</template>

<script>
import TheFooter from './components/layout/TheFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
export default {
  components: {
    TheHeader,
    TheFooter
  },
}

</script>

<style lang="scss">
@import '@/scss/main.scss';
* {
  box-sizing: border-box;
}
</style>
