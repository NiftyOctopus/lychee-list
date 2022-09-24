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
        </div>

        <img id='zero' class='icon' src='../assets/icons/x.svg' @click='zero'>

        <div id='adjusters'>
            <adjuster
                v-for='adj in adjusters[item.unit]'
                :key="adj.n + '/' + adj.d"
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
        computed: {
            ...mapState(['units', 'item']),
            ...mapGetters(['adjusters']),
        
            value() { return this.item.amount }
        },
        methods: {
            back() {
                this.$router.push('unit')
            },
            zero() {
                this.$store.commit('update', ['item.amount', 0])
            }
        }
    }
</script>



<style scoped>
    #amount {
        display:         flex;
        flex-flow:       row nowrap;
        justify-content: center;
        align-items:     center;
    }

    #whole {
        padding:   15px 0;
        font-size: 30px;
    }

    #fraction {
        margin-left: 5px;
    }

    #fraction > #n {
        border-bottom: 1px solid black;
    }

    #fraction > #n, #fraction > #d {
        padding: 2px 6px;
    }

    #unit {
        margin-left:    12px;
        padding-bottom: 2px;
    }

    #adjusters {
        margin-top:      20px;
        display:         flex;
        flex-flow:       row nowrap;
        justify-content: center;
        align-items:     center;
    }

    #zero {
        margin-top: 5px;
        opacity:    0.3;
    }
</style>