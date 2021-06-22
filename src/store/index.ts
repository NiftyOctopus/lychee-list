import Vue  from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(Vuex)



type Item = {
    id?:number,
    i?:number,
    name:string,
    category:string,
    prev?:string,
    unit:string,
    amount:number,
    recipe:number,
    done?:boolean
}

let item:Item = { name: 'Item', category: 'Other', unit: '', amount: 0, recipe: 0 }
type ItemList = { [key:string]:Item[] }
let list:ItemList = {}



type Recipe      = { id:number, name:string, items?:ItemList }
type RecipeList  = { [key:number]:Recipe }
type RecipeCache = { [key:number]:ItemList }

let defaultRecipes:RecipeList      = {}
let recipeSearchResults:RecipeList = {}
let recipeItemCache:RecipeCache    = {}
let recipe:Recipe = { id: 0, name: 'Recipe' }



type UnitConversion = { [key:string]:number }
type Unit           = { abbr:string, name:string, to?:UnitConversion }
type UnitType       = { type:string, units:Unit[] }

let units:UnitType[] = [
        { type: 'Weight', units: [
            { abbr: 'g',  name: 'Gram',  to: { g: 1, oz: 0.035274, lb: 0.00220462 }},
            { abbr: 'oz', name: 'Ounce', to: { g: 28.3495, oz: 1, lb: 0.0625 }},
            { abbr: 'lb', name: 'Pound', to: { g: 453.592, oz: 16, lb: 1 }},
        ]},
        { type: 'Volume', units: [
            { abbr: 'tsp',  name: 'Teaspoon',   to: { tsp: 1,   tbsp: 0.333333, c: 0.0208333, pt: 0.0104167, qt: 0.00520833, gal: 0.00130208 }},
            { abbr: 'tbsp', name: 'Tablespoon', to: { tsp: 3,   tbsp: 1,        c: 0.0625,    pt: 0.03125,   qt: 0.015625,   gal: 0.00390625 }},
            { abbr: 'c',    name: 'Cup',        to: { tsp: 48,  tbsp: 16,  c: 1,  pt: 0.5, qt: 0.25, gal: 0.0625 }},
            { abbr: 'pt',   name: 'Pint',       to: { tsp: 96,  tbsp: 32,  c: 2,  pt: 1,   qt: 0.5,  gal: 0.125  }},
            { abbr: 'qt',   name: 'Quart',      to: { tsp: 192, tbsp: 64,  c: 4,  pt: 2,   qt: 1,    gal: 0.25   }},
            { abbr: 'gal',  name: 'Gallon',     to: { tsp: 768, tbsp: 256, c: 16, pt: 8,   qt: 4,    gal: 1      }},
        ]},
        { type: 'Other', units: [
            { abbr: 'ct',  name: 'Count' }
        ]}
]



export default new Vuex.Store({
    state: {
        categories: ['Baking and Spices', 'Canned and Dried', 'Dairy', 'Frozen', 'Meat', 'Produce', 'Spices', 'Other'],
        units,
        list,
        defaultRecipes,
        recipeSearchResults,
        recipeItemCache,
        recipe,
        activeRecipeID: 2,
        query: 'a',
        item
    },
    mutations: {
        openRecipe(state, id) {
            state.activeRecipeID = id
        },
        saveRecipeName(state, recipe) {
            const id = recipe.id
            if(state.defaultRecipes[id]) {
                state.defaultRecipes[id].name = recipe.name
            }
        },
        deleteRecipe(state, id) {
            Vue.delete(state.defaultRecipes, id)
            Vue.delete(state.recipeSearchResults, id)
            Vue.delete(state.recipeItemCache, id)
        },
        updateQuery(state, query) {
            state.query = query
        },
        setItemName(state, name) {
            state.item.name = name
        },
        setItemCategory(state, category) {
            state.item.category = category
        },
        setItemUnit(state, unit) {
            state.item.unit = unit
        },
        setItemAmount(state, amount) {
            state.item.amount = amount
        },
        setItem(state, item) {
            Vue.set(state, 'item', item)
        },
        updateItemAmount(state, amount) {
            const current = state.item.amount ? state.item.amount : 0
            Vue.set(state.item, 'amount', current + amount)
        },
        addNewItem(state) {
            const cat = state.item.category
            const rid = state.item.recipe

            if(rid > 0) {
                const cache = state.recipeItemCache[rid]
                if(!cache) { return }

                if(!cache[cat]) { Vue.set(state.recipeItemCache[rid], cat, []) }
                state.recipeItemCache[rid][cat].push(state.item)
            
            } else {
                if(!state.list[cat]) { Vue.set(state.list, cat, []) }
                state.list[cat].push(state.item)
            }
        },
        appendExistingItem(state) {
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
        editExistingItem(state) {
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

                if(rid > 0) {
                    state.recipeItemCache[rid][cat].splice(i, 1)

                } else {
                    state.list[cat].splice(i, 1)
                }

            } catch(e) {
                alert(e)
            }
        },
        toggleItem(state, item) {
            const i = item.i
            delete item.i

            if(state.list[item.category][i].id == item.id) {
                item.done = !item.done
                state.list[item.category].splice(i, 1, item)
            }
        },
        clearItem(state, rid) {
            const item = {
                name:     'Item',
                category: 'Other',
                unit:     '',
                amount:   0,
                recipe:   rid && rid > 0 ? rid : 0
            }
            Vue.set(state, 'item', item)
        },
        setList(state, items) {
            for(let i in items) {
                const item = items[i]
                const cat  = item.category

                if(!state.list[cat]) { Vue.set(state.list, cat, []) }
                state.list[cat].push(item)
            }
        },
        setDefaultRecipes(state, recipes) {
            Vue.set(state, 'defaultRecipes', {})

            for(let i in recipes) {
                const recipe = recipes[i]
                Vue.set(state.defaultRecipes, recipe.id, recipe)
            }
        },
        addRecipe(state, recipe) {
            Vue.set(state.defaultRecipes, recipe.id, recipe)
        },
        addToRecipeItemCache(state, data) {
            Vue.set(state.recipeItemCache, data.id, {})

            for(let i in data.items) {
                const item = data.items[i]
                const cat  = item.category

                if(!state.recipeItemCache[data.id][cat]) { Vue.set(state.recipeItemCache[data.id], cat, []) }
                state.recipeItemCache[data.id][cat].push(item)
            }
        }
    },
    actions: {
    },
    modules: {
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
        }
    }
})