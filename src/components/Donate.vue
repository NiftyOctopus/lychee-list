<template>
    <div id='donate' @click='clickToCancel'>
        <div id='modal'>
            <h4>Enjoying Lychee List?</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>

            <a href='https://www.buymeacoffee.com/niftyoctopus'><button>Donate</button></a>
            <button @click='cancel'>Maybe Later</button>
            <a href='https://niftyoctopus.com'>Other Apps</a>
        </div>
    </div>
</template>



<script>
    export default {
        name: 'donate',
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
            clickToCancel(event) {
                if(event.target.id == 'donate') {
                    this.$emit('cancel')
                }
            },
            cancel() {
                this.$emit('cancel')
            }
        }
    }
</script>



<style scoped>
    #donate {
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
        max-width: 80%;
        padding: 5px;
        background-color: white;
        border: 1px solid black;
        display: flex;
        flex-flow:       column nowrap;
        justify-content: center;
        align-items:     stretch;
    }

    h4 {
        border: 1px solid blue;
        margin: 0;
    }

    p {
        text-align: left;
    }

    button {
        border: 1px solid red;
        padding: 5px 10px;
        margin: 5px;
    }
</style>