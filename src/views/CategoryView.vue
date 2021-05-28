<template>
    <div class='category-view view'>
        <view-header title='Select Category' fwd=true></view-header>
        <div v-for='category in categories' :key='category' @click='selectCategory(category)'>{{ category }}</div>
        <view-footer :allowSave=true></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'
    import { mapState } from 'vuex'

    export default {
        name: 'category-view',
        components: { ViewHeader, ViewFooter },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['categories']),
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            selectCategory(category) {
                this.$store.commit('setItemCategory', category)
                this.$router.push('unit')
            }
        }
    }
</script>



<style scoped>

</style>