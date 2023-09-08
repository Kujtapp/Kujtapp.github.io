import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { GiphyFetch } from '@giphy/js-fetch-api'
export default new Vuex.Store({
  state: {
    giphyFetch: {},
    giphySearch: {},
    giphyFavorites: {},
    giphyTrending: {},
    processing: false
  },
  getters: {
    getGiphySearchResults (state) {
      return state.giphySearch
    }
  },
  mutations: {
    setProcessing (state, payload) {
      state.processing = payload
    },
    setGiphySearch (state, payload) {
      state.giphySearch = payload
    }
  },
  actions: {
    loadGiphySearch (context, apiKey) {
      context.commit('setProcessing', true)
      return new GiphyFetch(apiKey).search("gifs", {"limit": 5})
      .then(response => {
        context.commit('setProcessing', false)
        context.commit('setGiphySearch', response.data)
      }).catch(error => {
        context.commit('setProcessing', false)
        console.log(error);
      })
    },
  }
})
