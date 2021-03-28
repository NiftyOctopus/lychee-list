<template>
    <div class='view-footer'>
        <img v-if='allowAdd'  class='icon' src='../assets/icons/plus-circle.svg' @click='add'>
        <img v-if='allowSave' class='icon' src='../assets/icons/save.svg' @click='save'>
        <div v-if='allowDelete'>Delete Recipe</div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'view-footer',
        components: { /* Subcomponents */ },
        props: ['allowAdd', 'allowSave', 'allowDelete'],
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
            add() {
                this.$emit('add')
            },
            save() {
                this.$emit('save')
            }
        }
    }
</script>



<style scoped>
    .view-footer {
        position:   fixed;
        bottom:     0;
        left:       0;
        right:      0;
        padding:    5px 5px 25px 5px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.7);
    }
</style>