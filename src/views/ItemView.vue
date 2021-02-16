<template>
    <div class='item-view view'>
        <view-header title='Add Ingredient' :crumbs='crumbs' back=true></view-header>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'

    export default {
        name: 'item-view',
        components: { ViewHeader },
        props: [/* Inputs */],
        data() { return {
            crumbs: [{ name: 'Testasdf' }, { name: 'Teasdfst2' }]
        }},
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
        methods: {}
    }
</script>



<style scoped>

</style>