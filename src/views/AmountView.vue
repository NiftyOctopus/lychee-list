<template>
    <div class='amount-view view'>
        <view-header title='How much?'  @back='back'></view-header>
        <!-- <div style='margin-top: 150px'><button @click='getRandomValue'>Refresh</button></div> -->
        <div style='margin-top: 150px;'>Amt: {{ item.amount }}</div>
        <!-- <div><fraction :value='value'></fraction></div> -->
        
        <adjuster d=2></adjuster>
        <adjuster d=3></adjuster>
        <adjuster d=4></adjuster>
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
        data() { return { value: 1 }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: { /*
            Creates a new property
            Updates when any dependant property changes */
            ...mapState(['item']),
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

</style>