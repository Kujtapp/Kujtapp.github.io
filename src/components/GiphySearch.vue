<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12" v-for="(searchResult, index) in getGiphySearchResults" :key="index">
                    <custom-card :title="searchResult.title">
                        <template slot="custom-card-header">
                            <img @click="openModal(searchResult)" class="card-image-top cursor-pointer img-width" :src="searchResult.images.fixed_height.url" alt="" width="350px" :height="searchResult.images.fixed_height.height + 'px'">
                        </template>
                        <template slot="custom-card-body">
                        </template>
                        <template slot="custom-card-footer">
                            <div class="d-flex align-items-center">
                                <div v-if="checkIfFavorite(searchResult.id)">
                                    <img @click="removeFavorite(searchResult.id)" title="Remove from favorites" src="../assets/star-solid.svg" alt="star-regular" width="25px">
                                </div>
                                <div v-else>
                                    <img @click="favoriteList(searchResult, index)" title="Put to favorites" src="../assets/star-regular.svg" alt="star-regular" width="25px">
                                </div>
                                <div class="text-primary ml-auto" v-if="searchResult.source_tld">
                                    <a :href="searchResult.source_post_url" target="_blank">{{ searchResult.source_tld }}</a>
                                </div>
                            </div>
                        </template>
                    </custom-card>
                </div>
                <bootstrap-modal ref="modal" :size="'medium'" v-if="selectedGif" :needFooter="false">
                    <template slot="title">
                        {{ selectedGif.title }}
                    </template>
                    <template slot="body">
                        <div class="d-flex justify-content-center">
                            <img class="card-image-top" :src="selectedGif.images.original.url" :alt="selectedGif.title">
                        </div>
                    </template>
                </bootstrap-modal>
                <not-found v-if="isDataEmpty" :searchKey="getSearchKey"></not-found>
                <button v-if="!isDataEmpty" class="btn btn-primary mx-auto" @click="loadMore">Load new Gifs</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomCard from './custom/CustomCard.vue'
import BootstrapModal from '../components/custom/BootstrapModal.vue'
import NotFound from '../components/layout/NotFound.vue'
export default {
    components: { 
        CustomCard ,
        BootstrapModal,
        NotFound
    },
    data () {
        return {
            favoriteGifs: [],
            selectedGif: null,
            offset: 0,
            limit: 6
        }
    },
    computed: {
        ...mapGetters([
            'getGiphySearchResults',
            'getLocalStorageFavorites',
            'getSearchKey',
            'isDataEmpty'
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
        },
        openModal (arr) {
            this.selectedGif = arr
            setTimeout(() => {
                this.$refs.modal.open()
            }, 500)
        },
        loadMore () {
            this.offset += this.limit
            this.$store.dispatch('loadGiphySearch', { apiKey: process.env.VUE_APP_GIPHY_KEY, searchKey: this.getSearchKey, offset: this.offset, limit: this.limit })
        }
    }
}
</script>
<style lang="scss">
.cursor-pointer {
    cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .img-width {
    width: 508px;
  }
}
@media only screen and (max-width: 476px) {
  .img-width{
    width: 440px;
  }
  .card-image-top {
    width: 200px
  }
}
</style>