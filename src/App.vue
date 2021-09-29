<template>
    <div id='app'>
        <messages></messages>

        <div id='primary-nav'>
            <router-link to='/'>
                <img class='icon' v-bind:class="{ active: this.groceriesActive }" src='./assets/icons/shopping-cart.svg'>
            </router-link>

            <router-link to='/recipes'>
                <img class='icon' v-bind:class="{ active: this.recipesActive }" src='./assets/icons/archive.svg'>
            </router-link>
        </div>
        
        <router-view/>

        <div id='version'>{{ version }}</div>
    </div>
</template>



<script>
    import Messages from './components/Messages'
    import { mapState } from 'vuex'

    export default {
        name: 'app',
        components: { Messages },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        mounted() {
            this.init()
            this.loadList()
            this.loadRecipes()    
        },
        computed: {
            ...mapState(['version', 'item']),
            groceriesActive() {
                const route = this.$route.name
                if(route == 'GroceryList') { return true }
                //return this.item.recipe === 0
            },
            recipesActive() {
                const route = this.$route.name
                if(route == 'RecipeList') { return true }
                //return this.item.recipe > 0
            }
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            init() {
                this.$db.version(1).stores({
                    items:   '++id, recipe, done, &[name+category+recipe]',
                    recipes: '++id'
                });
            },
            async loadList() {
                const items = await this.$db.items.where('recipe').equals(0).toArray()
                //this.$store.commit('log', 'Loaded ' + items.length + ' items from db')
                this.$store.commit('setList', items)
            },
            async loadRecipes() {
                const recipes = await this.$db.recipes.toArray()
                //this.$store.commit('log', 'Loaded ' + recipes.length + ' recipes from db')
                this.$store.commit('setDefaultRecipes', recipes)
            }
        }
    }
</script>



<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    body, button {
        font-family: 'Roboto', sans-serif;
        font-size:    18px;
        color: #262626;
    }

    body, input {
        background-color: #f2f2f2;
    }

    #version {
        z-index:   100;
        position:  fixed;
        bottom:    2px;
        right:     5px;
        font-size: 12px;
        color:   gray;
    }

    #primary-nav {
        z-index:    100;
        position:   fixed;
        top:        0;
        left:       0;
        right:      0;
        height:     30px;
        padding:    5px 0 0 0;
        text-align: center;
        /* background-color: #808080; */
        /* background-color: #e8385b; */
        /* background-color: #0B3954; */
        /* background-color: #3C6E0E; */
        background-color: #33704e;
    }

    #primary-nav .icon {
        margin:  0 10px;
        opacity: 0.3;
    }

    #primary-nav .active {
        opacity: 1;
    }

    .view {
        display: block;
        padding: 5px;
        text-align: center;
        margin-bottom: 50px;
        /* border: 1px solid gray; */
    }

    .view-header {
        position:   fixed;
        top:        35px;
        left:       0;
        right:      0;
        z-index:    100;
        padding:    7px;
        /* background-color: #ffd966; */
        /* background-color: #8ACD4C; */
        background-color: #54ce8b;
        /* background-color: lightgray; */
        /* Colors */
        /* Yellow is a bit much for header */
        /* Maybe for highlighting selected Cat or Unit */
        /* ffe375 Yellow Crayola */
        /* ffe66d Naples Yellow */
    }

    #view-title {
        font-weight: bold;
    }

    .group-header {
        margin-top:  5px;
        font-weight: bold;
        /* text-align: left; */
        /* border-bottom: 1px solid lightgray; */
        margin-bottom: 5px;
        padding: 1px 0;
    }

    .group-header {
        /* background-color: #C0F98B; */
        background-color: #97f4c1;
        color: #404040;
        /* color: #f2f2f2; */
        padding: 3px 0;
        /* border-radius: 3px 3px 0 0; */
    }

    .option {
        padding: 3px 0;
    }

    .option span {
        /* display: inline-block; */
        padding: 2px 6px;
        border-radius: 20px;
        /* border: 2px solid #f2f2f2; */
    }

    .selected span {
        /* font-weight: bold; */
        /* background-color: lightblue; */
        border: 2px solid #54ce8b;
    }

    .hide {
        visibility: hidden;
    }
</style>