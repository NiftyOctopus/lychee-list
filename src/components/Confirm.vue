<template>
    <div class='confirm' @click='clickToCancel'>
        <div>
            <div>Are you sure?</div>
            <div v-for='button in buttons' :key='button.event'>
                <button @click='confirm(button.event)'>{{ button.text }}</button>
            </div>
            <div><button @click='cancel'>Cancel</button></div>
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
                if(event.target.className == 'confirm') {
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
    .confirm {
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

    .confirm > div {
        background-color: white;
        border: 1px solid black;
    }
</style>