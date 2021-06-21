<template>
    <div class='category-view view'>
        <view-header title='Select Category' fwd=true @back='back' @forward='forward'></view-header>
        <div v-for='category in categories'
            :key='category'
            @click='selectCategory(category)'
            v-bind:class='{ selected: item.category == category }'>
            <span>{{ category }}</span>
        </div>
        <view-footer :allowSave=true></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'
    import { mapState } from 'vuex'

    export default {
        name: 'category-view',
        components: { ViewHeader, ViewFooter },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['categories', 'item']),
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            selectCategory(category) {
                this.$store.commit('setItemCategory', category)
                this.$router.push('unit')
            },
            back() {
                this.$router.push('item')
            },
            forward() {
                this.$router.push('unit')
            }
        }
    }
</script>



<style scoped>

</style>