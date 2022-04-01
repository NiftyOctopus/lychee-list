workbox.core.setCacheNameDetails({ prefix: 'lychee-list' }) 
workbox.core.skipWaiting()

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})