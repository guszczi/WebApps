import { createRouter, createWebHistory } from 'vue-router'
import orders from '../components/Orders.vue'
import home from '../components/Home.vue'

const routes = [
    {
        path: '/orders',
        name: 'Orders',
        component: orders
    },
    {
        path: '/',
        name: 'Products',
        component: home
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router