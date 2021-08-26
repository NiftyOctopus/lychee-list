export const margin = {
    data() { return {
        
    }},
    methods: {
        updateViewMargin() {
            const header = document.getElementsByClassName('view-header')[0]
            const view   = document.getElementsByClassName('view')[0]
        
            view.style.marginTop = header.offsetHeight + 35 + 'px'
        }
    }
}