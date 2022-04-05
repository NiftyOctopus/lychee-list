<template>
    <div id='add-user-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Add User</span>
            </div>
        </div>

        <div><input v-model='email' type='text' placeholder='email'></div>
        <div><button @click='addUser()'>Add User</button></div>

        <!-- <view-footer></view-footer> -->
    </div>
</template>



<script>
    import { margin } from '../mixins/margin'

    export default {
        name: 'add-user-view',
        components: { /* Subcomponents */ },
        mixins: [margin],
        props: [/* Inputs */],
        data() { return {
            email: null,
        }},
        beforeCreate() {},
        created() {
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
            addUser() {
                this.$store.dispatch('message', { text: 'Adding user' })

                const url  = process.env.VUE_APP_API + 'users/add'
                const data = { email: this.email }
                
                this.$http.post(url, data, { withCredentials: true }).then((res) => {
                    this.$store.dispatch('message', { text: 'New user added' })
                
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