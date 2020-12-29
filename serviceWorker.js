// on update le nom du cache
const staticCacheName = "cache-v1";
const assets = [
  "/",
  "/index.html",
  "/styles.css",
  "/assets/LibreBaskerville-Regular.ttf",
  "/assets/icons/icon-128x128.png",
  "/assets/icons/icon-512x512.png",
];

// mise en cache
self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
      // install events is not finished until this promess is resolved
    })
  );
});

// supprimer les anciens caches
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch la data when offline
self.addEventListener("fetch", (evt) => {
  // console.log("fetch event", evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
