<template>
    <div id='grocery-list-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Grocery List</span>
            </div>
        </div>

        <div v-for='category in categories' :key='category'>
            <div v-if='list[category] && list[category].length'>
                <div class='group-header'>
                    <span>{{ category }}</span>
                </div>

                <item
                    v-for='(item, index) in list[category]'
                    :key='index'
                    :i='index'
                    :item='item'>
                </item>
            </div>
        </div>

        <view-footer
            :allowAdd=true
            :allowDelete=true
            @add='navToItemView'
            @delete='confirmDelete'>
        </view-footer>

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
    import Confirm       from '../components/Confirm'

    import { margin }    from '../mixins/margin'
    import { mapState }  from 'vuex'


    export default {
        name: 'grocery-list-view',
        components: { Item, ViewFooter, Confirm },
        mixins: [margin],
        data() { return { confirm: false }},
        mounted() {
            this.updateViewMargin()
        },
        computed: {
            ...mapState(['categories', 'list'])
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
                    //await this.$db.items.where({ recipe: 0, done: 1 }).delete()
                    const updated = new Date().toISOString()
                    await this.$db.items.where({ recipe: 0, done: 1 }).modify({ deleted: true, updated })
                    this.$store.commit('deleteCompleted')

                } catch(e) {
                    alert(e)
                }
            },
            async deleteAll() {
                this.confirm = false
                //await this.$db.items.where('recipe').equals(0).delete()
                const updated = new Date().toISOString()
                await this.$db.items.where('recipe').equals(0).modify({ deleted: true, updated })
                this.$store.commit('deleteList')
            }
        }
    }
</script>



<style scoped>
    #grocery-list-view {
        margin-bottom: 150px;
    }
</style>