<template>
    <div id='app'>
        <div id='dev-nav'>
            <router-link class='link' to='/'>GroceryList</router-link>
            <router-link class='link' to='/recipes'>RecipeList</router-link>
            <router-link class='link' to='/recipe/4'>Recipe</router-link>
            <router-link class='link' to='/item'>Item</router-link>
            <router-link class='link' to='/category'>Category</router-link>
            <router-link class='link' to='/unit'>Unit</router-link>
            <router-link class='link' to='/amount'>Amount</router-link>
        </div>

        <div id='primary-nav'>
            <router-link to='/list'>
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
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'app',
        components: { /* Subcomponents */ },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: { /*
            Creates a new property
            Updates when any dependant property changes */
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {}
    }
</script>



<style>
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

    #primary-nav {
        position:   fixed;
        top:        0;
        left:       0;
        right:      0;
        height:     30px;
        padding:    5px;
        text-align: center;
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
        top:        40px;
        left:       0;
        right:      0;
        height:     25px;
        padding:    5px;
        text-align: center;
    }

    #primary-nav, .view-title {
        background-color: rgba(255, 255, 255, 0.7);
    }

    .group-header {
        margin-top:  10px;
        font-weight: bold;
    }
</style>