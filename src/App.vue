<template>
    <div id='app'>
        <!-- <div id='dev-nav'>
            <router-link class='link' to='/'>GroceryList</router-link>
            <router-link class='link' to='/recipes'>RecipeList</router-link>
            <router-link class='link' to='/recipe/4'>Recipe</router-link>
            <router-link class='link' to='/item'>Item</router-link>
            <router-link class='link' to='/category'>Category</router-link>
            <router-link class='link' to='/unit'>Unit</router-link>
            <router-link class='link' to='/amount'>Amount</router-link>
        </div> -->

        <div id='primary-nav'>
            <router-link to='/'>
                <img class='icon' src='./assets/icons/shopping-cart.svg'>
            </router-link>

            <router-link to='/recipes'>
                <img class='icon' src='./assets/icons/archive.svg'>
            </router-link>
        </div>

        <router-view/>

        <!-- <img src='./assets/icons/arrow-left-circle.svg'> -->
        <!-- <img src='./assets/icons/arrow-right-circle.svg'> -->
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'app',
        components: { /* Subcomponents */ },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {
            this.init()
            this.loadList()
            this.loadRecipes()    
        },
        updated() {},
        computed: { /*
            Creates a new property
            Updates when any dependant property changes */
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            init() {
                this.$db.version(1).stores({
                    items:   '++id, &[name+category+recipe]',
                    recipes: '++id'
                });
            },
            async loadList() {
                let list = {}
                let items = await this.$db.items.toArray()
                
                for(let i in items) {
                    const item = items[i]
                    if(!list[item.category]) { list[item.category] = [] }
                    list[item.category].push(item)
                }
                this.$store.commit('setList', list)
            },
            async loadRecipes() {
                let recipes = await this.$db.recipes.toArray()
                this.$store.commit('setDefaultRecipes', recipes)
            }
        }
    }
</script>



<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    #dev-nav {
        position:   fixed;
        top:        0;
        left:       0;
        right:      0;
        z-index:    10;
        padding:    5px;
        text-align: center;
        font-size:  12px;
        
    }

    #dev-nav .link {
        padding: 5px;
        background-color: rgba(230, 230, 230, 0.85);
    }

    body {
        font-family: 'Roboto', sans-serif;
        font-size:    18px;
    }

    #primary-nav {
        position:   fixed;
        top:        0;
        left:       0;
        right:      0;
        height:     30px;
        padding:    5px 0 0 0;
        text-align: center;
        z-index: 100;
        background-color: #e8385b;
    }

    #primary-nav .icon {
        margin: 0 10px;
    }

    .view {
        margin-top: 100px;
        text-align: center;
    }

    .view-header {
        position:   fixed;
        top:        35px;
        left:       0;
        right:      0;
        height:     25px;
        padding:    5px;
        text-align: center;
    }

    .view-header {
        background-color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(2px);
        z-index: 100;
    }

    .view-title {
        font-weight: bold;
    }

    .group-header {
        margin-top:  10px;
        font-weight: bold;
    }
</style>