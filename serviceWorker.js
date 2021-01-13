const staticCacheName = "cache-v1";
const assets = ["/", "/index.html"];

// ajout fichiers en cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// fetch event
self.addEventListener("fetch", function (event) {
  console.log("fetch ta mère fils de pute");
  // event.respondWith(
  //   caches.match(event.request).then(function (response) {
  //     // Cache hit - return response
  //     if (response) {
  //       return response;
  //     }
  //     // IMPORTANT: Cloner la requête.
  //     // Une requete est un flux et est à consommation unique
  //     // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
  //     var fetchRequest = event.request.clone();
  //     return fetch(fetchRequest).then(function (response) {
  //       if (!response || response.status !== 200 || response.type !== "basic") {
  //         return response;
  //       }
  //       // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
  //       var responseToCache = response.clone();
  //       caches.open(staticCacheName).then(function (cache) {
  //         cache.put(event.request, responseToCache);
  //       });
  //       return response;
  //     });
  //   })
  // );
});

// supprimer caches
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
