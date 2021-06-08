<template>
    <div id='app'>
        <div id='primary-nav'>
            <router-link to='/'>
                <img class='icon' src='./assets/icons/shopping-cart.svg'>
            </router-link>

            <router-link to='/recipes'>
                <img class='icon' src='./assets/icons/archive.svg'>
            </router-link>
        </div>

        <router-view/>
    </div>
</template>



<script>
    export default {
        name: 'app',
        components: { /* Subcomponents */ },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        mounted() {
            this.init()
            this.loadList()
            this.loadRecipes()    
        },
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
                    items:   '++id, recipe, &[name+category+recipe]',
                    recipes: '++id'
                });
            },
            async loadList() {
                const items = await this.$db.items.where('recipe').equals(0).toArray()
                this.$store.commit('setList', items)
            },
            async loadRecipes() {
                const recipes = await this.$db.recipes.toArray()
                this.$store.commit('setDefaultRecipes', recipes)
            }
        }
    }
</script>



<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    body {
        font-family: 'Roboto', sans-serif;
        font-size:    18px;
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
        backdrop-filter:    blur(2px);
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