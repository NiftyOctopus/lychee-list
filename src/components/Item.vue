<template>
    <div class='item' v-if='showCompleted || !item.done'>
        <div class='actions'>
            <img class='icon edit'   src='../assets/icons/edit.svg'  @click='editItem'>
            <img class='icon delete' src='../assets/icons/trash.svg' @click='deleteItem'>
        </div>

        <div class='wrapper' v-bind:class="{ open: open }" @touchstart='startSwipe' @touchmove='swiping' @touchend='endSwipe'>
            <div class='name' @click='toggleItem'>
                <span v-bind:class="{ done: item.done }">
                    <span>{{ item.name }}</span>
                    <span v-if='amount'>, {{ amount }}</span>
                </span>
            </div>
        </div>
    </div>
</template>



<script>
    import { fractionize } from '../mixins/fractionize'
    import { mapState } from 'vuex'

    export default {
        name: 'item',
        mixins: [fractionize],
        components: { /* Subcomponents */ },
        props: ['i', 'item'],
        data() { return { open: false, pos: 0, start: 0 }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: {
            ...mapState(['showCompleted']),
            value() {
                return this.item.amount
            },
            amount() {
                if(!this.item.amount || !this.item.unit) { return null }

                const whole = Math.floor(this.item.amount)
                let amt = whole > 0 ? whole : ''

                const n = this.fraction.n
                const d = this.fraction.d
                if(n > 0) { amt = amt + ' ' + n + '/' + d }

                return amt + ' ' + this.item.unit
            }
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            async toggleItem() {
                if(this.item.recipe === 0) {
                    const item = Object.assign({ i: this.i }, this.item)
                    this.$store.commit('toggleItem', item)
                    await this.$db.items.update(this.item.id, { done: !this.item.done })
                }
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
            editItem() {
                const data = { prev: this.item.category, i: this.i }
                const item = Object.assign(data, this.item)
                this.$store.commit('setItem', item)
                this.$router.push(this.item.unit ? '/amount' : '/unit')
            },
            async deleteItem() {
                try {
                    this.open = false
                    const item = Object.assign({ i: this.i }, this.item)
                    this.$store.commit('deleteItem', item)
                    await this.$db.items.delete(this.item.id)
                
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>
    .item {
        position: relative;
        /* border: 1px solid red; */
        margin: 2px 0;
        /* font-size: 70px; */
    }

    .wrapper {
        display: flex;
        position: relative;
        
        padding: 2px;
        right: 0;
        /* border: 1px solid green; */
        background-color: white;
        transition: all 250ms;
        transition-timing-function: cubic-bezier(0.32, 1.69, 0.6, 0.8);
        z-index: 20;
    }

    .name {
        /* display:  flex; */
        position: relative;
        /* border: 1px solid black; */
        margin: 0 auto;
    }

    .done {
        text-decoration: line-through;
        color: gray;
        /* position: absolute;
        top:    0;
        left:  -3px;
        right: -3px;
        height: 50%;
        border-bottom: 1px solid black; */
    }

    .actions {
        display: flex;
        position: absolute;
        right: 5px;
        height: 100%;
        /* background-color: gray; */
        z-index: -1;
        /* border: 1px solid blue; */
        padding: 0;
        z-index: 10;
    }

    .open {
        right: 74px;
        background-color: #f2f2f2;
    }


    .icon {
        /* border: 1px solid black; */
        /* background-color: lightblue; */
        padding: 0 4px;
        margin: 0 1px;
    }

    .edit {
        background-color: lightskyblue
    }

    .delete {
        background-color: lightsalmon;
    }
</style>