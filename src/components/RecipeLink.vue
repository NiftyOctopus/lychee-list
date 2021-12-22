<template>
    <div class='recipe-link'>
        <div class='buttons'>
            <a :href='recipe.url' target='_blank' rel='noopener noreferrer'>
                <img class='icon' src='../assets/icons/external-link.svg'>
            </a>

            <img class='icon' src='../assets/icons/copy.svg' @click='copy()'>
            <img class='icon' src='../assets/icons/clipboard.svg' @click='paste()'>
        </div>

        <input placeholder='Recipe Link'
            id='url'
            type='url'
            v-model='url'
            @blur='save()'>
    </div>
</template>



<script>
    export default {
        name: 'recipe-link',
        props: ['recipe'],
        data() { return { url: this.recipe.url }},
        methods: {
            copy() {
                this.clipboard('copy')
                this.$store.dispatch('message', { text: 'Link copied' })
            },
            paste() {
                this.clipboard('paste')
            },
            clipboard(action) {
                const input = document.getElementById('url')
                input.select()
                document.execCommand(action)
                input.blur()
            },
            async save() {
                try {
                    await this.$db.recipes.update(this.recipe.id, { url: this.url })
                    this.$store.commit('updateRecipeURL', { id: this.recipe.id, url: this.url })
                
                } catch(e) {
                    alert(e)
                }
            }
        }
    }
</script>



<style scoped>
    .recipe-link {
        margin: 20px 0;
    }

    .buttons {
        display:         flex;
        justify-content: center;
        align-items:     center;
    }

    .buttons > * {
        display: flex
    }

    .icon {
        margin:  5px 10px;
        opacity: 0.55;
    }

    input {
        appearance:    none;
        padding:       2px 0 2px 5px;
        width:         90%;
        font-family:  'Roboto', sans-serif;
        font-size:     16px;
        color:       #3271e7;
        outline:       none;
        border:        none;
        border-radius: 0;
        background-color: #d9d9d9;
    }
</style>