import { mapGetters } from 'vuex'

export const convert = {
    data() { return {

    }},
    computed: {
        ...mapGetters(['conversions']),
    },
    methods: {
        async saveItem() {
            try {
                this.prepareItem()
                if(this.item.id) {
                    await this.editExistingItem()
                
                } else {
                    let existing = await this.getExistingItem()

                    if(existing) {
                        await this.appendExistingItem(existing)

                    } else {
                        await this.addItem()
                    }
                }
            }
            catch(error) { alert(error) }
        },
        prepareItem() {
            if(!this.item.name) {
                throw 'Item name cannot be blank'
            }

            if(!this.item.category) {
                this.$store.commit('update', ['item.category', 'Other'])
            }

            if(!this.item.unit) {
                this.$store.commit('update', ['item.amount', null])
            }

            if(!this.item.amount) {
                this.$store.commit('update', ['item.unit', null])
            }
        },
        getExistingItem() {
            const index   = ['name', 'category', 'recipe']
            const filters = [this.item.name, this.item.category, this.item.recipe]
            return this.$db.items.where(index).equals(filters).first()
        },
        async editExistingItem() {
            let existing = Object.assign({}, this.item)
            existing.updated = new Date().toISOString()

            await this.$db.items.update(this.item.id, existing)
            this.$store.commit('editExistingItem')
        },
        async appendExistingItem(existing) {
            if(this.item.recipe) { throw 'This item already exists in the recipe' }

            const amount     = this.getNewAmount(existing)
            existing.amount  = amount
            existing.updated = new Date().toISOString()
            await this.$db.items.update(existing.id, existing)
        
            this.$store.commit('update', ['item.amount', amount])
            this.$store.commit('update', ['item.unit', existing.unit])
            this.$store.commit('appendExistingItem')
        },
        getNewAmount(existing) {
            const to   = existing.unit
            const from = this.item.unit
            if(!to && !from) { return null }

            const conv = to && from ? this.conversions[from][to] : null
            if(!conv) { throw 'Cannot combine amounts with different unit types' }
            
            return existing.amount + (this.item.amount * conv)
        },
        async addItem() {
            let existing = Object.assign({}, this.item)
            existing.updated = new Date().toISOString()
            await this.$db.items.add(existing)

            const mutation = this.item.recipe ? 'addItemToRecipe' : 'addItemToList'
            this.$store.commit(mutation)
        }
    }
}