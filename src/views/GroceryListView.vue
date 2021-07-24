<template>
    <div id='grocery-list-view' class='view'>
        <div class='view-header'>
            <div class='view-title'>
                <!-- <span id='count'>{{ count }}</span> -->
                <span>Grocery List</span>
            </div>
        </div>

        <div id='controls'>
            <div><img src='../assets/icons/trash.svg' @click='confirmDelete'></div>
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

        <confirm
            v-if='confirm'
            @cancel='cancelDelete'
            :buttons="[{ text: 'Delete Completed', event: 'completed' }, { text: 'Delete All', event: 'all' }]"
            @completed='deleteCompleted'
            @all='deleteAll'>
        </confirm>
    </div>
</template>



<script>
    import Item          from '../components/Item'
    import ViewFooter    from '../components/ViewFooter'
    import Confirm from '../components/Confirm'
    import { mapState } from 'vuex'

    export default {
        name: 'grocery-list-view',
        components: { Item, ViewFooter, Confirm },
        props: [/* Inputs */],
        data() { return { confirm: false }},
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
            },
            confirmDelete() {
                this.confirm = true
            },
            cancelDelete() {
                this.confirm = false
            },
            async deleteCompleted() {
                try {
                    this.confirm = false
                    const result = await this.$db.items.where({ recipe: 0, done: 1 }).delete()
                    this.$store.commit('deleteCompleted')

                } catch(e) {
                    alert(e)
                }
            },
            async deleteAll() {
                this.confirm = false
                await this.$db.items.where('recipe').equals(0).delete()
                this.$store.commit('deleteList')
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