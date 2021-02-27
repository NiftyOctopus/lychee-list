<template>
    <div class='item' @click='toggleItem'>
        <div class='actions'>
            <!-- <img class='icon' src='../assets/icons/shopping-cart.svg'> -->
            <!-- <img class='icon' src='../assets/icons/shopping-cart.svg'> -->
            Hi :)
        </div>

        <div class='wrapper' v-bind:class="{ open: open }" @touchstart='startSwipe' @touchmove='swiping' @touchend='endSwipe'>
            <div class='name'>
                <span>{{ item.name }}</span>
                <div v-if='item.done' class='done'></div>
            </div>
        </div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'item',
        components: { /* Subcomponents */ },
        props: ['i', 'item'],
        data() { return { open: false, pos: 0, start: 0 }},
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
            toggleItem() {
                const item = Object.assign({ i: this.i }, this.item)
                this.$store.commit('toggleItem', item)
            },
            startSwipe(event) {
                this.start = event.touches[0].clientX
            },
            swiping(event) {
                //this.end = event.touches[0].clientX
                const delta = this.start - event.touches[0].clientX
                
                if(!this.open && delta >  50) { this.open = true  }
                if( this.open && delta < -50) { this.open = false }
            },
            endSwipe(event) {

            },
        }
    }
</script>



<style scoped>
    .item {
        position: relative;
    }

    .wrapper {
        position: relative;
        right: 0;
        /* border: 1px solid blue; */
        background-color: white;
        transition: right 250ms;
        
    }

    .name {
        display:  inline-block;
        position: relative;
    }

    .done {
        position: absolute;
        top:    0;
        left:  -3px;
        right: -3px;
        height: 50%;
        border-bottom: 1px solid black;
    }

    .actions {
        position: absolute;
        right: 5px;
        background-color: red;
        z-index: -1;
    }

    .open {
        right: 50px;
    }
</style>