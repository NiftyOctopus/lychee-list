<template>
    <div class='unit-view view'>
        <view-header title='Unit of Measure' fwd=true @back='back' @forward='forward'></view-header>

        <div v-for='group in units' :key='group.type'>
            <div class='group-header'>{{ group.type }}</div>

            <div class='option'
                v-for='unit in group.units'
                :key='unit.name'
                @click='selectUnit(unit)'
                v-bind:class='{ selected: item.unit == unit.abbr }'>
            
                <span>{{ unit.name }}</span>
            </div>
        </div>

        <view-footer :allowSave=true></view-footer>
    </div>
</template>



<script>
    import ViewHeader   from '../components/ViewHeader'
    import ViewFooter   from '../components/ViewFooter'
    import { mapState } from 'vuex'


    export default {
        name: 'unit-view',
        components: { ViewHeader, ViewFooter },
        computed: {
            ...mapState(['units', 'item'])
        },
        methods: {
            selectUnit(unit) {
                this.$store.commit('update', ['item.unit', unit.abbr])
                this.$router.push('amount')
            },
            back() {
                this.$router.push('category')
            },
            forward() {
                this.$router.push('amount')
            }
        }
    }
</script>



<style scoped>

</style>