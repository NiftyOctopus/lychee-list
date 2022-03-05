<template>
    <div id='settings-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Settings</span>
            </div>
        </div>

        <div><router-link to='/auth/signup'><button>Signup</button></router-link></div>
        <div><router-link to='/auth/login'><button>Login</button></router-link></div>
        <div><button @click='checkIDs()'>Check IDs</button></div>
        <div><button @click='killOrphans()'>Kill orphans</button></div>

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
            async checkIDs() {
                const recipes = await this.$db.recipes.toCollection().primaryKeys()
                const items   = await this.$db.items.toCollection().primaryKeys()
                
                const ids  = recipes.concat(items)
                const ints = ids.filter(id => parseInt(id) == id)

                const text = ints.length + ' ints of ' + ids.length + ' total'
                this.$store.dispatch('message', { text })
            },
            async killOrphans() {
                const recipes = await this.getRecipeIDs()
                const items   = await this.$db.items.toArray()

                let id, list
                let orphans = []

                for(let item of items) {
                    id   = item.recipe
                    list = !id || id === 0 || id === '0' || id === 'none'

                    if(!list && !recipes[id + ''] && !recipes[parseInt(id)]) {
                        orphans.push(item.id)
                    }
                }

                if(orphans.length <= 10) { await this.$db.items.bulkDelete(orphans) }
                this.$store.dispatch('message', { text: 'Killed ' + orphans.length + ' orphans' })
            },
            async getRecipeIDs() {
                let ids = {}
                const recipes = await this.$db.recipes.toCollection().primaryKeys()

                for(let id of recipes) {
                    ids[id] = true
                }

                return ids
            }
        }
    }
</script>



<style scoped>

</style>