const CACHE_NAME = "beduino-final-1";

const FILES_TO_CACHE = [
  "/Beduino--Quiz/",
  "/Beduino--Quiz/index.html",
  "/Beduino--Quiz/manifest.json",
  "/Beduino--Quiz/quiz1.html",
  "/Beduino--Quiz/quiz2.html",
  "/Beduino--Quiz/quiz3.html",
  "/Beduino--Quiz/quiz4.html",
  "/Beduino--Quiz/quiz5.html",
  "/Beduino--Quiz/quiz_curiosidades.html"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
