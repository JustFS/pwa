self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "./",
        "./src/style.css",
        "./img/1.jpg",
        "./img/2.jpg",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWidth(
    caches.match(e.request).then((res) => {
      return response || fetch(e.request);
    })
  );
  console.log(`Intercepting fetch request for ${e.request.url}`);
});
