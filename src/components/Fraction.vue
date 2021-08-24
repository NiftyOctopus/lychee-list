<template>
    <div class='fraction'>
        <div>{{ whole }}</div>
        
        <div id='frac' v-if='fraction.n < fraction.d'>
            <div class='numerator'  >{{ fraction.n }}</div>
            <div class='denominator'>{{ fraction.d }}</div>
        </div>
        
        <div>{{ value }}</div>
    </div>
</template>



<script>
    import { fractionize } from '../mixins/fractionize'

    export default {
        name:   'fraction',
        mixins: [fractionize],
        props:  ['value']
    }
</script>



<style scoped>
    .fraction {
        display:   inline-block;
        font-size: 22px;
    }

    .numerator {
        border-bottom: 1px solid black;
    }

    .numerator, .denominator {
        margin:  0px 5px;
        padding: 2px 8px;
    }
</style>