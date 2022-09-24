<template>
    <div class='category-view view'>
        <view-header title='Select Category' fwd=true @back='back' @forward='forward'></view-header>

        <div class='option'
            v-for='category in categories'
            :key='category'
            @click='selectCategory(category)'
            v-bind:class='{ selected: item.category == category }'>

            <span>{{ category }}</span>
        </div>

        <view-footer :allowSave=true></view-footer>
    </div>
</template>



<script>
    import ViewHeader   from '../components/ViewHeader'
    import ViewFooter   from '../components/ViewFooter'
    import { mapState } from 'vuex'


    export default {
        name: 'category-view',
        components: { ViewHeader, ViewFooter },
        computed: {
            ...mapState(['categories', 'item'])
        },
        methods: {
            selectCategory(category) {
                this.$store.commit('update', ['item.category', category])
                if(!this.item.id) this.$router.push('unit')
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
    .category-view {
        padding-top: 15px;
    }
</style>