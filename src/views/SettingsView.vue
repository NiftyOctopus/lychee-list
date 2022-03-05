<template>
    <div id='settings-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Settings</span>
            </div>
        </div>

        <div><router-link to='/auth/signup'><button>Signup</button></router-link></div>
        <div><router-link to='/auth/login'><button>Login</button></router-link></div>
        <div><button @click='assignNewItemIDs()'>New Items IDs</button></div>
        <div><button @click='checkIDs()'>Check IDs</button></div>
        <div><button @click='permDelete()'>Delete permanently</button></div>

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
            async assignNewItemIDs() {
                const items = await this.$db.items.filter((item) => {
                    return parseInt(item.id) == item.id
                }).toArray()

                this.$store.dispatch('message', { text: items.length })
                let recipes = {}
                
                for(let item of items) {
                    const id = this.getIDs(item.id)
                    recipes[item.recipe] = true
                    //const updated = Object.assign({}, item)
                    //updated.id = id.new

                    //await this.$db.items.add(updated)
                    //await this.$db.items.delete(id.old)
                }

                this.$store.dispatch('message', { text: JSON.stringify(recipes) })
            },
            getIDs(id) {
                return {
                    old: id,
                    new: this.createID()
                }
            },
            async checkIDs() {
                const recipes = await this.$db.recipes.toCollection().primaryKeys()
                const items   = await this.$db.items.toCollection().primaryKeys()
                
                const ids  = recipes.concat(items)
                const ints = ids.filter(id => parseInt(id) == id)

                const text = ints.length + ' ints of ' + ids.length + ' total'
                this.$store.dispatch('message', { text })
            },
            async permDelete() {
                const recipes = await this.$db.recipes.filter((recipe) => {
                    return recipe.deleted
                }).delete()

                this.$store.dispatch('message', { text: 'Deleted ' + recipes + ' recipes' })

                const items = await this.$db.items.filter((item) => {
                    return item.deleted
                }).delete()

                this.$store.dispatch('message', { text: 'Deleted ' + items + ' items' })
            }
        }
    }
</script>



<style scoped>

</style>