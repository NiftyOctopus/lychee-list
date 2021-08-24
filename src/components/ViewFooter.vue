<template>
    <div class='view-footer'>
        <img v-if='allowAdd'    class='icon' src='../assets/icons/plus-circle.svg' @click='add'>
        <img v-if='allowSave'   class='icon' src='../assets/icons/save.svg'        @click='save'>
        <img v-if='allowDelete' class='icon' src='../assets/icons/trash.svg'       @click='del'>
    </div>
</template>



<script>
    import { convert }  from '../mixins/convert'
    import { mapState } from 'vuex'

    export default {
        name: 'view-footer',
        mixins: [convert],
        props: ['allowAdd', 'allowSave', 'allowDelete'],
        computed: {
            ...mapState(['item', 'log']),
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
        padding:    10px;
        z-index:    100;
        display:            flex;
        flex-flow:          row nowrap;
        justify-content:    center;
        align-items:        center;
        background-color: lightgray;
    }

    img {
        margin: 0 10px;
    }
</style>