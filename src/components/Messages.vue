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
        top:   2px;
        left:  0;
        right: 0;
        text-align: center;

    }

    .msg {
        margin:      0;
        font-size:   16px;
        font-weight: bold;
        color:     #0d5173;
        max-height: 100px;
    }

    .msg > span {
        display: inline-block;
        margin: 2px;
        padding: 2px 8px;
        border-radius: 20px;
        background-color: #faf3d1;
    }

    .msg-enter-active, .msg-leave-active {
        transition: all 0.75s ease-out;
    }

    .msg-enter-from, .msg-leave-to {
        opacity: 0;
        max-height: 0;
        transform: translateY(-30px);
    }
</style>