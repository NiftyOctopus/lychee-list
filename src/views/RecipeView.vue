<template>
    <div class='recipe-view view'>
        <div class='view-header'>{{ recipe.name }}</div>
        <div v-for='item in recipe.items' :key='item.name'>{{ item.name }}</div>
        <view-footer></view-footer>
    </div>
</template>



<script>
    import ViewFooter from '../components/ViewFooter'
    import { mapMutations } from 'vuex'
    import { mapGetters }   from 'vuex'


    export default {
        name: 'recipe-view',
        components: { ViewFooter },
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