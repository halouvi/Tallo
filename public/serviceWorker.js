/* servieWorker.js */
console.log('Service Worker Registered!');
self.addEventListener('install', event => {
    console.log('Installing service worker...');
    const urlsToCache = [
        '/',
    ];
    event.waitUntil(
        caches.open('my-cache1').then(cache => {
            return cache.addAll(urlsToCache)
        })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        // the response is resolved to null if there is no match 
        caches.match(event.request)
            .then(response => {
                let res = response;
                if (!res) {
                    res = fetch(event.request)
                }
                return res
            })
    );
})