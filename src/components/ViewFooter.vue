<template>
    <div class='view-footer'>
        <img v-if='allowAdd'  class='icon' src='../assets/icons/plus-circle.svg' @click='add'>
        <img v-if='allowSave' class='icon' src='../assets/icons/save.svg' @click='save'>
        <div v-if='allowDelete' id='delete' @click='del'>DELETE</div>

        <div id='log'>
            <div v-for='(msg, index) in log' :key='index'>
                <span>{{ msg }}</span>
            </div>
        </div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { convert }  from '../mixins/convert'
    import { mapState } from 'vuex'

    export default {
        name: 'view-footer',
        mixins: [convert],
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
            ...mapState(['item', 'log']),
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            add() {
                this.$emit('add')
            },
            del() {
                this.$emit('delete')
            },
            async save() {
                await this.saveItem()
                this.$router.push(this.item.recipe ? 'recipe/' + this.item.recipe : '/')
                this.$store.commit('clearItem')
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

    #delete {
        color: salmon;
        font-weight: bold;
        font-size: 14px;
        margin-top: 10px;
    }

    #log {
        padding-left: 5px;
        font-family: monospace;
        text-align: left;
        font-size: 12px;
    }
</style>