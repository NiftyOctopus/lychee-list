<template>
    <div class='fraction'>
        <div class='numerator'  >{{ fraction.n }}</div>
        <div class='denominator'>{{ fraction.d }}</div>
        <div>{{ fraction.n / fraction.d }}</div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'fraction',
        components: { /* Subcomponents */ },
        props: ['value'],
        data() { return {
            denominators: [2, 3, 4, 8, 16]
        }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            fraction() {
                let min = 1
                let d, x, n, e
                let fraction = {}

                for(let i in this.denominators) {
                    d = this.denominators[i]
                    x = this.value * d
                    n = Math.round(x)
                    e = x % 1

                    if(e < min) {
                        min = e
                        fraction = { n, d }
                    }
                }

                return fraction
            }
        },
        watch: {

        },
        methods: {

        }
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