<template>
    <div class='amount-view view'>
        <view-header title='How much?'  @back='back'></view-header>
        
        <div id='amount'>
            <div id='whole'>{{ whole }}</div>
        
            <div id='fraction' v-if='fraction.n > 0 && fraction.n < fraction.d'>
                <div id='n'>{{ fraction.n }}</div>
                <div id='d'>{{ fraction.d }}</div>
            </div>

            <div id='unit'>{{ item.unit }}</div>
        </div>

        <div id='value'>{{ value.toFixed(6) }}</div>
        
        <div id='adjusters'>
            <adjuster d=1></adjuster>
            <adjuster d=2></adjuster>
            <adjuster d=3></adjuster>
            <adjuster d=4></adjuster>
            <adjuster d=8></adjuster>
        </div>

        <view-footer :allowSave=true></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'
    import Adjuster   from '../components/Adjuster'
    import { fractionize } from '../mixins/fractionize'

    import { mapState } from 'vuex'


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
            ...mapState(['item']),
            value() { return this.item.amount }
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            back() {
                this.$router.push('unit')
            }
        }
    }
</script>



<style scoped>
    #amount {
        /* border: 1px solid gray; */
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    #whole {
        font-size: 30px;
        margin-right: 2px;
        padding: 15px 0;
    }

    #fraction {
        /* border: 1px solid red; */
    }

    #fraction > #n {
        border-bottom: 1px solid black;
    }

    #fraction > #n, #fraction > #d {
        margin:  0px 5px;
        padding: 2px 8px;
    }

    #unit {
        /* padding-bottom: 1px; */
        margin-left: 2px;
    }

    #value {
        font-size: 14px;
        color: gray;
    }

    #adjusters {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }
</style>