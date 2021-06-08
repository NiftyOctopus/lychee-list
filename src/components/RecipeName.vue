<template>
    <div v-if='recipe' class='recipe-name view-header'>
        <input type='text' v-model='name' @focus='focus' @blur='blur'>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'recipe-name',
        components: { /* Subcomponents */ },
        props: ['recipe'],
        data() { return { name: '' }},
        beforeCreate() {},
        created() {},
        mounted() { this.name = this.recipe.name },
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
            focus() {
                //console.log('Focus')
            },
            async blur() {
                console.log(this.name)
                try {
                    await this.$db.recipes.update(this.recipe.id, { name: this.name })
                    this.$store.commit('saveRecipeName', { id: this.recipe.id, name: this.name })
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>

</style>