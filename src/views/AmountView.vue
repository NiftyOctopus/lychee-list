<template>
    <div class='amount-view view'>
        <view-header title='How much?'></view-header>
        <!-- <div style='margin-top: 150px'><button @click='getRandomValue'>Refresh</button></div> -->
        <div style='margin-top: 150px;'>Amt: {{ item.amount }}</div>
        <!-- <div><fraction :value='value'></fraction></div> -->
        
        <adjuster d=2></adjuster>
        <adjuster d=3></adjuster>
        <adjuster d=4></adjuster>
        <view-footer :allowSave=true @save='saveItem'></view-footer>
    </div>
</template>



<script>
    import ViewHeader from '../components/ViewHeader'
    import ViewFooter from '../components/ViewFooter'
    import Fraction   from '../components/Fraction'
    import Adjuster   from '../components/Adjuster'

    import { convert }  from '../mixins/convert'
    import { mapState } from 'vuex'

    export default {
        name: 'amount-view',
        mixins: [convert],
        components: { ViewHeader, ViewFooter, Fraction, Adjuster },
        props: [/* Inputs */],
        data() { return { value: 1 }},
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
            setAmount(amount) {
                //alert('WTF')
                //this.$store.commit('updateItemAmount', 6)
            },
            async saveItem() {
                this.$store.commit('saveItem')

                try {
                    // There is already a list item that matches the name and category
                    const index = { name: this.item.name, category: this.item.category }
                    let existingItem = await this.$db.list.where(index).first()
                    
                    if(existingItem) {
                        existingItem.amount = this.getNewAmount(existingItem)
                        await this.$db.list.put(existingItem)

                    } else {
                        // Brand new item
                        await this.$db.list.add(this.item)
                    }
                }
                catch(error) { alert(error) }

                this.$store.commit('clearItem')
                this.$router.push('/')
            },
            getRandomValue() {
                this.value = Math.random() * 10
                this.setAmount(this.value)
            }
        }
    }
</script>



<style scoped>

</style>