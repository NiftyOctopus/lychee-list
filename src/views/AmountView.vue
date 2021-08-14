<template>
    <div class='amount-view view'>
        <view-header title='How much?'  @back='back'></view-header>
        
        <div id='amount'>
            <div id='whole'>{{ Math.floor(item.amount) }}</div>
            <div id='fraction'><fraction :value='item.amount'></fraction></div>
            <div>{{ item.unit }}</div>
        </div>
        
        <div id='adjusters'>
            <adjuster d=1></adjuster>
            <adjuster d=2></adjuster>
            <adjuster d=3></adjuster>
            <adjuster d=4></adjuster>
        </div>

        <view-footer :allowSave=true></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'
    import Fraction   from '../components/Fraction'
    import Adjuster   from '../components/Adjuster'

    import { mapState } from 'vuex'


    export default {
        name: 'amount-view',
        components: { ViewHeader, ViewFooter, Fraction, Adjuster },
        props: [/* Inputs */],
        data() { return {} },
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: { /*
            Creates a new property
            Updates when any dependant property changes */
            ...mapState(['item'])
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
        display: flex;
        flex-flow:       row nowrap;
        justify-content: center;
        align-items:     center;
    }
    #whole {
        font-size: 30px;
    }

    #adjusters {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }
</style>