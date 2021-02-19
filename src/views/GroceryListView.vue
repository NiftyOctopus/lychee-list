<template>
    <div id='grocery-list-view' class='view'>
        <div class='view-header'>Grocery List</div>

        <div v-for='group in list' :key='group.category'>
            <div class='group-header'>{{ group.category }}</div>
            <div v-for='item in group.items' :key='item.name'>{{ item.name }}</div>
        </div>

        <view-footer></view-footer>
    </div>
</template>



<script>
    import ViewFooter from '../components/ViewFooter'
    import { mapState } from 'vuex'

    export default {
        name: 'grocery-list-view',
        components: { ViewFooter },
        props: [/* Inputs */],
        data() { return {
            
        }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['list'])
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