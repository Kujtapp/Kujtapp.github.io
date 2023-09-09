<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="(searchResult, index) in favoriteGifs" :key="index">
                    <custom-card :title="searchResult.title">
                        <template slot="custom-card-header">
                            <img class="card-imge-top" :src="searchResult.images.fixed_height.url" alt="" width="350px" :height="searchResult.images.fixed_height.height + 'px'">
                        </template>
                        <template slot="custom-card-body">
                        </template>
                        <template slot="custom-card-footer">
                            <img @click="removeFavorite(index)" src="../../assets/star-solid.svg" alt="star-regular" width="25px">
                        </template>
                    </custom-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomCard from '../custom/CustomCard.vue'
export default {
    components: {
        CustomCard
    },
    data () {
        return {
            favoriteGifs: []
        }
    },
    mounted () {
        this.favoriteGifs = JSON.parse(localStorage.getItem('favoriteGifsArray'));
    },
    methods: {
        removeFavorite (index) {
            this.favoriteGifs.splice(index, 1);
            const parsedFavoriteGif = JSON.stringify(this.favoriteGifs)
            localStorage.setItem('favoriteGifsArray', parsedFavoriteGif);
        }
    }
}
</script>