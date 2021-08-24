export const fractionize = {
    data() { return {
        denominators: [2, 3, 4]
    }},
    computed: {
        whole() {
            if(this.fraction.n < this.fraction.d) { return Math.floor(this.value) }
            return Math.ceil(this.value)
        },
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
                n = Math.round(x)
                e = Math.abs(n - x) * (1 / d)

                if(e < min) {
                    min = e
                    fraction = { n, d }
                }
            }

            return fraction
        }
    }
}