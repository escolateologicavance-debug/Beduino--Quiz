consconst CACHE_NAME = "beduino-v8";

const FILES_TO_CACHE = [
  "/Beduino--Quiz/",
  "/Beduino--Quiz/index.html",
  "/Beduino--Quiz/manifest.json",
  "/Beduino--Quiz/quiz1.html",
  "/Beduino--Quiz/quiz2.html",
  "/Beduino--Quiz/quiz3.html",
  "/Beduino--Quiz/quiz4.html",
  "/Beduino--Quiz/quiz5.html",
  "/Beduino--Quiz/quiz_curiosidades.html",
  "/Beduino--Quiz/logo-192.png",
  "/Beduino--Quiz/logo-512.png"
];

// INSTALA E CACHEIA
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// ATIVA E LIMPA CACHES ANTIGOS
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH — NÃO INTERCEPTA NAVEGAÇÃO HTML
self.addEventListener("fetch", event => {

  // navegação entre páginas HTML
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request));
    return;
  }

  // demais recursos (css, js, imagens)
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
