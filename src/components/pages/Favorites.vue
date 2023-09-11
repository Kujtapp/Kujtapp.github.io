<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="(searchResult, index) in favoriteGifs" :key="index">
                    <custom-card :title="searchResult.title">
                        <template slot="custom-card-header">
                            <img class="card-image-top cursor-pointer img-width" @click="openModal(searchResult)" :src="searchResult.images.fixed_height.url" alt="" width="350px" :height="searchResult.images.fixed_height.height + 'px'">
                        </template>
                        <template slot="custom-card-body">
                        </template>
                        <template slot="custom-card-footer">
                            <img @click="removeFavorite(index)" src="../../assets/star-solid.svg" alt="star-regular" width="25px">
                        </template>
                    </custom-card>
                </div>
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
            <no-favorites v-if="!favoriteGifs.length"></no-favorites>
        </div>
    </div>
</template>

<script>
import CustomCard from '../custom/CustomCard.vue'
import BootstrapModal from '../custom/BootstrapModal.vue'
import NoFavorites from '../layout/NoFavorites.vue'
export default {
    components: {
        CustomCard,
        NoFavorites,
        BootstrapModal
    },
    data () {
        return {
            favoriteGifs: [],
            selectedGif : null
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
        },
        openModal (arr) {
            this.selectedGif = arr
            this.$nextTick(() => {
                this.$refs.modal.open()
            })
        },
    }
}
</script>