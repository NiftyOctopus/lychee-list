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
    }, {
        name: 'Recipe', path: '/recipe/:id',
        component: () => import('../views/RecipeView.vue')
    }, {
        name: 'Item', path: '/item',
        component: () => import('../views/ItemView.vue')
    }, {
        name: 'Category', path: '/category',
        component: () => import('../views/CategoryView.vue')
    }, {
        name: 'Unit', path: '/unit',
        component: () => import('../views/UnitView.vue')
    }, {
        name: 'Amount', path: '/amount',
        component: () => import('../views/AmountView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router