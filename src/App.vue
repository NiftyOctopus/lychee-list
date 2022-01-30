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

            <router-link to='/settings'>
                <img class='icon' v-bind:class="{ active: this.settingsActive }" src='./assets/icons/settings.svg'>
            </router-link>

            <img class='icon' src='./assets/icons/cloud.svg' @click='syncWithCloud'>
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
            },
            recipesActive() {
                const route = this.$route.name
                if(route == 'RecipeList') { return true }
            },
            settingsActive() {
                const route = this.$route.name
                if(route == 'Settings') { return true }
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

                this.$db.version(2).stores({
                    items:   '++id, recipe, done, &[name+category+recipe], updated',
                    recipes: '++id, updated'
                });
            },
            async loadList() {
                const items = await this.$db.items.where('recipe').equals(0).filter((item) => {
                    return !item.deleted
                }).toArray()
                //this.$store.commit('log', 'Loaded ' + items.length + ' items from db')
                this.$store.commit('setList', items)
            },
            async loadRecipes() {
                const recipes = await this.$db.recipes.filter((recipe) => {
                    return !recipe.deleted
                }).toArray()
                //this.$store.commit('log', 'Loaded ' + recipes.length + ' recipes from db')
                this.$store.commit('setDefaultRecipes', recipes)
            },
            async syncWithCloud() {
                // Get last sync timestamp
                const synced = localStorage.getItem('synced')
                const last   = synced ? synced : ''
                console.log(last)

                // Get items updated since last sync
                const items = await this.$db.items.where('updated').above(last).toArray()
                //console.log(items)

                // Get recipes updated since last sync
                const recipes = await this.$db.recipes.where('updated').above(last).toArray()
                //console.log(recipes)

                const endpoint = 'https://lychee-api.niftyoctopus.workers.dev/'
                //const endpoint = 'http://127.0.0.1:8787/'

                this.$http.post(endpoint + 'sync', { items, recipes }).then((res) => {
                    console.log(res.data)
                    const msg = res.data.failed.length + ':' + res.data.deleted.length
                    this.$store.dispatch('message', { text: msg })
                })

                // What if the entire request failed?
                // Just don't update the last sync timestamp. Easy peasy.

                // What if only some of the records failed to sync?
                // We want those records to try syncing next time...
                // Change the updated timestamp of just those records to slightly after the failed attempt. Noice.

                // What if it succeeded?
                // Update the last sync timestamp normally
                // Also, remove any soft deleted records from the db.

                // So then the response should have this data...
                // Array of any specific records that failed to sync
                // Array of successfully deleted records

                localStorage.setItem('synced', new Date().toISOString())
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

        /* background-color: #33704e; */
        background-color: #0d5173;
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
    }

    .view-header {
        position:   fixed;
        top:        35px;
        left:       0;
        right:      0;
        z-index:    100;
        padding:    7px;

        /* background-color: #54ce8b; */
        background-color: #fad1d8;
    }

    #view-title {
        font-weight: bold;
    }

    .group-header {
        margin-top:    5px;
        margin-bottom: 2px;
        padding:       0;
        font-weight:   bold;
        font-size: 14px;
        /* text-decoration: underline; */
        
        text-align: right;
        border-bottom: 2px solid #f7bac4;

        color: #0d5173;
        /* background-color: #faf3d1; */
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
        border: 2px solid #ec4662;
    }

    .hide {
        visibility: hidden;
    }
</style>