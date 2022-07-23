<template>
    <div id='settings-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Settings</span>
            </div>
        </div>

        <div><router-link to='/auth/signup'><button>Signup</button></router-link></div>
        <div><router-link to='/auth/login'><button>Login</button></router-link></div>
        <div id='info'>Session Expires {{ sessionExpires }}</div>
        <div><router-link to='/users/add'><button>Add User</button></router-link></div>
        <div><button @click='syncWithCloud'>Sync Now</button></div>
        <div id='info'>Last Synced {{ lastSync }}</div>
        <div><button @click='refresh'>Refresh App</button></div>

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
        data() { return { }},
        beforeCreate() {},
        created() {},
        mounted() {
            this.updateViewMargin()
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