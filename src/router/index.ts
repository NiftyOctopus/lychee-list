import Vue from 'vue'
import VueRouter, { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import GroceryListView from '../views/GroceryListView.vue'
import ItemView from '../views/ItemView.vue'


//Vue.use(VueRouter)

const routes = [
    {
        name: 'GroceryList', path: '/',
        component: GroceryListView
    }, {
        name: 'RecipeList', path: '/recipes',
        component: () => import('../views/RecipeListView.vue')
    }, {
        name: 'Recipe', path: '/recipe',
        component: () => import('../views/RecipeView.vue')
    }, {
        name: 'RecipeByID', path: '/recipe/:id',
        component: () => import('../views/RecipeView.vue')
    }, {
        name: 'Item', path: '/item',
        component: ItemView
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

const router = createRouter({
    history: createWebHistory(),
    //base: process.env.BASE_URL,
    routes
})

export default router