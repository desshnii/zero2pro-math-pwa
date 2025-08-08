const CACHE='z2p-v3';
const ASSETS=['./','./index.html','./app.js','./styles.css','./manifest.json','./data/days.json','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone(); if(e.request.url.startsWith(self.location.origin)){caches.open(CACHE).then(c=>c.put(e.request,copy));} return resp;}).catch(()=>caches.match('./index.html'))));});