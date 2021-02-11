import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [{
            category: 'Produce',
            items: [
                { name: 'Bananas' },
                { name: 'Apples' },
                { name: 'Strawberries' },
                { name: 'Grapes' },
                { name: 'Oranges' },
                { name: 'Potatoes' },
                { name: 'Tomatoes' },
                { name: 'Onions' },
                { name: 'Carrots' },
                { name: 'Broccoli' }
        ]}, {
            category: 'Baking and Spices',
            items: [
                { name: 'Flour' },
                { name: 'Sugar' },
                { name: 'Powdered sugar' },
                { name: 'Brown sugar' },
                { name: 'Baking powder' },
                { name: 'Yeast' },
                { name: 'Cornstarch' },
                { name: 'Powdered sugar' }
        ]}, {
            category: 'Dairy',
            items: [
                { name: 'Milk' },
                { name: 'Heavy cream' },
                { name: 'Greek yogurt' },
                { name: 'Unsalted butter' },
                { name: 'Cheddar cheese' },
                { name: 'Parm cheese' }
            ]}
        ],
        recipes: {
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
        },
        activeRecipeID: 2,
        query: 'a'
    },
    mutations: {
        openRecipe(state, id) {
            state.activeRecipeID = id
        }
    },
    actions: {
    },
    modules: {
    },
    getters: {
        recipeList: (state) => {
            return Object.values(state.recipes).filter(recipe => recipe.name.includes(state.query))
        },
        recipe: (state) => {
            return state.recipes[state.activeRecipeID]
        }
    }
})