<template>
    <div class='search'>
        <div class='wrapper'>
            <input id='input' type='text' v-model='text' @keyup='key'>
            <img class='icon' src='../assets/icons/search.svg'>
        </div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'search',
        components: { /* Subcomponents */ },
        props: ['init'],
        data() { return { text: '', timer: null }},
        beforeCreate() {},
        created() { this.text = this.init },
        mounted() { /*document.getElementById('input').focus()*/ },
        updated() {},
        computed: { /*
            Creates a new property
            Updates when any dependant property changes */
        },
        watch: {
            text: function() {
                window.clearTimeout(this.timer)
                this.timer = window.setTimeout(() => this.$emit('update', this.text), 250)
            }
        },
        methods: {
            key(event) {
                if(event.key == 'Enter') {
                    this.$emit('update', this.text)
                    this.$emit('forward')
                }
            }
        }
    }
</script>



<style scoped>
    .wrapper {
        position: relative;
        display: inline-block;
    }

    .icon {
        position: absolute;
        top: 6px;
        right: 6px;
        opacity: 0.4;
    }

    input[type=text] {
        appearance:  none;
        font-size:   16px;
        font-weight: bold;
        text-align:  center;
        border:      2px solid lightgray;
        outline:     none;
    }

    input:focus {
        border: 2px solid #e8385b !important;
    }
</style>