import { repoName } from "js/constants.js";

const cacheName = repoName + Math.floor(Math.random() * 100000000000000); //Local: automatically changes
//const cacheName = repoName + "v3" //Production: manually change before every commit
const assets = [
  repoName + "/",
  repoName + "/index.html",
  repoName + "/dist/output.css",
  repoName + "/js/chart.js",
  repoName + "/js/constants.js",
  repoName + "/js/divs.js",
  repoName + "/js/index.js",
  repoName + "/js/utils.js",
];

self.addEventListener("activate", (event) => {
  // Remove old caches
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      return keys.map(async (cache) => {
        if (cache !== cacheName) {
          console.log("Service Worker: Removing old cache: " + cache);
          return await caches.delete(cache);
        }
      });
    })()
  );
});

self.addEventListener("install", (installEvent) => {
  console.log("Service Worker: Using new cache: " + cacheName);
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
