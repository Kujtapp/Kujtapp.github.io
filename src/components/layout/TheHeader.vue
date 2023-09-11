<template>
    <div>
        <header>
            <div class="d-flex justify-content-center align-items-center flex-column bg-dark">
                <router-link to="/home">
                    <img src="../../assets/giphy-logo.svg" alt="Giphy-Logo" width="200" height="100">
                </router-link>
                <h5 class="text-white">Hi! I'm Kujtim and this is my Metras code-challenge</h5>
                <input v-if="$route.path === '/home'" type="search" v-model="searchGif" @keyup.enter="searchForGifs(searchGif)" class="form-control w-50 my-4" id="search-input" placeholder="Search..." />
            </div>
        </header>
        <nav>
            <div class="navbar justify-content-center navbar-light bg-light">
                <router-link to="/home" class="btn btn-outline-dark shadow-none" :class="{'active': $route.path === '/home'}">Home</router-link>
                <router-link to="/favorites" class="btn btn-outline-dark shadow-none" :class="{'active': $route.path === '/favorites'}">Favorites</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchGif: ''
        }
    },
    created () {
        this.$store.dispatch('loadGiphySearch', { apiKey: process.env.VUE_APP_GIPHY_KEY, searchKey: 'gif', offset: 0, limit: 6 })
    },
    methods: {
        searchForGifs (searchKey) {
            this.$store.dispatch('loadGiphySearch', { apiKey: process.env.VUE_APP_GIPHY_KEY, offset: 0, limit: 6, searchKey: searchKey })
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar > a:not(:last-child) {
    margin-right: 15px;
}
</style>