import { units } from './units'

let messages:Message[] = []

let item:Item|null = null
let list:ItemList  = {}

const categories:string[] = [
    'Baking and Spices',
    'Canned and Dried',
    'Dairy',
    'Frozen',
    'Meat',
    'Produce',
    'Other'
]

let defaultRecipes:RecipeList      = {}
let recipeSearchResults:RecipeList = {}
let recipeItemCache:RecipeCache    = {}
let recipe:Recipe|null = null
let lastSync:Date|null = null


export let state:{[key:string]:any} = {
    messages,
    categories,
    units,
    item,
    list,
    showCompleted: true,
    defaultRecipes,
    recipeSearchResults,
    recipeItemCache,
    recipe,
    activeRecipeID: 2,
    query: '',
    syncing: false,
    lastSync,
    version: process.env.PACKAGE_VERSION
}