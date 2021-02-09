<template>
    <div id='app'>
        <div id='primary-nav'>
            <router-link to='/shopping'>
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
    #primary-nav {
        position:   fixed;
        top:        5px;
        left:       0;
        right:      0;
        height:     35px;
        text-align: center;
    }

    #primary-nav .icon {
        margin: 0 10px;
    }

    .view-title {
        position:   fixed;
        top:        40px;
        left:       0;
        right:      0;
        text-align: center;
    }

    .router-link-active {
        
    }
</style>