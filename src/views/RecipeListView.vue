<template>
    <div id='recipe-list-view' class='view'>
        <div class='view-header'>Recipes</div>
        <search :init='query' @update='updateQuery'></search>

        <div v-for='recipe in defaultRecipes' :key='recipe.name'>
            <!-- <router-link :to="'/recipe/' + recipe.id">{{ recipe.name }}</router-link> -->
            <div @click='openRecipe(recipe)'>{{ recipe.name }}</div>
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
            ...mapState(['query', 'defaultRecipes']),
            //...mapGetters(['recipeList'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            updateQuery(query) {
                this.$store.commit('updateQuery', query)
            },
            openRecipe(recipe) {
                this.$store.commit('setRecipe', recipe)
                this.$router.push('/recipe')
            },
            async addRecipe() {
                try {
                    await this.$db.recipes.add({ name: 'My Recipe' })
                    alert('Added recipe')
                
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>

</style>