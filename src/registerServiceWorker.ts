import { register } from 'register-service-worker'
import { store } from './store'

if(process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        
        ready() {
            const text = 'Loaded from cache'
            console.log(text)
            store.dispatch('message', { text })
        },
        registered() {
            const text = 'Service worker registered'
            console.log(text)
        },
        cached() {
            const text = 'Cached for offline use'
            console.log(text)
            store.dispatch('message', { text })
        },
        updatefound() {
            const text = 'Downloading updates'
            console.log(text)
            store.dispatch('message', { text })
        },
        updated() {
            const text = 'Updates available'
            console.log(text)
            store.dispatch('message', { text })
        },
        offline () {
            const text = 'Offline mode'
            console.log(text)
            store.dispatch('message', { text })
        },
        error (error) {
            const text = 'Service worker error'
            console.error('text', error)
            store.dispatch('message', { text })
        }
    })
}