<template>
    <div id='grocery-list-view' class='view'>
        <div class='view-header'>Grocery List</div>

        <div v-for='category in categories' :key='category'>
            <div v-if='list[category] && list[category].length'>
                <div class='group-header'>{{ category }}</div>
                <item v-for='(item, index) in list[category]' :key='index' :i='index' :item='item'></item>
            </div>
        </div>

        <view-footer></view-footer>
    </div>
</template>



<script>
    import Item       from '../components/Item'
    import ViewFooter from '../components/ViewFooter'
    import { mapState } from 'vuex'

    export default {
        name: 'grocery-list-view',
        components: { Item, ViewFooter },
        props: [/* Inputs */],
        data() { return {}},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['categories', 'list'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {}
    }
</script>



<style scoped>

</style>