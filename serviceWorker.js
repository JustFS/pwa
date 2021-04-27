const staticCacheName = "cache-v1";
const assets = ["/", "/index.html"];

// ajout de fichiers en cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(evt.request.url.indexOf("http") === 0)) return; // skip the request. if request is not made with http protocol

  evt.respondWith(
    caches
      .match(evt.request)
      .then(
        (cacheRes) =>
          cacheRes ||
          fetch(evt.request).then((fetchRes) =>
            caches.open(staticCacheName).then((cache) => {
              cache.add(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(staticCacheName, 75);
              return fetchRes;
            })
          )
      )
      .catch(() => caches.match("/fallback"))
  );
});

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// supprimer caches (promise.add déprécié)
// self.addEventListener("activate", (e) => {
//   e.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.add(
//         keys
//           .filter((key) => key !== staticCacheName)
//           .map((key) => caches.delete(key))
//       );
//     })
//   );
// });
