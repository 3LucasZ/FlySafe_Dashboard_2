const repoName = "/FlySafe_Dashboard_2";

//const cacheName = "cache_" + Math.floor(Math.random() * 100000000000000); //Local: auto cache refresh
const cacheName = repoName + "v3987785"; //Production: manually change before every commit

const assets = [
  repoName + "/",
  repoName + "/components/footer.js",
  repoName + "/dist/output.css",
  repoName + "/images/icons/icon.png",
  repoName + "/js/chart.js",
  repoName + "/js/constants.js",
  repoName + "/js/createFileWorker.js",
  repoName + "/js/help_page.js",
  repoName + "/js/index.js",
  repoName + "/js/inject.js",
  repoName + "/js/insights_page.js",
  repoName + "/js/settings_page.js",
  repoName + "/js/utils.js",
  repoName + "/index.html",
  repoName + "/pages/settings_page.html",
  repoName + "/pages/insights_page.html",
  repoName + "/pages/help_page.html",
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
