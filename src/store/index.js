import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { GiphyFetch } from '@giphy/js-fetch-api'
export default new Vuex.Store({
  state: {
    giphyFetch: {},
    giphySearch: {},
    giphyFavorites: [],
    giphyTrending: {},
    localStorageFavorites: [],
    processing: false
  },
  getters: {
    getGiphySearchResults (state) {
      return state.giphySearch
    },
    getLocalStorageFavorites (state) {
      return state.localStorageFavorites
    }
  },
  mutations: {
    setProcessing (state, payload) {
      state.processing = payload
    },
    setGiphySearch (state, payload) {
      state.giphySearch = payload
    },
    loadFavorites (state, payload) {
      state.localStorageFavorites = payload
    }
  },
  actions: {
    loadGiphySearch (context, { apiKey, searchKey }) {
      context.commit('setProcessing', true)
      return new GiphyFetch(apiKey).search(searchKey, {"limit": 6})
      .then(response => {
        context.commit('setProcessing', false)
        context.commit('setGiphySearch', response.data)
      }).catch(error => {
        context.commit('setProcessing', false)
        console.log(error);
      })
    },
    loadFavoritesLocalStorage (context) {
      let favorites = JSON.parse(localStorage.getItem('favoriteGifsArray'))
      context.commit('loadFavorites', favorites)
    }
  }
})
