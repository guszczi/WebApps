<template>
    <ShoppingCart />
    <Products />
</template>

<script>
import Products from './components/Products.vue'
import ShoppingCart from './components/ShoppingCart.vue'

export default 
{
    name: 'App',
    components: 
    {
        Products,
        ShoppingCart,
    }
}
</script>

<style>
#app 
{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
nav {
    margin-bottom: 20px;
    padding: 15px;
}
.add-to-cart {
    cursor: pointer;
}
.add-to-cart i {
    transition: 0.2s all ease;
}
.add-to-cart:hover i {
    color: #3399FF;
}
.btn-cart {
    cursor: pointer;
    position: relative;
}
.btn-cart i {
    font-size: 20px;
}
.cart-size {
    position: absolute;
    background: #3399FF;
    color: white;
    font-size: 12px;
    border-radius: 5px;
    min-width: 20px;
    bottom: -5px;
    right: -5px;
}
label {
    width: 100%;
    text-align: left !important;
    padding-top: 10px;
    padding-left: 2px;
}
</style>
