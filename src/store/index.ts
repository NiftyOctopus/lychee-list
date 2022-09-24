import { createStore } from 'vuex'

import './types'
import { state } from './state'



export const store = createStore({
    state,

    mutations: {
        update(state, data:any) {
            const path  = data[0].split('.')
            const name  = path[0]
            const prop  = path.length > 1 ? path[1] : null
            const value = data[1]

            if(prop) { state[name][prop] = value }
            else { state[name] = value }
        },
        openRecipe(state, id) {
            state.activeRecipeID = id
        },
        saveRecipeName(state, recipe) { // ***
            const id = recipe.id
            if(state.defaultRecipes[id]) {
                state.defaultRecipes[id].name = recipe.name
            }
        },
        updateRecipeURL(state, recipe) { // ***
            const id = recipe.id
            if(state.defaultRecipes[id]) {
                state.defaultRecipes[id].url = recipe.url
            }
        },
        deleteRecipe(state, id) {
            delete state.defaultRecipes[id]
            delete state.recipeSearchResults[id]
            delete state.recipeItemCache[id]
        },
        updateItemAmount(state, amount) { // ***
            const current = state.item.amount ? state.item.amount : 0
            state.item.amount = current + amount
        },
        addItemToList(state, id) {
            console.log(id)
            console.log(state.item)
            state.item.id = id
            const cat = state.item.category

            if(!state.list[cat]) { state.list[cat] = [] }
            state.list[cat].push(state.item)
        },
        addItemToRecipe(state, id) {
            state.item.id = id
            const cat = state.item.category
            const rid = state.item.recipe

            if(!state.recipeItemCache[rid][cat]) {
                state.recipeItemCache[rid][cat] = []
            }

            state.recipeItemCache[rid][cat].push(state.item)
        },
        appendExistingItem(state) { // ***
            const cat = state.item.category
            const rid = state.item.recipe
            if(!state.list[cat] || (rid > 0)) { return }

            let item
            for(let i = 0; i < state.list[cat].length; i++) {
                item = state.list[cat][i]

                if(item.name == state.item.name) {
                    state.list[cat].splice(i, 1, state.item)
                    return
                }
            }
        },
        editExistingItem(state) { // ***
            try {
                if(!state.item.id) { throw 'Item id missing' }
                
                const cat  = state.item.category
                const rid  = state.item.recipe
                const prev = state.item.prev
                const i    = state.item.i

                delete state.item.prev
                delete state.item.i
                if(prev === undefined || i === undefined) { return }

                const item = rid > 0 ? state.recipeItemCache[rid][prev][i] : state.list[prev][i]
                if(item.id != state.item.id) { return }

                if(cat == prev) {
                    // Category was not changed
                    if(rid > 0) {
                        // Recipe item
                        state.recipeItemCache[rid][cat].splice(i, 1, state.item)

                    } else {
                        // List item
                        state.list[cat].splice(i, 1, state.item)
                    }

                } else {
                    // Item moved to new category
                    if(rid > 0) {
                        state.recipeItemCache[rid][prev].splice(i, 1)    // Remove item from previous category
                        if(!state.recipeItemCache[rid][cat]) { state.recipeItemCache[rid][cat] = [] }
                        state.recipeItemCache[rid][cat].push(state.item) // Add item to new category

                    } else {
                        state.list[prev].splice(i, 1)
                        if(!state.list[cat]) { state.list[cat] = [] }
                        state.list[cat].push(state.item)
                    }
                }
        
            } catch(e) {
                alert(e)
            }
        },
        deleteItem(state, item) {
            try {
                if(!item.id) { throw('Item id missing') }
                
                const cat = item.category
                const rid = item.recipe

                const i = item.i
                delete item.i

                const list  = rid ? state.recipeItemCache[rid] : state.list
                const items = [...list[cat]]
                
                const filtered = items.filter((i) => i.id !== item.id)
                
                if(rid > 0) {
                    state.recipeItemCache[rid][cat] = filtered

                } else {
                    state.list[cat] = filtered
                }

            } catch(e) {
                alert(e)
            }
        },
        toggleItem(state, item) { // ***
            const id   = item.id
            const cat  = item.category
            const done = item.done
        
            let store
            for(let i in state.list[cat]) {
                store = state.list[cat][i]

                if(store.id == id) {
                    state.list[cat][i].done = done ? 0 : 1
                }
            }
        },
        toggleDoneFilter(state) { // ***
            state.showCompleted = !state.showCompleted
        },
        clearItem(state, rid) { // ***
            const item = {
                name:     '',
                category: 'Other',
                unit:     '',
                amount:   0,
                recipe:   rid ? rid : 0
            }
            state.item = item
        },
        setList(state, items) { // ***
            state.list = {}
            
            for(let i in items) {
                const item = items[i]
                const cat  = item.category

                if(!state.list[cat]) {
                    state.list[cat] = []
                }
                state.list[cat].push(item)
            }
        },
        deleteList(state) { // ***
            state.list = {}
        },
        deleteCompleted(state) { // ***
            let remaining
            for(let cat in state.list) {
                remaining = state.list[cat].filter((item:Item) => !item.done)
                state.list[cat] = remaining
            }
        },
        setDefaultRecipes(state, recipes) { // ***
            state.defaultRecipes = {}

            for(let i in recipes) {
                const recipe = recipes[i]
                state.defaultRecipes[recipe.id] = recipe
            }
        },
        addRecipe(state, recipe) { // ***
            state.defaultRecipes[recipe.id] = recipe
        },
        addToRecipeItemCache(state, data) { // ***
            state.recipeItemCache[data.id] = {}

            for(let i in data.items) {
                const item = data.items[i]
                const cat  = item.category

                if(!state.recipeItemCache[data.id][cat]) {
                    state.recipeItemCache[data.id][cat] = []
                }
                state.recipeItemCache[data.id][cat].push(item)
            }
        },
        addMessage(state, msg) {
            msg.key = Math.random()
            state.messages.push(msg)
        },
        clearMessage(state) {
            state.messages.shift()
        }
    },


    actions: {
        message(context, msg) {
            context.commit('addMessage', msg)
            window.setTimeout(() => context.commit('clearMessage'), 2000)
        }
    },


    getters: {
        defaultRecipes: (state) => {
            return Object.values(state.defaultRecipes)
        },
        recipeSearchResults: (state) => {
            return Object.values(state.recipeSearchResults)
        },
        recipeList: (state, getters) => {
            let recipes = getters.defaultRecipes.concat(getters.recipeSearchResults)

            recipes.sort((ra:Recipe, rb:Recipe) => {
                const a = ra.name.toLowerCase()
                const b = rb.name.toLowerCase()

                if(a > b) { return  1 }
                if(a < b) { return -1 }
                return 0
            })

            return recipes
        },
        recipe: (state) => {
            const id = state.activeRecipeID
            return state.defaultRecipes[id] ? state.defaultRecipes[id] : state.recipeSearchResults[id]
        },
        recipeItems: (state) => {
            const id = state.activeRecipeID
            return state.recipeItemCache[id]
        },
        conversions: (state) => {
            let conv:{[index:string]:any} = {}

            for(let i in state.units) {
                for(let j in state.units[i].units) {
                    const unit = state.units[i].units[j]
                    conv[unit.abbr] = unit.to
                }
            }

            return conv
        },
        adjusters: (state) => {
            let adj:{[index:string]:any} = {}

            for(let i in state.units) {
                for(let j in state.units[i].units) {
                    const unit = state.units[i].units[j]
                    adj[unit.abbr] = unit.adj
                }
            }

            return adj
        }
    }
})