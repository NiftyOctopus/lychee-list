<template>
    <div class='fraction'>
        <div class='numerator'  >{{ fraction.n }}</div>
        <div class='denominator'>{{ fraction.d }}</div>
        <div>{{ fraction.n / fraction.d }}</div>
    </div>
</template>



<script>
    import { fractionize } from '../mixins/fractionize'

    export default {
        name: 'fraction',
        mixins: [fractionize],
        components: {},
        props: ['value'],
        data() { return {} },
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {},
        watch: {},
        methods: {}
    }
</script>



<style scoped>
    .fraction {
        margin-top: 20px;
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