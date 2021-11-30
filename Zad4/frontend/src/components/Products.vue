<template>
    <div class="container">
        <h1>All products</h1>
        <input type="text" v-model="search" placeholder="search" />
        <select v-model="selected">
            <option value="all">Choose category</option>
            <option v-for="(item, index) in categories" :key="index" v-bind:value="item.category_id">{{item.name}}</option>
        </select>
        <table class="table-condensed table-hover">
        <thead>
            <tr>
                <th class="col-md-4">Name</th>
                <th class="col-md-4">Description</th>
                <th class="col-md-4">Price</th>
                <th class="col-md-4"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredProducts" :key="item.product_id">
                <td>{{item.name}}</td>
                <td>{{item.description}}</td>
                <td>{{item.price.toFixed(2)}}</td>
                <td @click="addToCart(item.product_id)">Buy now</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
    import emitter from 'tiny-emitter/instance';
    export default 
    {
        name: "Products",

        data() {
            return {
                products: [],
                categories: [],
                search: '',
                selected: 'all'
            }
        },

        methods: {
            addToCart: function(index) {
                emitter.emit('shoppingList', this.products[index-1])
            }
        },

        computed: {
            filteredProducts: function() {
                return this.products.filter((item) => {
                    if (this.selected != "all") return item.name.toLowerCase().match(this.search.toLowerCase()) && 
                    item.category.category_id == this.selected;
                
                    return item.name.toLowerCase().match(this.search.toLowerCase())
                });
            }
        },

        mounted() {
            this.axios.get('http://127.0.0.1:3000/categories').then((resp => {
                this.categories = resp.data;
            }))
            this.axios.get('http://127.0.0.1:3000/products').then((resp => {
                this.products = resp.data;
            }))
        },
    };
</script>