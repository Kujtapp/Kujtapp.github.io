<template>
    <div>
        <h1>blabla</h1>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    // data () {
    //     return {
    //         gif: {},
    //     }
    // },
    created () {
        this.$store.dispatch('loadGiphySearch', process.env.VUE_APP_GIPHY_KEY)
    },
    computed: {
        ...mapGetters([
            'getGiphySearchResults'
        ])
    }
    // async mounted () {
    //     const { data } = await this.gif.search('dogs', { sort: 'relevant', limit: 10})
    // }
}
</script>