<template>
    <div id='settings-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Settings</span>
            </div>
        </div>

        <div><router-link to='/auth/signup'><button>Signup</button></router-link></div>
        <div><router-link to='/auth/login'><button>Login</button></router-link></div>
        <div><button @click='countRecords()'>Count records</button></div>
        <div><button @click='countUpdated()'>Count updated</button></div>
        <div><button @click='setUpdated()'>Set updated</button></div>

        <!-- <view-footer></view-footer> -->
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { margin } from '../mixins/margin'
    import { genid }  from '../mixins/genid'

    export default {
        name: 'settings-view',
        components: { /* Subcomponents */ },
        mixins: [margin, genid],
        props: [/* Inputs */],
        data() { return { }},
        beforeCreate() {},
        created() {},
        mounted() {
            this.updateViewMargin()
        },
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
            async countRecords() {
                const recipes = await this.$db.recipes.count()
                const items   = await this.$db.items.count()
                const total   = recipes + items
                
                this.$store.dispatch('message', { text: recipes + ' Recipes' })
                this.$store.dispatch('message', { text: items   + ' Items' })
                this.$store.dispatch('message', { text: total   + ' Records' })
            },
            async countUpdated() {
                const recipes = await this.$db.recipes.where('updated').notEqual('*').count()
                const items   = await this.$db.items.where('updated').notEqual('*').count()
                const total   = recipes + items
                
                this.$store.dispatch('message', { text: total })
            },
            async setUpdated() {
                const updates = { updated: new Date().toISOString() }
                const recipes = await this.$db.recipes.toCollection().modify(updates)
                const items   = await this.$db.items.toCollection().modify(updates)
                const total   = recipes + items

                this.$store.dispatch('message', { text: 'Modified ' + total + ' records' })
            }
        }
    }
</script>



<style scoped>

</style>