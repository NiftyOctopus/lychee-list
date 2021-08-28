<template>
    <div class='item' v-if='showCompleted || !item.done'>
        <div class='actions'>
            <img class='icon edit'   src='../assets/icons/edit.svg'  @click='editItem'>
            <img class='icon delete' src='../assets/icons/trash.svg' @click='deleteItem'>
        </div>

        <div class='wrapper'
            v-bind:class='{ open }'
            @touchstart='startSwipe'
            @touchmove='swiping'>
        
            <div class='name' @click='toggleItem'>
                <span v-bind:class='{ done: item.done }'>
                    <span>{{ item.name }}</span>
                    <span v-if='amountWithUnit'>, {{ amountWithUnit }}</span>
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
        props: ['i', 'item'],
        data() { return { open: false, pos: 0, start: 0 }},
        computed: {
            ...mapState(['showCompleted']),

            amountWithUnit() {
                if(!this.item.amount || !this.item.unit) { return null }
                const whole = Math.floor(this.item.amount)

                let amt = whole > 0 ? whole : ''
                const n = this.fraction.n
                const d = this.fraction.d
                if(n > 0) { amt = amt + ' ' + n + '/' + d }

                return amt + ' ' + this.item.unit
            }
        },
        methods: {
            async toggleItem() {
                if(this.item.recipe === 0) {
                    try {
                        const done = this.item.done ? 0 : 1
                        this.$store.commit('toggleItem', this.item)
                        await this.$db.items.update(this.item.id, { done })
                    
                    } catch(e) { alert(e) }
                }
            },
            startSwipe(event) {
                this.start = event.touches[0].clientX
            },
            swiping(event) {
                const delta = this.start - event.touches[0].clientX
                
                if(!this.open && delta >  50) { this.open = true  }
                if( this.open && delta < -50) { this.open = false }
            },
            editItem() {
                try {
                    const item = Object.assign({ i: this.i, prev: this.item.category }, this.item)
                    this.$store.commit('setItem', item)

                    let route = this.item.unit ? '/amount' : '/unit'
                    if(this.item.category == 'Other') { route = '/category' }
                    this.$router.push(route)
                
                } catch(e) { alert(e) }
            },
            async deleteItem() {
                try {
                    this.open  = false
                    const item = Object.assign({ i: this.i }, this.item)

                    this.$store.commit('deleteItem', item)
                    await this.$db.items.delete(this.item.id)
                
                } catch(e) { alert(e) }
            }
        }
    }
</script>



<style scoped>
    .item {
        position: relative;
        margin:   -1px 0;
        background-color: lightgray;
        
        border-top:    1px solid lightgray;
        border-bottom: 1px solid lightgray;
    }

    .wrapper {
        position: relative;
        right:    0;
        padding:  7px;
        z-index:  10;

        background-color: #f2f2f2;

        transition: right 250ms;
        transition-timing-function: cubic-bezier(0.32, 1.69, 0.6, 0.8);
    }

    .done {
        text-decoration: line-through;
        color: gray;
    }

    .actions {
        display:         flex;
        flex-flow:       row nowrap;
        justify-content: center;
        align-items:     center;

        position: absolute;
        right:    5px;
        height:   100%;
    }

    .open {
        right: 80px;
        background-color: #f2f2f2;
    }

    .icon {
        margin: 0 5px;
    }
</style>