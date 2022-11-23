<template>
    <div class='view-footer'>
        <div id='footer-left'>
            <img class='icon heart' src='../assets/icons/heart.svg' @click='like'>
        </div>

        <div id='footer-center'>
            <img v-if='allowAdd'  class='icon' src='../assets/icons/plus-circle.svg' @click='add'>
            <img v-if='allowSave' class='icon' src='../assets/icons/save.svg'        @click='save'>
        </div>

        <div id='footer-right'>
            <img v-if='allowDelete' class='icon' src='../assets/icons/trash.svg' @click='del'>
        </div>

        <donate v-if='donate' @cancel='close'></donate>
    </div>
</template>



<script>
    import   Donate     from '../components/Donate'
    import { convert  } from '../mixins/convert'
    import { mapState } from 'vuex'

    export default {
        name: 'view-footer',
        components: { Donate },
        mixins: [convert],
        props: ['allowAdd', 'allowSave', 'allowDelete'],
        data() { return { donate: false }},
        computed: {
            ...mapState(['item']),
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
                this.$router.push(this.item.recipe ? '/recipe/' + this.item.recipe : '/')
                this.$store.commit('clearItem')
            },
            like() {
                this.donate = true
            },
            close() {
                this.donate = false
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
        flex-direction:     row;
        justify-content:    space-between;
        background-color: #f2f2f2;
    }

    .view-footer > div {
        flex-grow:  1;
        flex-basis: 0;
    }

    #footer-left {
        text-align: left;
    }

    #footer-right {
        text-align: right;
    }

    .icon {
        margin: 0 3px;
    }

    .heart {
        opacity: 0.3;
    }
</style>