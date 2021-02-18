<template>
    <div class='item-view view'>
        <view-header title='Add Ingredient'></view-header>
        <div><input type='text' v-model.lazy='item.name'></div>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import { mapState } from 'vuex'

    export default {
        name: 'item-view',
        components: { ViewHeader },
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
        methods: {}
    }
</script>



<style scoped>

</style>