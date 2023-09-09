<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-4" v-for="(searchResults, index) in getGiphySearchResults" :key="index">
                    <custom-card :title="searchResults.title">
                        <template slot="custom-card-header">
                            <img class="card-imge-top" :src="searchResults.images.fixed_height.url" alt="" width="350px" :height="searchResults.images.fixed_height.height + 'px'">
                        </template>
                        <template slot="custom-card-body">
                        </template>
                        <template slot="custom-card-footer">
                            <img src="../assets/star-regular.svg" alt="star-regular" width="25px">
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
    computed: {
        ...mapGetters([
            'getGiphySearchResults'
        ])
    }
}
</script>