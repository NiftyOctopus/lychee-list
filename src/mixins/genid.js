export const genid = {
    data() { return {
        
    }},
    methods: {
        createID(n=5) {
            const time = this.getTimeCode()
            if(n < 1) { return time }
            return time + '' + this.getRandomCode(n)
        },
        getTimeCode() {
            const ref = new Date(2020, 0, 1).getTime()
            const now = new Date().getTime()
            return (now - ref).toString(36)
        },
        getRandomCode(n) {
            const max   = parseInt('z'.repeat(n), 36)
            const value = Math.floor(Math.random() * max)
            return value.toString(36)
        }
    }
}
