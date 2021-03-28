<template>
    <div class='adjuster'>
        <div>
            <img class='icon'
                src='../assets/icons/plus-circle.svg'
                @click='setAmount(plus)'>
        </div>

        <div class='numerator'  >1</div>
        <div class='denominator'>{{ d }}</div>

        <div>
            <img class='icon'
                src='../assets/icons/minus-circle.svg'
                @click=setAmount(minus)>
        </div>
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
            plus() {
                return 1 / this.d
            },
            minus() {
                return -1 / this.d
            }
        },
        watch: {

        },
        methods: {
            setAmount(amount) {
                //alert('Hello')
                this.$store.commit('updateItemAmount', amount)
            },
        }
    }
</script>



<style scoped>
    .adjuster {
        display: inline-block;
        padding: 10px;
        /* border: 1px solid red; */
    }

    .numerator {
        border-bottom: 1px solid black;
    }

    .numerator, .denominator {
        padding: 2px 5px;
    }

    .icon {
        touch-action: manipulation;
    }
</style>