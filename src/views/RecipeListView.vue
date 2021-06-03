<template>
    <div id='recipe-list-view' class='view'>
        <div class='view-header'>Recipes</div>
        <search :init='query' @update='updateQuery'></search>

        <div v-for='recipe in recipeList' :key='recipe.id'>
            <router-link :to="'/recipe/' + recipe.id">{{ recipe.name }}</router-link>
        </div>

        <view-footer :allowAdd=true @add='addRecipe'></view-footer>
    </div>
</template>



<script>
    import Search     from '../components/Search'
    import ViewFooter from '../components/ViewFooter'

    import { mapState }   from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        name: 'recipe-list-view',
        components: { Search, ViewFooter },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['query']),
            ...mapGetters(['recipeList'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            updateQuery(query) {
                this.$store.commit('updateQuery', query)
            },
            async addRecipe() {
                try {
                    let recipe = { name: 'My Recipe' }
                    let id = await this.$db.recipes.add(recipe)
                    recipe.id = id
                    this.$store.commit('addRecipe', recipe)
                
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>

</style>