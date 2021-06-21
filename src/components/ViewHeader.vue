<template>
    <div class='view-header'>
        <div v-if='item.recipe && recipe && item.recipe == recipe.id'>{{ recipe.name }}</div>
        <div class='item-details' v-if="this.$route.path != '/item'">
            <span>{{ item.name }}</span>
            <span v-if='item.category'>&nbsp;[{{ item.category }}]</span>
            <span v-if='item.unit'>&nbsp;{{ item.amount }} {{ item.unit }}</span>
        </div>

        <div class='view-title'>
            <img class='icon' src='../assets/icons/arrow-left-circle.svg' @click='back'>
            <span class='title'>{{ title }}</span>
            <img v-if='fwd'  class='icon' src='../assets/icons/arrow-right-circle.svg' @click='forward'>
        </div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { mapState }   from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        name: 'view-header',
        components: { /* Subcomponents */ },
        props: ['title', 'fwd'],
        data() { return {

        }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['item']),
            ...mapGetters(['recipe'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            forward() {
                this.$emit('forward')
            },
            back() {
                this.$emit('back')
            }
        }
    }
</script>



<style scoped>
    .view-title {
        display:         flex;
        align-items:     center;
        justify-content: center;
    }

    .title {
        margin: 0 5px 0 5px;
    }

    .item-details {
        font-size: 14px;
    }
</style>