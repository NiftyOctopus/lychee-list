<template>
    <div class='recipe-view view'>
        <recipe-name :recipe='recipe'></recipe-name>

        <div v-if='recipeItems'>
            <div v-for='category in categories' :key='category'>
                <div v-if='recipeItems[category] && recipeItems[category].length'>
                    <div class='group-header'>{{ category }}</div>
                    <item v-for='(item, index) in recipeItems[category]' :key='index' :i='index' :item='item'></item>
                </div>
            </div>
        </div>

        <recipe-link :recipe='recipe'></recipe-link>
        <view-footer :allowAdd=true @add='addRecipeItem' :allowDelete=true @delete='deleteRecipe'></view-footer>
    </div>
</template>



<script>
    import RecipeName from '../components/RecipeName'
    import RecipeLink from '../components/RecipeLink'
    import Item       from '../components/Item'
    import ViewFooter from '../components/ViewFooter'
    
    import { margin }     from '../mixins/margin'
    import { mapGetters } from 'vuex'
    import { mapState }   from 'vuex'


    export default {
        name: 'recipe-view',
        components: { RecipeName, RecipeLink, Item, ViewFooter },
        mixins: [margin],
        data() { return { id: null }},
        created() {
            this.openRecipe(this.$route.params.id)
        },
        mounted() {
            this.updateViewMargin()
            this.loadRecipeItems()
        },
        computed: {
            ...mapState(['categories']),
            ...mapGetters(['recipe', 'recipeItems'])
        },
        methods: {
            openRecipe(id) {
                this.id = id
                this.$store.commit('openRecipe', this.id)
            },
            async loadRecipeItems() {
                if(!this.recipeItems) {
                    const id = parseInt(this.id) == this.id ? parseInt(this.id) : this.id
                    this.$store.dispatch('message', { text: 'Loading recipe ' + id })
                    const items = await this.$db.items.where('recipe').equals(id).toArray()
                    this.$store.dispatch('message', { text: 'Items: ' + items.length })
                    this.$store.commit('addToRecipeItemCache', { id: id, items })
                }
            },
            addRecipeItem() {
                this.$store.commit('clearItem', this.id)
                this.$router.push('/item')
            },
            async deleteRecipe() {
                try {
                    this.$router.push('/recipes')
                    window.setTimeout(() => this.$store.commit('deleteRecipe', this.id), 0)
                    //await this.$db.recipes.delete(this.id)
                    const updated = new Date().toISOString()
                    await this.$db.recipes.update(this.id, { deleted: true, updated })
                
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>

</style>