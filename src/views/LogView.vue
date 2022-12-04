<template>
    <div id='log-view' class='view'>
        <div class='view-header'>
            <div id='view-title'>
                <span>Log</span>
            </div>
        </div>

        <div><button @click='clear'>Clear</button></div>

        <table style='font-family: monospace'>
            <tr v-for='entry in logs' :key='entry.t'>
                <td style='background-color: lightgray'>{{ entry.t.toFixed(0) }}</td>
                <td style='text-align: left; padding-left: 0.5em'>{{ entry.msg }}</td>
            </tr>
        </table>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'
    import { mapState }  from 'vuex'
    import { margin }    from '../mixins/margin'

    export default {
        name: 'log-view',
        components: { /* Subcomponents */ },
        mixins: [margin],
        props: [/* Inputs */],
        data() { return { }},
        beforeCreate() {},
        created() {},
        mounted() {
            this.updateViewMargin()
        },
        updated() {},
        computed: {
            ...mapState(['logs'])
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {
            clear() {
                this.$store.commit('clearLogs')
            }
        }
    }
</script>