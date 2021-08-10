<template>
    <div class='adjuster'>
        <img class='icon'
            src='../assets/icons/plus-circle.svg'
            @click='setAmount(plus)'>

        <div>
            <div class='numerator'>1</div>
            <div v-if='d > 1' class='denominator'>{{ d }}</div>
        </div>

        <img class='icon'
            src='../assets/icons/minus-circle.svg'
            @click='setAmount(minus)'>
    </div>
</template>



<script>
    export default {
        name: 'adjuster',
        components: {},
        props: ['d'],
        data() { return {}},
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
        methods: {
            setAmount(amount) {
                this.$store.commit('updateItemAmount', amount)
            },
        }
    }
</script>



<style scoped>
    .adjuster {
        display:         flex;
        flex-flow:       column nowrap;
        justify-content: space-between;
        align-items:     center;
        margin:          10px;
        height:          110px;
    }

    .numerator, .denominator {
        padding: 1px 3px;
    }

    .denominator {
        border-top: 1px solid black;
    }

    .icon {
        touch-action: manipulation;
    }
</style>