<template>
    <div class='amount-view view'>
        <view-header title='How much?'></view-header>
        <div style='margin-top: 150px'><button @click='getRandomValue'>Refresh</button></div>
        <div>{{ value }}</div>
        <fraction :value='value'></fraction>
        <view-footer :allowSave=true @save='saveItem'></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'
    import Fraction   from '../components/Fraction'

    export default {
        name: 'amount-view',
        components: { ViewHeader, ViewFooter, Fraction },
        props: [/* Inputs */],
        data() { return { value: 1 }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: { /*
            Creates a new property
            Updates when any dependant property changes */
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            saveItem() {
                this.$store.commit('saveItem')
                this.$router.push('/')
            },
            getRandomValue() {
                this.value = Math.random()
            }
        }
    }
</script>



<style scoped>

</style>