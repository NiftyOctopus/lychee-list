<template>
    <div class='recipe'>
        <img src='../assets/icons/plus-circle.svg' @click='addRecipeItems'>
        <router-link :to="'/recipe/' + recipe.id">{{ recipe.name }}</router-link>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { convert } from '../mixins/convert'
    import { mapState } from 'vuex'

    export default {
        name: 'recipe',
        mixins: [convert],
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
            ...mapState(['item'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            async addRecipeItems() {
                const items = await this.$db.items.where('recipe').equals(this.recipe.id).toArray()
                
                let item
                for(let i in items) {
                    item = items[i]
                    delete item.id
                    item.recipe = 0
                    this.$store.commit('setItem', item)
                    await this.saveItem()
                }
            }
        }
    }
</script>



<style scoped>

</style>