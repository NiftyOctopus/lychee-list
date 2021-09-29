<template>
    <div class='messages'>
        <transition-group name='msg' tag='div'>
            <div v-for='message in messages' :key='message.key' class='msg'>
                <span>{{ message.text }}</span>
            </div>
        </transition-group>
    </div>
</template>



<script>
    import { mapState } from 'vuex'

    export default {
        name: 'messages',
        components: { /* Subcomponents */ },
        props: [/* Inputs */],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['messages']),
        },
        watch: {

        },
        methods: {

        }
    }
</script>



<style scoped>
    .messages {
        z-index: 10000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
    }

    .msg {
        border: 1px solid black;;
        background-color: lightgray;
        margin: 5px;
        padding: 5px 0;
    }

    .msg-enter-active, .msg-leave-active {
        transition: all 0.5s;
    }

    .msg-enter, .msg-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(-30px);
    }
</style>