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
                    const updated = new Date().toISOString()
                    await this.$db.recipes.update(this.recipe.id, { name: this.name, updated })
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
        color:       #262626;
        text-align:    center;
        background:    none;
        outline:       none;
        border:        none;
        border-top:    2px solid #fad1d8;
        border-bottom: 2px solid #fad1d8;
        border-radius: 0;
    }

    input:focus {
        border-bottom: 2px solid #0d5173;
    }
</style>