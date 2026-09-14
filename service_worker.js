// Retire Alpha 0.1 / 0.2 caches. The local server already works offline.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('venu'))await caches.delete(key);await self.clients.claim();await self.registration.unregister();})()));
