<template>
    <div class='item-view view'>
        <view-header title='Add Ingredient' fwd=true></view-header>
        <search :init='item.name' @update='updateItem'></search>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import Search     from '../components/Search'
    import { mapState } from 'vuex'

    export default {
        name: 'item-view',
        components: { ViewHeader, Search },
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
                this.$store.commit('updateItemName', name)
            }
        }
    }
</script>



<style scoped>

</style>