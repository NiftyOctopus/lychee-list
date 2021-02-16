<template>
    <div class='view-header'>
        <div>{{ recipe.name }}</div>
        <div>{{ item.name }}</div>

        <div class='view-title'>
            <img v-if='back' class='icon' src='../assets/icons/archive.svg'>
            <span>{{ title }}</span>
            <img v-if='fwd' class='icon' src='../assets/icons/archive.svg'>
        </div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { mapState }   from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        name: 'view-header',
        components: { /* Subcomponents */ },
        props: ['title', 'crumbs', 'back', 'fwd'],
        data() { return {

        }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['item']),
            ...mapGetters(['recipe'])
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