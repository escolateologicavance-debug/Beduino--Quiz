const CACHE_NAME = "beduino-final-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./quiz1.html",
  "./quiz2.html",
  "./quiz3.html",
  "./quiz4.html",
  "./quiz5.html",
  "./curiosidades.html",
  "./logo-192.png", // Adicionado: Essencial para o ícone aparecer
  "./logo-512.png"  // Adicionado: Essencial para o ícone aparecer
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Integridade: Cache do Beduíno instalado.");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        if (k !== CACHE_NAME) {
          return caches.delete(k);
        }
      }))
    )
  );
  self.clients.claim();
});

// Estratégia: Tenta o Cache primeiro, se não houver, vai à rede.
// Isso garante a "Qualificação do Estar" imediata do app.
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
