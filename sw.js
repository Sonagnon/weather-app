self.addEventListener("install", evt =>{
    evt.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "style.css", "images/photo-1578086591939-f3e05b7dbfdd.jpg"]);
        })
    );
});

self.addEventListener("fetch", evt =>{
    evt.respondWith(
        caches.match(evt.request).then(response => {
            return response || fetch(evt.request);
        })
    );
}); 