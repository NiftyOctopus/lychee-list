export const load = {
    data() { return {
        
    }},
    methods: {
        load() {
            this.loadList()
            this.loadRecipes()
        },
        async loadList() {
            const items = await this.$db.items.where('recipe').equals(0).filter((item) => {
                return !item.deleted
            }).toArray()
            
            this.$store.commit('setList', items)
        },
        async loadRecipes() {
            const recipes = await this.$db.recipes.filter((recipe) => {
                return !recipe.deleted
            }).toArray()
            
            this.$store.commit('setDefaultRecipes', recipes)
        }
    }
}