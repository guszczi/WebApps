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
                <th class="col-md-4" style="width: 28%">Name</th>
                <th class="col-md-4" style="width: 25%">Description</th>
                <th class="col-md-4" style="width: 14%">Price</th>
                <th class="col-md-4" style="width: 18%">Category</th>
                <th class="col-md-4" style="width: 14%">Weight</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredProducts" :key="item.product_id">
                <td class="align-middle">
                    {{item.name}}
                </td>
                <td class="align-middle">
                    <input type="text" v-model="item.description" @change="changed(item)" class="form-control" />
                </td>
                <td class="align-middle">
                    <div class="center">
                        <input type="number" v-model="item.price" @change="changed(item)" class="form-control" step="0.01" min="0" />
                        PLN
                    </div>
                </td>
                <td class="align-middle">
                    <select v-bind:id="'select_' + item.product_id" class="form-control" @change="switchSelect($event, item)">
                        <option v-for="i in categories" :key="i.category_id" :selected="i.category_id === item.category.category_id" >{{i.name}}</option>
                    </select>
                </td>
                <td class="align-middle">
                    <div class="center">
                        <input type="number" v-model="item.weight" @change="changed(item)" class="form-control" step="0.01" min="0" />
                        KG
                    </div>
                </td>
                <td class="align-middle">
                    <button type="button" v-if="!item.changed" :disabled="!item.changed" class="btn btn-outline-secondary">Update</button>
                    <button type="button" v-if="item.changed" class="btn btn-primary" @click="sendData(item)">Update</button>
                </td>
                <td class="align-middle">
                    <button type="button" :disabled="!item.changed" class="btn btn-outline-secondary" @click="cancelChange(item)"><i class="bi bi-arrow-return-left"></i></button>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
    import _ from 'lodash';

    export default 
    {
        name: "Products",

        data() {
            return {
                original_products_cache: [],
                products: [],
                categories: [],
                search: '',
                selected: 'all',
            }
        },

        methods: {
            sendData: function(i) {
                var request = {
                    product_id: i.product_id,
                    name: i.name,
                    description: i.description,
                    price: i.price,
                    weight: i.weight,
                    category_id: (i.categoryToChange === undefined) ? i.category.category_id : i.categoryToChange,
                };
                this.axios.put('http://127.0.0.1:3000/products/'+request.product_id, request).then(result => {
                    console.log("update success", result);
                    alert('Successfully updated ' + request.name);
                    i.changed = false;
                    
                    this.products[this.products.findIndex(x => x.product_id == i.product_id)] = result.data;
                    this.original_products_cache[this.original_products_cache.findIndex(x => x.product_id == i.product_id)] = _.cloneDeep(result.data); 
                }).catch(error => {
                    alert(error.response.data.error);
                });
            },
            isOriginalValue: function(item) {
                let stripped_item = _.omit(item, ['changed']);
                let cache = this.original_products_cache.find(x => x.product_id == item.product_id);

                if (!_.isUndefined(stripped_item.categoryToChange) && item.categoryToChange == cache.category.category_id) {
                    stripped_item = _.omit(stripped_item, ['categoryToChange']);
                }

                return _.isEqual(stripped_item, cache);
            },
            switchSelect: function(event, item) {
                item['categoryToChange'] = this.categories.find(x => x.name == event.target.value).category_id;
                item['changed'] = !this.isOriginalValue(item);
            },
            changed: function(item) {
                item['changed'] = !this.isOriginalValue(item);
            },
            cancelChange: function(item) {
                let index = this.products.findIndex(x => x.product_id == item.product_id);
                this.products[index] = _.cloneDeep(this.original_products_cache[index]);

                document.querySelector('#select_' + item.product_id).value = item.category.name;
            }
        },

        computed: {
            filteredProducts: function() {
                return this.products.filter((item) => {
                    if (this.selected != "all") return item.name.toLowerCase().match(this.search.toLowerCase()) && 
                    item.category.category_id == this.selected;
                
                    return item.name.toLowerCase().match(this.search.toLowerCase())
                });
            },
        },

        mounted() {
            this.axios.get('http://127.0.0.1:3000/categories').then((resp => {
                this.categories = resp.data;
            }))
            this.axios.get('http://127.0.0.1:3000/products').then((resp => {
                this.products = resp.data;
                this.original_products_cache = _.cloneDeep(resp.data);
            }))
        },
    };
</script>