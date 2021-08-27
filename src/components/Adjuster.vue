<template>
    <div class='adjuster'>
        <img class='icon'
            src='../assets/icons/plus-circle.svg'
            @click='setAmount(plus)'>

        <div>
            <div class='adj-n'>{{ n > 0 ? n : 1 }}</div>
            <div v-if='d > 1' class='adj-d'>{{ d }}</div>
        </div>

        <img class='icon'
            src='../assets/icons/minus-circle.svg'
            @click='setAmount(minus)'>
    </div>
</template>



<script>
    export default {
        name: 'adjuster',
        props: ['n', 'd'],
        computed: {
            increment() {
                const n = this.n > 0 ? this.n : 1
                const d = this.d > 1 ? this.d : 1
                return n / d
            },
            plus() {
                return this.increment
            },
            minus() {
                return this.increment * -1
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

    .adj-n, .adj-d {
        padding: 1px 3px;
    }

    .adj-d {
        border-top: 1px solid black;
    }

    .icon {
        touch-action: manipulation;
    }
</style>