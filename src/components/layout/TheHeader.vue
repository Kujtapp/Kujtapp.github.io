<template>
    <div>
        <header>
            <div class="d-flex justify-content-center align-items-center flex-column bg-dark">
                <router-link to="/home">
                    <img src="../../assets/giphy-logo.svg" alt="Giphy-Logo" width="200" height="100">
                </router-link>
                <h5 class="text-white">Hi! I'm Kujtim and this is my Metras code-challenge</h5>
                <input type="search" class="form-control w-50 my-4" id="search-input" placeholder="Search..." />
            </div>
        </header>
        <nav>
            <div class="navbar justify-content-center navbar-light bg-light">
                <router-link to="/home" class="btn btn-outline-dark shadow-none" :class="{'active': $route.path === '/home'}">Home</router-link>
                <router-link to="/trending" class="btn btn-outline-dark shadow-none" :class="{'active': $route.path === '/trending'}">Trending</router-link>
                <router-link to="/favorites" class="btn btn-outline-dark shadow-none" :class="{'active': $route.path === '/favorites'}">Favorites</router-link>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
.navbar > a:not(:last-child) {
    margin-right: 15px;
}
</style>