<template>
    <div class="container" style="padding-top: 100px;">
        <h1>All products</h1>

        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="bi-search"></i></span>
            </div>
            <input class="form-control" type="text" v-model="search" placeholder="search" />
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="bi-tag"></i></span>
            </div>
            <select class="form-control" v-model="selected">
                <option value="all">Choose category</option>
                <option v-for="(item, index) in categories" :key="index" v-bind:value="item.category_id">{{item.name}}</option>
            </select>
        </div>

        <table class="table-condensed table-hover table table-striped table-responsive">
        <thead class="thead-dark">
            <tr>
                <th class="col-md-4" style="width: 30%">Name</th>
                <th class="col-md-4" style="width: 30%">Description</th>
                <th class="col-md-4" style="width: 20%">Price</th>
                <th class="col-md-4" style="width: 20%">Category</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredProducts" :key="item.product_id">
                <td class="align-middle">
                    {{item.name}}
                </td>
                <td class="align-middle">
                    <input type="text" v-model="item.description" class="form-control" />
                </td>
                <td class="align-middle">
                    <div class="center">
                        <input type="number" v-model="item.price" class="form-control" step="0.01" min="0" />
                        PLN
                    </div>
                </td>
                <td class="align-middle">
                    <select class="form-control">
                        <option v-for="(i, index) in categories" :key="index" :selected="i.category_id === item.category.category_id">{{i.name}}</option>
                    </select>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
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