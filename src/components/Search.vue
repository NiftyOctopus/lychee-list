<template>
    <div class='search'>
        <div class='wrapper'>
            <input id='input' type='text' v-model='text' @keyup='key'>
            <img v-if='showIcon' class='icon' src='../assets/icons/search.svg'>
        </div>
    </div>
</template>



<script>
    export default {
        name: 'search',
        props: ['init', 'showIcon'],
        data() { return {
            text:  this.init,
            timer: null
        }},
        watch: {
            text: function() {
                window.clearTimeout(this.timer)
                this.timer = window.setTimeout(() => this.$emit('update', this.text), 250)
            }
        },
        methods: {
            key(event) {
                if(event.key == 'Enter') {
                    this.$emit('update', this.text)
                    this.$emit('forward')
                }
            }
        }
    }
</script>



<style scoped>
    .search {
        margin-top: 15px;
    }

    .wrapper {
        position: relative;
        display:  inline-block;
    }

    .icon {
        position: absolute;
        top:      8px;
        right:    7px;
        opacity:  0.4;
    }

    input {
        appearance:    none;
        font-family:  'Roboto', sans-serif;
        font-size:     18px;
        text-align:    center;
        border:        2px solid lightgray;
        outline:       none;
    }

    input:focus {
        border: 2px solid #e8385b;
    }
</style>