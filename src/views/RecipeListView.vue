<template>
    <div id='recipe-list-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Recipes</span>
            </div>
        </div>

        <search
            :init='query'
            showIcon=true
            @update='updateQuery'>
        </search>

        <div>
            <recipe
                v-for='recipe in recipeList'
                :key='recipe.id'
                :recipe='recipe'>
            </recipe>
        </div>

        <view-footer :allowAdd=true @add='addRecipe'></view-footer>
    </div>
</template>



<script>
    import Search     from '../components/Search'
    import Recipe     from '../components/Recipe'
    import ViewFooter from '../components/ViewFooter'
    import { margin } from '../mixins/margin'

    import { mapState }   from 'vuex'
    import { mapGetters } from 'vuex'


    export default {
        name: 'recipe-list-view',
        components: { Search, Recipe, ViewFooter },
        mixins: [margin],
        mounted() {
            this.updateViewMargin()
        },
        computed: {
            ...mapState(['query', 'categories']),
            ...mapGetters(['recipeList'])
        },
        methods: {
            updateQuery(query) {
                this.$store.commit('update', ['query', query])
            },
            async addRecipe() {
                try {
                    let recipe = { name: '', updated: new Date().getTime() }
                    const id   = await this.$db.recipes.add(recipe)
                    recipe.id  = id

                    this.$store.commit('addRecipe', recipe)
                    this.$router.push('/recipe/' + id)
                
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>

</style>