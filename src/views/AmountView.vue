<template>
    <div class='amount-view view'>
        <view-header title='How much?' @back='back'></view-header>
        
        <div id='amount'>
            <div id='whole'>{{ whole }}</div>
        
            <div id='fraction' v-if='fraction.n > 0 && fraction.n < fraction.d'>
                <div id='n'>{{ fraction.n }}</div>
                <div id='d'>{{ fraction.d }}</div>
            </div>

            <div id='unit'>{{ item.unit }}</div>

            <img id='zero' class='icon' src='../assets/icons/x.svg' @click='zero'>
        </div>

        <div id='value'>{{ value.toFixed(6) }}</div>
        
        <div id='adjusters'>
            <adjuster
                v-for='(adj, index) in adjusters[item.unit]'
                :key='index'
                :n='adj.n'
                :d='adj.d'>
            </adjuster>
        </div>

        <view-footer :allowSave=true></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'
    import Adjuster   from '../components/Adjuster'
    import { fractionize } from '../mixins/fractionize'

    import { mapState, mapGetters } from 'vuex'


    export default {
        name: 'amount-view',
        components: { ViewHeader, ViewFooter, Adjuster },
        mixins: [fractionize],
        props: [/* Inputs */],
        data() { return {} },
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: { /*
            Creates a new property
            Updates when any dependant property changes */
            ...mapState(['units', 'item']),
            ...mapGetters(['adjusters']),
            value() { return this.item.amount }
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            back() {
                this.$router.push('unit')
            },
            zero() {
                this.$store.commit('setItemAmount', 0)
            }
        }
    }
</script>



<style scoped>
    #amount {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    #amount > div, #amount > img {
        /* border: 1px solid blue; */
        margin: 0 2px;
    }

    #whole {
        font-size: 30px;
        /* margin-right: 2px; */
        padding: 15px 0;
    }

    #fraction > #n {
        border-bottom: 1px solid black;
    }

    #fraction > #n, #fraction > #d {
        /* margin:  0px 5px; */
        padding: 2px 8px;
    }

    #unit {
        /* padding-bottom: 1px; */
        /* margin-left: 2px; */
    }

    #value {
        font-size: 14px;
        color: gray;
    }

    #adjusters {
        margin-top: 20px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    #zero {
        /* margin-left: 5px; */
    }
</style>