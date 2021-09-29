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
        z-index:  200;
        position: fixed;
        top:   0;
        left:  0;
        right: 0;
        text-align: center;

    }

    .msg {
        margin:      8px;
        font-size:   16px;
        font-weight: bold;
        color:     #33704e;
    }

    .msg > span {
        padding: 2px 8px;
        border-radius: 20px;
        background-color: #f2f2f2;
    }

    .msg-enter-active, .msg-leave-active {
        transition: all 0.5s;
    }

    .msg-enter, .msg-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }
</style>