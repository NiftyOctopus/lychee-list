<template>
    <div class='adjuster'>
        <div>Plus</div>
        <div class='numerator'  >1</div>
        <div class='denominator'>{{ d }}</div>
        <div>Minus</div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'adjuster',
        components: { /* Subcomponents */ },
        props: ['d'],
        data() { return {

        }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {

        },
        watch: {

        },
        methods: {

        }
    }
</script>



<style scoped>
    .adjuster {
        display: inline-block;
        /* border: 1px solid red; */
    }

    .numerator {
        border-bottom: 1px solid black;
    }

    .numerator, .denominator {
        padding: 2px 5px;
    }
</style>