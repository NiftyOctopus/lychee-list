<template>
    <div class='search'>
        <input type='text' v-model='text'>
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
        mounted() {},
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
        methods: {}
    }
</script>



<style scoped>
    input {
        font-size: 16px;
    }
</style>