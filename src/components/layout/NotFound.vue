<template>
    <div class="w-100">
        <div class="jumbotron">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-column justify-content-center">
                    <h1>Seems like your cat just smashed your keyboard</h1>
                    <h3 class="text-secondary">Try searching for 'cats' instead of {{ searchKey }}</h3>
                </div>
                <img src="../../assets/cat-keyboard.gif" alt="no-results" width="300px" height="300px">
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