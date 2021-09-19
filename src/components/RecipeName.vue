<template>
    <div v-if='recipe' class='recipe-name view-header'>
        <input placeholder='Recipe Name'
            type='text'
            v-model='name'
            @blur='saveName'>
    </div>
</template>



<script>
    export default {
        name: 'recipe-name',
        props: ['recipe'],
        data() { return { name: this.recipe.name }},
        methods: {
            async saveName() {
                try {
                    await this.$db.recipes.update(this.recipe.id, { name: this.name })
                    this.$store.commit('saveRecipeName', { id: this.recipe.id, name: this.name })
                
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>
    input {
        appearance:    none;
        padding:       0;
        width:         80%;
        font-family:  'Roboto', sans-serif;
        font-size:     18px;
        font-weight:   bold;
        text-align:    center;
        background:    none;
        outline:       none;
        border:        none;
        border-top:    2px solid #ffd966;
        border-bottom: 2px solid #ffd966;
        border-radius: 0;
    }

    input:focus {
        border-bottom: 2px solid #e8385b;
    }
</style>