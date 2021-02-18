<template>
    <div id='recipe-list-view' class='view'>
        <div class='view-header'>Recipes</div>

        <div><input type='text' v-model='query'></div>

        <div v-for='recipe in recipeList' :key='recipe.name'>
            <router-link :to="'/recipe/' + recipe.id">{{ recipe.name }}</router-link>
        </div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { mapState }   from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        name: 'recipe-list-view',
        components: { /* Subcomponents */ },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            //...mapState(['query']),
            ...mapGetters(['recipeList']),
            query: {
                get() { return this.$store.state.query },
                set(query) { this.$store.commit('updateQuery', query) }
            }
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