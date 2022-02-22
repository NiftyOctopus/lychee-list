<template>
    <div id='settings-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>{{ type }}</span>
            </div>
        </div>

        <div><input v-model='email' type='text' placeholder='email'></div>
        <div><button @click='requestCode()'>Get Code</button></div>

        <div><input type='text' placeholder='code'></div>
        <div><button>{{ type }}</button></div>

        <!-- <view-footer></view-footer> -->
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { margin } from '../mixins/margin'

    export default {
        name: 'auth-view',
        components: { /* Subcomponents */ },
        mixins: [margin],
        props: [/* Inputs */],
        data() { return {
            type: 'auth',
            email: null
        }},
        beforeCreate() {},
        created() {
            this.type = this.$route.params.type
        },
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
            requestCode() {
                //const endpoint = 'https://lychee-api.niftyoctopus.workers.dev/'
                const endpoint = 'http://127.0.0.1:8787/'

                this.$store.dispatch('message', { text: 'Requesting code' })
                
                this.$http.post(endpoint + 'code', { email: this.email }).then((res) => {
                    this.$store.dispatch('message', { text: 'Client Code: ' + res.data.code })
                })
            }
        }
    }
</script>



<style scoped>
    input {
        font-size: 18px;
    }
</style>