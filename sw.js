// offline cache: the whole game is one page, so caching it lets the app start without a connection
const C='aschenkronen-v2',FILES=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./fonts/PixelifySans.ttf','./fonts/OFL.txt'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))))));
// network first, so updates arrive; the cache is the fallback when offline
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));});
