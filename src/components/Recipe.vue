<template>
    <div class='recipe'>
        <img src='../assets/icons/plus-circle.svg' @click='addRecipeItems'>
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
        methods: {
            async addRecipeItems() {
                const items = await this.$db.items.where('recipe').equals(this.recipe.id).toArray()
                alert(items[0].name)
            }
        }
    }
</script>



<style scoped>

</style>