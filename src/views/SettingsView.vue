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
        }
    }
</script>



<style scoped>

</style>