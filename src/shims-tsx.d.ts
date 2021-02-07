// Adds support for .tsx files and jsx syntax
import Vue, { VNode } from 'vue'

declare global {
    namespace JSX {
        interface Element      extends VNode {}
        interface ElementClass extends Vue   {}
        
        interface IntrinsicElements {
            [elem: string]:any
        }
    }
}