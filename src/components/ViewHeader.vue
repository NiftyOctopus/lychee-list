<template>
    <div class='view-header'>
        <div id='item-recipe'
            v-if='item.recipe && recipe && item.recipe == recipe.id'>
            <span>{{ recipe.name }}</span>
        </div>

        <div id='item-details' v-if="this.$route.path != '/item'">
            <span>{{ item.name }}</span>
            <span v-if='item.category'>&nbsp;[{{ item.category }}]</span>
        </div>

        <div id='view-title'>
            <img class='icon' src='../assets/icons/chevron-left.svg' @click='back'>
            <span id='title'>{{ title }}</span>

            <img class='icon'
                v-bind:class="{ hide: !this.fwd }"
                src='../assets/icons/chevron-right.svg'
                @click='forward'>
        </div>
    </div>
</template>



<script>
    import { mapState }   from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        name: 'view-header',
        props: ['title', 'fwd'],
        computed: {
            ...mapState(['item']),
            ...mapGetters(['recipe'])
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
    #item-recipe {
        font-size:     14px;
        font-weight:   bold;
        margin-bottom: 3px;
    }

    #item-details {
        font-size:     14px;
        margin-bottom: 3px;
    }

    #view-title {
        display:         flex;
        flex-flow:       row nowrap;
        justify-content: center;
        align-items:     center;
    }

    #title {
        margin: 0 10px 0 10px;
    }
</style>