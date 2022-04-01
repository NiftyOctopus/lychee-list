workbox.core.setCacheNameDetails({ prefix: 'lychee-list' }) 
workbox.core.skipWaiting()

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim())
})

self.addEventListener('message', event => {
    console.log('Hello from service worker')
})