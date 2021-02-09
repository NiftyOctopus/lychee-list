<template>
    <div id='grocery-list-view' class='view'>
        <div class='view-title'>Grocery List</div>

        <div v-for='group in list' :key='group.category'>
            <div class='group-header'>{{ group.category }}</div>
            <div v-for='item in group.items' :key='item.name'>{{ item.name }}</div>
        </div>
    </div>
</template>



<script>
    //import SubComponent from '../components/SubComponent'

    export default {
        name: 'grocery-list-view',
        components: { /* Subcomponents */ },
        props: [/* Inputs */],
        data() { return {
            list: [{
                    category: 'Produce',
                    items: [
                        { name: 'Bananas' },
                        { name: 'Apples' },
                        { name: 'Strawberries' },
                        { name: 'Grapes' },
                        { name: 'Oranges' },
                        { name: 'Potatoes' },
                        { name: 'Tomatoes' },
                        { name: 'Onions' },
                        { name: 'Carrots' },
                        { name: 'Broccoli' }
                ]}, {
                    category: 'Baking and Spices',
                    items: [
                        { name: 'Flour' },
                        { name: 'Sugar' },
                        { name: 'Powdered sugar' },
                        { name: 'Brown sugar' },
                        { name: 'Baking powder' },
                        { name: 'Yeast' },
                        { name: 'Cornstarch' },
                        { name: 'Powdered sugar' }
                ]}, {
                    category: 'Dairy',
                    items: [
                        { name: 'Milk' },
                        { name: 'Heavy cream' },
                        { name: 'Greek yogurt' },
                        { name: 'Unsalted butter' },
                        { name: 'Cheddar cheese' },
                        { name: 'Parm cheese' },
                ]}
            ]
        }},
        beforeCreate() {},
        created() {},
        mounted() {},
        updated() {},
        computed: { /*
            Creates a new property
            Updates when any dependant property changes */
        },
        watch: { /*
            Watches an existing property
            Only runs when the watched property changes */
        },
        methods: {}
    }
</script>



<style scoped>

</style>