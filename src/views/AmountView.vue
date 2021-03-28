<template>
    <div class='amount-view view'>
        <view-header title='How much?'></view-header>
        <!-- <div style='margin-top: 150px'><button @click='getRandomValue'>Refresh</button></div> -->
        <div style='margin-top: 150px;'>Amt: {{ item.amount }}</div>
        <!-- <div><fraction :value='value'></fraction></div> -->
        
        <adjuster d=2></adjuster>
        <adjuster d=3></adjuster>
        <adjuster d=4></adjuster>
        <view-footer :allowSave=true @save='saveItem'></view-footer>
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
            setAmount(amount) {
                //alert('WTF')
                //this.$store.commit('updateItemAmount', 6)
            },
            async saveItem() {
                //alert(this.item.id)
                this.$store.commit('saveItem')

                try { await this.$db.list.add(this.item) }
                catch(error) { alert(error) }

                this.$store.commit('clearItem')
                //alert(this.item.id)
                this.$router.push('/')
            },
            getRandomValue() {
                this.value = Math.random() * 10
                this.setAmount(this.value)
            }
        }
    }
</script>



<style scoped>

</style>