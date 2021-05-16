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
            const conv = this.conversions[from][to]

            if(!conv) { throw 'Cannot combine amounts with different unit types' }
            return existing.amount + (this.item.amount * conv)
        }
    }
}