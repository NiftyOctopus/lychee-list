<template>
    <div class='item-view view'>
        <view-header title='Add Ingredient' fwd=true @forward='navToCategory'></view-header>
        <search :init='item.name' @update='updateItem' @forward='navToCategory'></search>
        <view-footer :allowSave=true></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'
    import Search     from '../components/Search'
    import { mapState } from 'vuex'

    export default {
        name: 'item-view',
        components: { ViewHeader, ViewFooter, Search },
        props: [],
        data() { return {} },
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['item']),
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            updateItem(name) {
                this.$store.commit('setItemName', name)
            },
            navToCategory() {
                this.$router.push('category')
            }
        }
    }
</script>



<style scoped>

</style>