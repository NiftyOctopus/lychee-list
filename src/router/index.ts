import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        name: 'ShoppingList', path: '/shopping',
        component: () => import('../views/ShoppingListView.vue')
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