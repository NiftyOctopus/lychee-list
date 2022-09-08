<template>
    <div id='app'>
        <messages></messages>

        <div id='primary-nav'>
            <div class='left'></div>

            <div class='middle'>
                <router-link to='/'>
                    <img class='icon' v-bind:class="{ active: this.groceriesActive }" src='./assets/icons/shopping-cart.svg'>
                </router-link>

                <router-link to='/recipes'>
                    <img class='icon' v-bind:class="{ active: this.recipesActive }" src='./assets/icons/archive.svg'>
                </router-link>

                <router-link to='/settings'>
                    <img class='icon' v-bind:class="{ active: this.settingsActive }" src='./assets/icons/settings.svg'>
                </router-link>
            </div>

            <div class='right' @click='syncWithCloud'>
                <img class='spinner' v-bind:class="{ spin: this.syncing, clear: !this.syncing }" src='./assets/icons/refresh-cw.svg'>
            </div>
        </div>
        
        <router-view/>

        <div id='version'>{{ version }}</div>
    </div>
</template>



<script>
    import Messages from './components/Messages'
    import { mapState } from 'vuex'
    import { load } from './mixins/load'
    import { sync } from './mixins/sync'

    export default {
        name: 'app',
        components: { Messages },
        mixins: [load, sync],
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        mounted() {
            this.init()
            this.load()
            this.loadLastSyncDate()
            this.loadUserEmail()
            this.loadSessionExpirationDate()
            this.syncWithCloud()
        },
        computed: {
            ...mapState(['version', 'item', 'syncing']),
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

                this.$store.dispatch('message', { text: 'Lychee List' })

                document.addEventListener('visibilitychange', () => {
                    this.syncWithCloud()
                })
            },
            loadLastSyncDate() {
                const synced = localStorage.getItem('synced')
                if(!synced) return

                const lastSync = new Date(synced)
                this.$store.commit('update', ['lastSync', lastSync])
            },
            loadUserEmail() {
                const email = localStorage.getItem('email')
                if(!email) return

                this.$store.commit('update', ['userEmail', email])
            },
            loadSessionExpirationDate() {
                const expires = localStorage.getItem('session_expires')
                if(!expires) return

                const sessionExpires = new Date(expires)
                this.$store.commit('update', ['sessionExpires', sessionExpires])
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
        /* height:     30px; */
        padding:    5px 0 0 0;
        /* text-align: center; */

        background-color: #0d5173;

        display: flex;
        justify-content: space-between;
    }

    #primary-nav .icon {
        margin:  0 10px;
        opacity: 0.3;
    }

    #primary-nav .active {
        opacity: 1;
    }

    .left, .right {
        width: 0%;
        flex-grow: 1;
    }

    .left   { text-align: left;  padding-left:  5px; }
    .middle { text-align: center; }
    .right  { text-align: right; padding-right: 5px; }

    .spin {
        transition: opacity 0s;
    }

    @keyframes spin {
        0%   { transform: rotate(0deg);   }
        100% { transform: rotate(360deg); }
    }

    .clear {
        opacity:    0.3;
        transition: opacity 1s;
        animation-play-state: paused !important;
    }

    .spinner {
        animation: spin 2s infinite;
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