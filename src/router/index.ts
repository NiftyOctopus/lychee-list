import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        name: 'GroceryList', path: '/list',
        component: () => import('../views/GroceryListView.vue')
    }, {
        name: 'RecipeList', path: '/recipes',
        component: () => import('../views/RecipeListView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router