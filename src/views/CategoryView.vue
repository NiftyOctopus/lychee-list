<template>
    <div class='category-view view'>
        <view-header title='Select Category' fwd=true></view-header>
        <div v-for='category in categories' :key='category'>{{ category }}</div>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import { mapState } from 'vuex'

    export default {
        name: 'category-view',
        components: { ViewHeader },
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
        methods: {}
    }
</script>



<style scoped>

</style>