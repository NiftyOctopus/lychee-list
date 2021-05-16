import { mapGetters } from 'vuex'

export const convert = {
    data() { return {

    }},
    computed: {
        ...mapGetters(['conversions']),
    },
    methods: {
        getNewAmount(existing) {
            const to   = existing.unit
            const from = this.item.unit
            if(!to && !from) { return null }

            const conv = to && from ? this.conversions[from][to] : null
            if(!conv) { throw 'Cannot combine amounts with different unit types' }
            
            return existing.amount + (this.item.amount * conv)
        }
    }
}