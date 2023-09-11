<template>
    <div class="w-100">
        <div class="jumbotron">
            <div class="row align-items-center justify-content-between">
                <div class="col-md-6 col-sm-12">
                    <div class="d-flex flex-column justify-content-center">
                        <h1>Seems like your cat just smashed your keyboard</h1>
                        <h3 class="text-secondary">Try searching for 'cats' instead of {{ searchKey }}</h3>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <img class="img-responsive" src="../../assets/cat-keyboard.gif" alt="no-results" width="300px" height="300px">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        searchKey: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .img-responsive {
    width: 470px;
  }
}
</style>