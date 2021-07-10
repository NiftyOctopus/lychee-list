<template>
    <div id='grocery-list-view' class='view'>
        <div class='view-header'>
            <div class='view-title'>
                <!-- <span id='count'>{{ count }}</span> -->
                <span>Grocery List</span>
            </div>
        </div>

        <div id='controls'>
            <div><img src='../assets/icons/trash.svg'></div>
            <div><img src='../assets/icons/filter.svg' @click='toggleDoneFilter'></div>
        </div>

        <div v-for='category in categories' :key='category'>
            <div v-if='list[category] && list[category].length'>
                <div class='group-header'>{{ category }}</div>
                <item
                    v-for='(item, index) in list[category]'
                    :key='index'
                    :i='index'
                    :item='item'>
                </item>
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
            /*count() {
                let n = 0

                for(let category in this.list) {
                    let items = this.list[category]
                    n = n + items.filter(item => !item.done).length
                }
                return n
            }*/
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            navToItemView() {
                this.$store.commit('clearItem')
                this.$router.push('/item')
            },
            toggleDoneFilter() {
                this.$store.commit('toggleDoneFilter')
            }
        }
    }
</script>



<style scoped>
    #grocery-list-view {
        margin-bottom: 150px;
    }

    #controls {
        position: fixed;
        top: 60px;
        right: 10px;
        z-index: 100;
    }

    #controls div {
        margin-bottom: 10px;
        opacity: 0.5;
    }

    #count {
        margin-right: 5px;
        color: #e8385b;
    }
</style>