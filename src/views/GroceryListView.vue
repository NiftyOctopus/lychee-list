<template>
    <div id='grocery-list-view' class='view'>
        <div class='view-header'>
            <div class='view-title'>
                <span id='count'>{{ count }}</span>
                <span>Grocery List</span>
            </div>
        </div>

        <div v-for='category in categories' :key='category'>
            <div v-if='list[category] && list[category].length'>
                <div class='group-header'>{{ category }}</div>
                <item v-for='(item, index) in list[category]' :key='index' :i='index' :item='item'></item>
            </div>
        </div>

        <view-footer :allowAdd=true @add='navToItemView'></view-footer>
    </div>
</template>



<script>
    import Item       from '../components/Item'
    import ViewFooter from '../components/ViewFooter'
    import { mapState } from 'vuex'

    export default {
        name: 'grocery-list-view',
        components: { Item, ViewFooter },
        props: [/* Inputs */],
        data() { return {}},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['categories', 'list']),
            count() {
                let n = 0

                for(let category in this.list) {
                    let items = this.list[category]
                    n = n + items.length
                }
                return n
            }
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            navToItemView() {
                this.$store.commit('clearItem')
                this.$router.push('/item')
            }
        }
    }
</script>



<style scoped>
    #grocery-list-view {
        margin-bottom: 100px;
    }

    #count {
        margin-right: 5px;
        color: #e8385b;
    }
</style>