workbox.core.setCacheNameDetails({ prefix: 'lychee-list' }) 
workbox.core.skipWaiting()

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim())
})

const ENDPOINTS = {
    dev:  'http://127.0.0.1:8787/api/',
    prod: 'https://lychee.niftyoctopus.com/api/'
}

const ENV = self.location.hostname === 'localhost' ? 'dev' : 'prod'
const API = ENDPOINTS[ENV]

self.addEventListener('message', event => {
    console.log('Hello from service worker')
    self.setTimeout(() => fetch(API + 'ping'), 10000)
})