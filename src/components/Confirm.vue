<template>
    <div id='confirm' @click='clickToCancel'>
        <div id='modal'>
            <button
                v-for='button in buttons'
                :key='button.event'
                @click='confirm(button.event)'>
                {{ button.text }}
            </button>

            <button @click='cancel'>Cancel</button>
        </div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'confirm',
        components: { /* Subcomponents */ },
        props: ['buttons'],
        data() { return { /* Local variables */ }},
        beforeCreate() {},
        created() {},
        mounted() {},
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
            cancel() {
                this.$emit('cancel')
            },
            clickToCancel(event) {
                if(event.target.id == 'confirm') {
                    this.$emit('cancel')
                }
            },
            confirm(action) {
                this.$emit(action)
            }
        }
    }
</script>



<style scoped>
    #confirm {
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        
        display:         flex;
        justify-content: center;
        align-items:     center;
        overflow:        hidden;

        background-color: rgba(0, 0, 0, 0.5);
    }

    #modal {
        background-color: white;
        border: 1px solid black;
        display: flex;
        flex-flow:       column nowrap;
        justify-content: center;
        align-items:     stretch;
    }

    button {
        border: 1px solid red;
        padding: 5px 10px;
        margin: 5px;
    }
</style>