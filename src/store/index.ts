import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



function findListItem(name:string, list:any) {
    let item

    for(let category in list) {
        for(let i in list[category]) {
            item = list[category][i]
            if(item.name == name) { return { category, i }}
        }
    }

    //return { category: null, i: null }
    return null
}



let recipes:{[index:number]:any} = {
    1: { id: 1, name: 'Banbanji Chicken' },
    2: { id: 2, name: 'Chili' },
    3: { id: 3, name: 'Broccoli Rabe Sausage Pasta' },
    4: { 
        id: 4, name: 'Mapo Tofu',
        items: [
            { name: 'Milk' },
            { name: 'Heavy cream' },
            { name: 'Greek yogurt' },
            { name: 'Unsalted butter' },
            { name: 'Cheddar cheese' },
            { name: 'Parm cheese' }
        ]
    },
    5: { id: 5, name: 'Tadka Dal' },
    6: { id: 6, name: 'Brussel Sprouts and Bacon' },
    7: { id: 7, name: 'Pad See Ew' }
}


let list:{[index:string]:any} = {
    'Produce': [
        { id: 10, name: 'Bananas',      category: 'Produce', done: true },
        { id: 11, name: 'Apples',       category: 'Produce' },
        { id: 12, name: 'Strawberries', category: 'Produce' },
        { id: 13, name: 'Grapes',       category: 'Produce' },
        { id: 14, name: 'Oranges',      category: 'Produce' },
    ],
    'Baking and Spices': [
        { id: 15, name: 'Flour',          category: 'Baking and Spices' },
        { id: 16, name: 'Sugar',          category: 'Baking and Spices' },
        { id: 17, name: 'Powdered sugar', category: 'Baking and Spices' },
        { id: 18, name: 'Brown sugar',    category: 'Baking and Spices' },
        { id: 19, name: 'Baking powder',  category: 'Baking and Spices' },
    ],
    'Dairy': [
        { id: 20, name: 'Milk',            category: 'Dairy' },
        { id: 21, name: 'Heavy cream',     category: 'Dairy' },
        { id: 22, name: 'Greek yogurt',    category: 'Dairy' },
        { id: 23, name: 'Unsalted butter', category: 'Dairy' },
        { id: 24, name: 'Cheddar cheese',  category: 'Dairy' },
    ]
}


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
        categories: ['Baking and Spices', 'Canned and Dried', 'Dairy', 'Frozen', 'Meat', 'Produce', 'Spices'],
        units,
        list,
        recipes,
        activeRecipeID: 2,
        query: 'a',
        item: { name: 'Cornstarch', category: '', unit: '', amount: 1 }
    },
    mutations: {
        openRecipe(state, id) {
            state.activeRecipeID = id
        },
        updateQuery(state, query) {
            state.query = query
        },
        updateItemName(state, name) {
            state.item.name = name
        },
        updateItemCategory(state, category) {
            state.item.category = category
        },
        updateItemUnit(state, unit) {
            state.item.unit = unit
        },
        updateItemAmount(state, amount) {
            const current = state.item.amount ? state.item.amount : 0
            Vue.set(state.item, 'amount', current + amount)
        },
        saveItem(state) {
            const category = state.item.category

            if(category) {
                if(state.activeRecipeID) {
                    state.recipes[state.activeRecipeID].items.push(state.item)

                } else {
                    if(!state.list[category]) { Vue.set(state.list, category, []) }
                    const exists = findListItem(state.item.name, state.list)

                    if(exists) {
                        const existingItem = state.list[exists.category][exists.i]
                        Vue.set(state.list[exists.category][exists.i], 'amount', existingItem.amount + state.item.amount)

                    } else {
                        state.list[category].push(state.item)
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
            Vue.set(state, 'item', {})
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