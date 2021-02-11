<template>
    <div class='recipe-view view'>
        <div class='view-title'>{{ recipe.name }}</div>
        <div v-for='item in recipe.items' :key='item.name'>{{ item.name }}</div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { mapMutations } from 'vuex'
    import { mapGetters } from 'vuex'


    export default {
        name: 'recipe-view',
        components: { /* Subcomponents */ },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() { this.openRecipe(this.$route.params.id) },
        mounted() {},
        updated() {},
        computed: {
            ...mapGetters(['recipe'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            ...mapMutations(['openRecipe'])
        }
    }
</script>



<style scoped>

</style>