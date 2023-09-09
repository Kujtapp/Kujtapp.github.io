<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="(searchResult, index) in getGiphySearchResults" :key="index">
                    <custom-card :title="searchResult.title">
                        <template slot="custom-card-header">
                            <img class="card-imge-top" :src="searchResult.images.fixed_height.url" alt="" width="350px" :height="searchResult.images.fixed_height.height + 'px'">
                        </template>
                        <template slot="custom-card-body">
                        </template>
                        <template slot="custom-card-footer">
                            <div v-if="checkIfFavorite(searchResult.id)">
                                <img @click="removeFavorite(searchResult.id)" src="../assets/star-solid.svg" alt="star-regular" width="25px">
                            </div>
                            <div v-else>
                                <img @click="favoriteList(searchResult, index)" src="../assets/star-regular.svg" alt="star-regular" width="25px">
                            </div>
                        </template>
                    </custom-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomCard from './custom/CustomCard.vue'
export default {
    components: { 
        CustomCard 
    },
    data () {
        return {
            favoriteGifs: []
        }
    },
    computed: {
        ...mapGetters([
            'getGiphySearchResults',
            'getLocalStorageFavorites'
        ])
    },
    mounted () {
        if (localStorage.getItem('favoriteGifsArray')) {
            try {
                this.favoriteGifs = JSON.parse(localStorage.getItem('favoriteGifsArray'));
            } catch(e) {
                localStorage.removeItem('favoriteGifsArray');
            }
        }
    },
    methods: {
        favoriteList (searchResult) {
            this.favoriteGifs.push(searchResult)
            const parsedFavoriteGif = JSON.stringify(this.favoriteGifs);
            localStorage.setItem('favoriteGifsArray', parsedFavoriteGif);
        },
        checkIfFavorite (gifId) {
            return this.favoriteGifs.find(searchId => {
                return searchId.id === gifId
            })
        },
        removeFavorite (id) {
            this.favoriteGifs.map((gif, index) => {
                if (gif.id === id) {
                    this.favoriteGifs.splice(index, 1)
                }
            })
            const parsedFavoriteGif = JSON.stringify(this.favoriteGifs)
            localStorage.setItem('favoriteGifsArray', parsedFavoriteGif);
        }
    }
}
</script>