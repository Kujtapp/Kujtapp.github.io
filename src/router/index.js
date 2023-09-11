import Vue from 'vue'
import VueRouter from 'vue-router'
import GiphySearch from '../components/GiphySearch.vue'
import Favorites from '../components/pages/Favorites'
Vue.use(VueRouter)

const routes = [
  {
    path: '*', redirect: '/home'
  },
  {
    path: '/home', component: GiphySearch
  },
  {
    path: '/favorites', component: Favorites
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
