<template>
    <div class="container">
        <h1>All orders</h1>

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
                <option v-for="(state, index) in states" :key="index" v-bind:value="state.state_id">{{state.name}}</option>
            </select>
        </div>
        
        <table class="table-condensed table-hover table table-striped table-responsive">
        <thead class="thead-dark">
            <tr>
                <th class="col-md-4" style="width: 15%">Username</th>
                <th class="col-md-4" style="width: 15%">Email</th>
                <th class="col-md-4" style="width: 14%">Phone</th>
                <th class="col-md-4" style="width: 18%">State</th>
                <th class="col-md-4" style="width: 15%">Date</th>
                <th class="col-md-4" style="width: 23%">Order List</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredOrders" :key="item.order_id">
                <td class="align-middle">
                    {{item.username}}
                </td>
                <td class="align-middle">
                    {{item.email}}
                </td>
                <td class="align-middle">
                    {{item.phone}}
                </td>
                <td class="align-middle">
                    {{item.state.name}}
                </td>
                <td class="align-middle">
                    {{item.date}}
                </td>
                <td class="align-middle">
                    <div v-for="orderItem in item.order_lists" :key="orderItem.product_id">
                        <span>{{this.products.find(x => x.product_id === orderItem.product_id).name}} - {{orderItem.quantity}}x</span>
                    </div>
                </td>
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-secondary" @click="setCompleted(item)">Complete</button>
                    <button type="button" class="btn btn-outline-secondary" @click="setCancelled(item)">Cancel</button>
                </td>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
export default 
{
    name: 'Orders',
    data() {
        return {
            orders: [],
            products: [],
            states: [],
            search: '',
            selected: 'all',
        }
    },

    async mounted() {
        await this.axios.get('http://127.0.0.1:3000/orders').then((resp => {
            this.orders = resp.data;
        }));
        await this.axios.get('http://127.0.0.1:3000/products').then((resp => {
            this.products = resp.data;
        }));
        await this.axios.get('http://127.0.0.1:3000/states').then((resp => {
            this.states = resp.data;
        }));
    },

    methods: {
        setCompleted: function(item) {
            this.axios.put('http://127.0.0.1:3000/orders/'+item.order_id+'/4').then(result => {
                console.log("update success", result);
                    alert(`Successfully completed order ${item.order_id}!`);
                }).catch(error => {
                    alert(error.response.data.error);
                });
        },
        setCancelled: function(item) {
            this.axios.put('http://127.0.0.1:3000/orders/'+item.order_id+'/3').then(result => {
                console.log("update success", result);
                    alert(`Successfully cancelled order ${item.order_id}!`);
                }).catch(error => {
                    alert(error.response.data.error);
                });
        },
        
    },

    computed: {
        filteredOrders: function() {
            return this.orders.filter(order => {
                if (this.selected != "all") return order.username.toLowerCase().match(this.search.toLowerCase()) && 
                order.state.state_id == this.selected;
            
                return order.username.toLowerCase().match(this.search.toLowerCase())
            });
        }
    },
}
</script>