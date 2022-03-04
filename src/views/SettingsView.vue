<template>
    <div id='settings-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Settings</span>
            </div>
        </div>

        <div><router-link to='/auth/signup'><button>Signup</button></router-link></div>
        <div><router-link to='/auth/login'><button>Login</button></router-link></div>
        <div><button @click='assignNewIDs()'>Assign New IDs</button></div>

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
        data() { return { counts: [] }},
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
            async assignNewIDs() {
                const recipes = await this.$db.recipes.toArray()
                this.$store.dispatch('message', { text: recipes.length + ' Recipes' })

                for(let recipe of recipes) {
                    const id = this.getIDs(recipe.id)
                    const updated = Object.assign({}, recipe)
                    updated.id = id.new
                    
                    //await this.$db.recipes.add(updated)
                    //await this.$db.recipes.delete(id.old)

                    await this.assignNewItemIDs(id)
                }

                const text = this.counts.join(', ')
                this.$store.dispatch('message', { text })
                this.counts = []
            },
            async assignNewItemIDs(recipe) {
                const items = await this.$db.items.where('recipe').equals(recipe.old).toArray()
                this.counts.push(items.length)
                
                for(let item of items) {
                    const id = this.getIDs(item.id)
                    
                    const updated = Object.assign({}, item)
                    updated.id = id.new
                    updated.recipe = recipe.new
                    
                    //await this.$db.items.add(updated)
                    //await this.$db.items.delete(id.old)
                }
            },
            getIDs(id) {
                return {
                    old: id,
                    new: this.createID()
                }
            }
        }
    }
</script>



<style scoped>

</style>