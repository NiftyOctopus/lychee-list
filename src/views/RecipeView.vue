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

        <view-footer :allowAdd=true @add='addRecipeItem' :allowDelete=true @delete='deleteRecipe'></view-footer>
    </div>
</template>



<script>
    import RecipeName from '../components/RecipeName'
    import Item       from '../components/Item'
    import ViewFooter from '../components/ViewFooter'
    import { mapMutations } from 'vuex'
    import { mapGetters }   from 'vuex'
    import { mapState }   from 'vuex'

    export default {
        name: 'recipe-view',
        components: { RecipeName, Item, ViewFooter },
        props: [/* Inputs */],
        data() { return { id: null }},
        beforeCreate() {},
        created() { this.openRecipe(this.$route.params.id) },
        mounted() { this.loadRecipeItems() },
        updated() {},
        computed: {
            ...mapState(['categories']),
            ...mapGetters(['recipe', 'recipeItems'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            openRecipe(id) {
                this.id = id
                this.$store.commit('openRecipe', id)
            },
            async loadRecipeItems() {
                if(!this.recipeItems) {
                    const items = await this.$db.items.where('recipe').equals(this.id).toArray()
                    this.$store.commit('addToRecipeItemCache', { id: this.id, items })
                }
            },
            addRecipeItem() {
                this.$store.commit('clearItem', this.id)
                this.$router.push('/item')
            },
            async deleteRecipe() {
                try {
                    this.$router.push('/recipes')
                    this.$store.commit('deleteRecipe', this.id)
                    await this.$db.recipes.delete(this.id)
                
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>

</style>