import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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


export default new Vuex.Store({
    state: {
        categories: ['Baking and Spices', 'Canned and Dried', 'Dairy', 'Frozen', 'Meat', 'Produce', 'Spices'],
        units: [
            { type: 'Volume', units: ['Teaspoon', 'Tablespoon', 'Cup', 'Pint']},
            { type: 'Weight', units: ['Gram', 'Ounce', 'Pound']}
        ],
        list,
        recipes,
        activeRecipeID: 2,
        query: 'a',
        item: { name: 'Cornstarch' }
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
        toggleItem(state, item) {
            const i = item.i
            delete item.i

            if(state.list[item.category][i].id == item.id) {
                item.done = !item.done
                state.list[item.category].splice(i, 1, item)
            }
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
        }
    }
})