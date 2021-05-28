<template>
    <div class='view-footer'>
        <img v-if='allowAdd'  class='icon' src='../assets/icons/plus-circle.svg' @click='add'>
        <img v-if='allowSave' class='icon' src='../assets/icons/save.svg' @click='save'>
        <div v-if='allowDelete'>Delete Recipe</div>
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
            ...mapState(['item']),
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            add() {
                this.$emit('add')
            },
            async save() {
                try {
                    this.prepareItem()
                    if(this.item.id) {
                        // Editing a specific existing item
                        await this.$db.items.update(this.item)
                    
                    } else {
                        let existing = await this.getExistingItem()

                        if(existing) {
                            if(this.item.recipe) { throw 'This item already exists in the recipe' }

                            const amount    = this.getNewAmount(existing)
                            existing.amount = amount
                            await this.$db.items.update(existing.id, existing)
                            
                            // Update item in store
                            this.$store.commit('setItemAmount', amount)
                            this.$store.commit('updateExistingItem')

                        } else {
                            // Brand new item
                            await this.$db.items.add(this.item)
                            
                            // Update item in store
                            this.$store.commit('addNewItem')
                        }
                    }
                }
                catch(error) { alert(error) }

                this.$store.commit('clearItem')
                this.$router.push('/')
            },
            prepareItem() {
                if(!this.item.name) {
                    throw 'Item name cannot be blank'
                }

                if(!this.item.category) {
                    this.$store.commit('setItemCategory', 'Other')
                }

                if(!this.item.unit) {
                    this.$store.commit('setItemAmount', null)
                }

                if(!this.item.amount) {
                    this.$store.commit('setItemUnit', null)
                }
            },
            getExistingItem() {
                const index   = ['name', 'category', 'recipe']
                const filters = [this.item.name, this.item.category, this.item.recipe]
                return this.$db.items.where(index).equals(filters).first()
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