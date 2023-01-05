<template>
    <div id='settings-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Settings</span>
            </div>
        </div>

        <div><router-link to='/auth/signup'><button>Signup</button></router-link></div>
        <div><router-link to='/auth/login'><button>Login</button></router-link></div>
        <div class='info'>Session Expires {{ sessionExpires }}</div>
        <div><router-link to='/users/add'><button>Add User</button></router-link></div>
        <div><button @click='syncWithCloud'>Sync Now</button></div>
        <div class='info'>Last Synced {{ lastSync }}</div>
        <div>Rewind Last Sync</div>
        <div>
            <button @click='rewind(1)'>Hour</button>
            <button @click='rewind(24)'>Day</button>
            <button @click='rewind(168)'>Week</button>
            <button @click='rewind(720)'>Month</button>
        </div>

        <div><button @click='refresh'>Refresh App</button></div>
        <div><router-link to='/log'><button>Log</button></router-link></div>
        <div>{{ count.items }} Items</div>
        <div>{{ count.recipes }} Recipes</div>

        <div><button @click='restoreFromCloud'>Restore</button></div>


        <!-- <view-footer></view-footer> -->
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { mapState }  from 'vuex'
    import { margin }    from '../mixins/margin'
    import { genid  }    from '../mixins/genid'
    import { sync   }    from '../mixins/sync'

    export default {
        name: 'settings-view',
        components: { /* Subcomponents */ },
        mixins: [margin, genid, sync],
        props: [/* Inputs */],
        data() { return {
            count: { items: 0, recipes: 0 }
        }},
        beforeCreate() {},
        created() {},
        mounted() {
            this.updateViewMargin()
            this.countRecords()
        },
        updated() {},
        computed: {
            ...mapState(['lastSync', 'sessionExpires'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            messageSW() {
                const sw = navigator.serviceWorker.controller
                if(sw) sw.postMessage('Hello there')
                else this.$store.dispatch('message', { text: 'No service worker' })
            },
            refresh() {
                console.log('Refreshing app')
                window.location.reload(true)
            },
            async countRecords() {
                this.count.items   = await this.$db.items.count()
                this.count.recipes = await this.$db.recipes.count()
            },
            rewind(hrs) {
                const now   = this.lastSync
                const delta = 3600000 * hrs
                const time  = new Date(now - delta)

                localStorage.setItem('synced', time.toISOString())
                this.$store.commit('update', ['lastSync', time])
            },
            async restoreFromCloud() {
                const url  = process.env.VUE_APP_API + 'restore'
                const res  = await this.$http.get(url, { withCredentials: true })
                
                console.log(res.data)
                this.$store.commit('log', JSON.stringify(res.data).substring(0, 200))
            }
        }
    }
</script>



<style scoped>
    .info {
        font-family: monospace;
        font-size:   0.8em;
    }
</style>