<template>
    <div id='settings-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>{{ type }}</span>
            </div>
        </div>

        <div><input v-model='email' type='text' placeholder='email'></div>
        <div><button @click='requestCode()'>Get Code</button></div>

        <div><input v-model='code.email' type='text' placeholder='code'></div>
        <div><button @click='auth()'>{{ type }}</button></div>

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
            email: null,
            code: { email: null, client: null }
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
                this.$store.dispatch('message', { text: 'Requesting code' })

                const url  = process.env.VUE_APP_API + 'code'
                const data = { email: this.email }
                
                this.$http.post(url, data, { withCredentials: true }).then((res) => {
                    this.code.client = res.data.code
                    this.$store.dispatch('message', { text: 'Code sent' })
                
                }).catch((error) => {
                    console.log(error)
                    this.$store.dispatch('message', { text: error.toString() })
                })
            },
            auth() {
                this.$store.dispatch('message', { text: 'Authenticating' })

                const url  = process.env.VUE_APP_API + this.type
                const code = this.code
                code.email = parseInt(code.email)
                const data = { email: this.email, code }
                
                this.$http.post(url, data, { withCredentials: true }).then((res) => {
                    const text = res.data.success ? 'Yay!' : res.data.error
                    this.$store.dispatch('message', { text })
                
                }).catch((error) => {
                    console.log(error)
                    this.$store.dispatch('message', { text: error.toString() })
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