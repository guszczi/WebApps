<template>
    <div class="navwrap">
        <nav class="navbar navbar-light bg-light">
            <span class="navbar-brand mb-0 h1">IT shop manager</span>
            <div>
                <router-link to="/">
                    <button type="button" class="btn btn-outline-secondary" style="margin-right: 5px"><i class="bi-bag"></i> Products</button>
                </router-link>
                <router-link to="/Orders">
                    <button type="button" class="btn btn-outline-secondary"><i class="bi-archive"></i> Orders</button>
                </router-link>
            </div>
        </nav>
    </div>
    <router-view />
</template>