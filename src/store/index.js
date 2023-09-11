import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { GiphyFetch } from '@giphy/js-fetch-api'
export default new Vuex.Store({
  state: {
    giphySearch: {},
    giphyFavorites: [],
    localStorageFavorites: [],
    searchKey: '',
    processing: false,
    checkData: false
  },
  getters: {
    getGiphySearchResults (state) {
      return state.giphySearch
    },
    getLocalStorageFavorites (state) {
      return state.localStorageFavorites
    },
    getSearchKey (state) {
      return state.searchKey
    },
    isDataEmpty (state) {
      return state.checkData
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
    },
    searchKey (state, searchKey ) {
      state.searchKey = searchKey
    },
    isDataEmpty (state, condition) {
      state.checkData = condition
    }
  },
  actions: {
    loadGiphySearch (context, { apiKey, searchKey, offset, limit }) {
      context.commit('setProcessing', true)
      if (searchKey === undefined || searchKey === '') {
        searchKey = 'gif'
      }
      return new GiphyFetch(apiKey).search(searchKey, { offset: offset, limit: limit})
      .then(response => {
        context.commit('setProcessing', false)
        context.commit('setGiphySearch', response.data)
        context.commit('searchKey', searchKey)
        if (!response.data.length) {
          context.commit('isDataEmpty', true)
        } else {
          context.commit('isDataEmpty', false)
        }
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
