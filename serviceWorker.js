const repoName = "/FlySafe_Dashboard_2";

//const cacheName = "cache_" + Math.floor(Math.random() * 100000000000000); //Local: auto cache refresh
const cacheName = "2324328488"; //Production: manually change before every commit

const assets = [
  repoName + "/",
  repoName + "/components/footer.js",
  repoName + "/components/header.js",
  repoName + "/dist/output.css",
  repoName + "/images/icons/icon.png",
  repoName + "/js/chart.js",
  repoName + "/js/constants.js",
  repoName + "/js/createFileWorker.js",
  repoName + "/js/fly_page.js",
  repoName + "/js/fly.js",
  repoName + "/js/help_page.js",
  repoName + "/js/help.js",
  repoName + "/js/insights_page.js",
  repoName + "/js/insights.js",
  repoName + "/js/settings_page.js",
  repoName + "/js/settings.js",
  repoName + "/js/utils.js",
  repoName + "/index.html",
  repoName + "/index.js",
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
