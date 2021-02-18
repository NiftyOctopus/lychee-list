<template>
    <div class='amount-view view'>
        <view-header title='How much?' fwd=true></view-header>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'

    export default {
        name: 'amount-view',
        components: { ViewHeader },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
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