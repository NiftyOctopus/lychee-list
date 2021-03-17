<template>
    <div class='amount-view view'>
        <view-header title='How much?'></view-header>
        <view-footer :allowSave=true @save='saveItem'></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'

    export default {
        name: 'amount-view',
        components: { ViewHeader, ViewFooter },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
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
            }
        }
    }
</script>



<style scoped>

</style>