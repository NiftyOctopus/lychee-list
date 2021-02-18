<template>
    <div class='unit-view view'>
        <view-header title='Unit of Measure' fwd=true></view-header>

        <div v-for='group in units' :key='group.type'>
            <div class='group-header'>{{ group.type }}</div>
            <div v-for='unit in group.units' :key='unit'>{{ unit }}</div>
        </div>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import { mapState } from 'vuex'

    export default {
        name: 'unit-view',
        components: { ViewHeader },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['units']),
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