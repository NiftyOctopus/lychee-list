<template>
    <div class='recipe'>
        <img class='add' src='../assets/icons/plus.svg' @click='addRecipeItems'>
        <router-link class='open' :to="'/recipe/' + recipe.id">{{ name }}</router-link>
    </div>
</template>



<script>
    import { convert }  from '../mixins/convert'
    import { mapState } from 'vuex'

    export default {
        name:   'recipe',
        mixins: [convert],
        props:  ['recipe'],
        computed: {
            ...mapState(['item']),

            name() {
                const name = this.recipe.name
                return name ? name : 'Recipe ' + this.recipe.id
            }
        },
        methods: {
            async addRecipeItems() {
                try {
                    const items = await this.$db.items.where('recipe').equals(this.recipe.id).toArray()
                    let item
                
                    for(let i in items) {
                        item = items[i]
                        delete item.id
                        item.recipe = 0
                    
                        this.$store.commit('setItem', item)
                        await this.saveItem()
                    }

                    this.$store.dispatch('message', { text: 'Added!' })
                } catch(e) { alert(e) }
            }
        }
    }
</script>



<style scoped>
    .recipe {
        display:         flex;
        flex-flow:       row nowrap;
        justify-content: left;
        align-items:     center;
    }

    .add {
        margin: 10px;
    }

    .open {
        text-decoration: none;
        color: black;
    }
</style>