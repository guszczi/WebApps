<template>
    <div class="container">
        <button type="button" class="btn btn-primary float-right" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
            Shopping Cart
        </button>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Shopping Cart</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in products" :key="item.product_id">
                                    <td>{{item.name}}</td>
                                    <td>{{item.quantity}}</td>
                                    <td>{{total(item)}}</td>
                                    <td @click="addQuantity(item)">+</td>
                                    <td @click="decrementQuantity(item)">-</td>
                                    <td @click="removeItem(item.product_id)">Remove</td>
                                </tr>
                            </tbody>
                        </table>

                        <form>
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" class="form-control" v-model="posts.username" placeholder="Username" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" id="email" class="form-control" v-model="posts.email" placeholder="Enter email" />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input type="text" id="phone" class="form-control" v-model="posts.phone" placeholder="Enter phone" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div>Your final price is: {{getFinalPrice()}}</div>
                        <button id="close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" @click="sendData" class="btn btn-primary">Order now!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import emitter from 'tiny-emitter/instance';
    export default 
    {
        name: "ShoppingCart",

        data() {
            return {
                products: [],
                showCart: false,
                posts: {
                    date: '',
                    state_id: 1,
                    username: '',
                    email: '',
                    phone: '',
                }
            }
        },

        created() {
            emitter.on('shoppingList', product => {
                if (!this.products.includes(product)) 
                {
                    product['quantity'] = 1;
                    this.products.push(product);
                }
            });
        },
        
        methods: {
            sendData: function() {
                if (this.validate())
                {
                    const current = new Date();
                    var isError = false;
                    
                    this.posts.date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
                    
                    this.axios.post('http://127.0.0.1:3000/orders', this.posts).then(result => 
                    {
                        console.log('success order');
                        let orderID = result.data.order_id;

                        for (var product of this.products) {
                            
                            let order = {
                                'product_id': product.product_id,
                                'quantity': product.quantity,
                            }

                            var link = 'http://127.0.0.1:3000/orders/' + orderID;
                            
                            this.axios.post(link, order).then(result => 
                            {
                                console.log('success orderlist', result);
                            }).catch(error => {
                                alert(error.response.data.error);
                            });
                        }

                    }).catch(error => {
                        alert(error.response.data.error);
                        isError = true;
                    }).finally(() => {
                        if (!isError) 
                        {
                            this.products = [];
                            document.getElementById('close').click();
                        }
                    });
                }
            },
            total: function(item) {
                return (item.price * item.quantity).toFixed(2);
            },
            addQuantity: function(item) {
                item.quantity += 1;
            },
            decrementQuantity: function(item) {
                if (item.quantity > 1) item.quantity -= 1;
                else item.quantity = 1;
            },
            removeItem: function(id) {
                var item = this.products.find(product => {
                    return product.product_id == id;
                });
                var rem = confirm("Do you want to remove: " + item.name + "?");
                if (rem == true) this.products.splice(this.products.indexOf(item), 1);
            },
            getFinalPrice: function() {
                var result = 0;
                for (var product of this.products) {
                    result += parseFloat(this.total(product));
                }
                return result.toFixed(2);
            },
            validate: function() {
                var errors = [];
                if (this.products.length == 0) errors.push("Cart can't be empty");
                if (!this.isUsername(this.posts.username)) errors.push("Invalid username");
                if (!this.isMail(this.posts.email)) errors.push("Invalid email");
                if (!this.isPhoneNumber(this.posts.phone)) errors.push("Invalid phone number");
                if (errors.length != 0) alert(errors);
                return errors.length == 0;
            },
            isUsername: function(str) {
                return !/[`!@#$%^&*()_+\-={};':"|,.<>?~]/.test(str) && str.length != 0;
            },
            isMail: function(str) {
                return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(str);    
            },
            isPhoneNumber: function(number) {
                try {
                    return number.match(/\d/g).length === 9;
                } catch (error) {
                    return false;
                }
            }

        },

        computed: {
            
        }
    }
</script>