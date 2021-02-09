<template>
    <div id='grocery-list-view' class='view'>
        <div class='view-title'>Grocery List</div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'grocery-list-view',
        components: { /* Subcomponents */ },
        props: [/* Inputs */],
        data() { return {
            list: [{
                    category: 'asdf',
                    items: [
                        { name: 'asdf' },
                        { name: 'asdf' },
                        { name: 'asdf' },
                ]}, {
                    category: 'asdf',
                    items: [
                        { name: 'asdf' },
                        { name: 'asdf' },
                        { name: 'asdf' },
                ]}, {
                    category: 'asdf',
                    items: [
                        { name: 'asdf' },
                        { name: 'asdf' },
                        { name: 'asdf' },
                ]}
            ]
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