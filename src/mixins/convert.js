import { mapGetters } from 'vuex'

export const convert = {
    data() { return {

    }},
    computed: {
        ...mapGetters(['conversions']),
    },
    methods: {
        getNewAmount(existingItem) {
            const to   = existingItem.unit
            const from = this.item.unit
            const conv = this.conversions[from][to]
            return existingItem.amount + (this.item.amount * conv)
        }
    }
}