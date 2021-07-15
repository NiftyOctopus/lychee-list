<template>
    <div class='recipe'>
        <img src='../assets/icons/plus-circle.svg'>
        <router-link :to="'/recipe/' + recipe.id">{{ recipe.name }}</router-link>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'recipe',
        components: { /* Subcomponents */ },
        props: ['recipe'],
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



<style scoped>

</style>