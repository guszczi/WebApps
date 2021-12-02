<template>
    <div class="navwrap">
        <nav class="navbar navbar-light bg-light">
            <span class="navbar-brand mb-0 h1">IT shop manager</span>
            <router-link to="/">Products</router-link>
            <router-link to="/Orders">Orders</router-link>
        </nav>
    </div>
    <router-view />
</template>