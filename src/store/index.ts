import Vue  from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(Vuex)



type Item = {
    id?:number,
    name:string,
    category:string,
    unit?:string,
    amount?:number,
    recipe:number,
    done?:boolean
}

let item:Item = { name: 'Cornstarch', category: 'Other', unit: '', amount: 0, recipe: 0 }
type ItemList = { [key:string]:Item[] }
let list:ItemList = {}



type Recipe      = { id:number, name:string }
type RecipeList  = { [key:number]:Recipe }
type RecipeCache = { [key:number]:ItemList }
let recipes:RecipeList = {}
let recipeItemCache:RecipeCache = {}


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
        recipes,
        recipeItemCache,
        activeRecipeID: 2,
        query: 'a',
        item
    },
    mutations: {
        openRecipe(state, id) {
            state.activeRecipeID = id
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
            const category = state.item.category
            const rid = state.item.recipe

            if(rid > 0) {
                const cache = state.recipeItemCache[rid]
                if(!cache) { return }

                if(!cache[category]) { Vue.set(state.recipeItemCache[rid], category, []) }
                state.recipeItemCache[rid][category].push(state.item)
            
            } else {
                if(!state.list[category]) { Vue.set(state.list, category, []) }
                state.list[category].push(state.item)
            }
        },
        appendExistingItem(state) {
            const category = state.item.category
            if(!state.list[category]) { return }

            let item
            for(let i = 0; i < state.list[category].length; i++) {
                item = state.list[category][i]

                if(item.name == state.item.name) {
                    state.list[category].splice(i, 1, state.item)
                    return
                }
            }
        },
        editExistingItem(state) {
            if(!state.item.id) { return }
            const cat = state.item.category
            const rid = state.item.recipe

            const items = rid > 0 ? state.recipeItemCache[rid] : state.list
            if(!items) { return }

            let item
            for(let category in items) {
                for(let i = 0; i < items[category].length; i++) {
                    item = items[category][i]

                    if(item.id == state.item.id) {
                        if(rid > 0) {
                            state.recipeItemCache[rid][category].splice(i, 1)
                            if(!state.recipeItemCache[rid][cat]) { Vue.set(state.recipeItemCache[rid], cat, []) }
                            state.recipeItemCache[rid][cat].push(state.item)
                        
                        } else {
                            state.list[category].splice(i, 1)
                            if(!state.list[cat]) { Vue.set(state.list, cat, []) }
                            state.list[cat].push(state.item)
                        }
                    }
                }
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
        clearItem(state) {
            Vue.set(state, 'item', { name: 'Item', category: 'Other', unit: null, amount: null, recipe: 0 })
            state.activeRecipeID = 0
        },
        setList(state, list) {
            Vue.set(state, 'list', list)
        }
    },
    actions: {
    },
    modules: {
    },
    getters: {
        list: (state) => {

        },
        recipeList: (state) => {
            return Object.values(state.recipes).filter(recipe => recipe.name.includes(state.query))
        },
        recipe: (state) => {
            return state.recipes[state.activeRecipeID]
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