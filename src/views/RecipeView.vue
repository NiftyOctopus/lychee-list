<template>
    <div class='recipe-view view'>
        <div class='view-header'>{{ recipe.name }}</div>
        <div v-for='item in recipe.items' :key='item.name'>{{ item.name }}</div>
        
        <!-- <div v-for='category in categories' :key='category'>
            <div v-if='list[category] && list[category].length'>
                <div class='group-header'>{{ category }}</div>
                <item v-for='(item, index) in list[category]' :key='index' :i='index' :item='item'></item>
            </div>
        </div> -->

        <view-footer></view-footer>
    </div>
</template>



<script>
    import ViewFooter from '../components/ViewFooter'
    import { mapMutations } from 'vuex'
    import { mapGetters }   from 'vuex'
    import { mapState }   from 'vuex'

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
            // ...mapGetters(['recipe'])
            ...mapState(['recipe'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            // ...mapMutations(['openRecipe'])
        }
    }
</script>



<style scoped>

</style>