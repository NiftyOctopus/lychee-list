// Helps webpack understand .vue files
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}