export const fractionize = {
    data() { return {
        denominators: [2, 3, 4, 8, 16]
    }},
    computed: {
        decimal() {
            return this.value - Math.floor(this.value)
        },
        fraction() {
            let min = 100
            let d, x, n, e
            let fraction = {}

            for(let i in this.denominators) {
                d = this.denominators[i]
                x = this.decimal * d
                n = Math.ceil(x)
                e = (n - x) * (1 / d)

                if(e < min) {
                    min = e
                    fraction = { n, d }
                }
            }

            return fraction
        }
    }
}