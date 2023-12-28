//constants
const DBG = true;
const VERSION = DBG ? "" + Math.random() : 7; //Also used as cache name. Manually change after every change in the service worker.
const cacheName = VERSION;
const assets = [
  "./",
  "./components/footer.js",
  "./components/header.js",
  "./dist/output.css",
  "./images/icons/icon.png",
  "./js/chart.js",
  "./js/constants.js",
  "./js/createFileWorker.js",
  "./js/fly_page.js",
  "./js/fly.js",
  "./js/help_page.js",
  "./js/help.js",
  "./js/insights_page.js",
  "./js/insights.js",
  "./js/settings_page.js",
  "./js/settings.js",
  "./js/utils.js",
  "./index.html",
  "./index.js",
  "./manifest.json",
];

//event listeners
self.addEventListener("install", (installEvent) => {
  console.log("[Service Worker] Event: Install");
  console.log("[Service Worker] Using new cache: " + cacheName);
  //cache all assets
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache
        .addAll(assets)
        .then(() => {
          console.log("[Service Worker] All files successfully cached");
          return self.skipWaiting();
        })
        .catch((error) => {
          console.error("[Service Worker] Failed to cache", error);
        });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Event: Activate");
  // Remove old caches
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== cacheName) {
              console.log("[Service Worker] Deleting old cache: " + cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(function () {
        console.log("[Service Worker] Old caches successfully cleared");
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  console.log("[Service Worker] Event: Fetch");
  console.log("[Service Worker] Intercepted request:", fetchEvent.request.url);
  var request = fetchEvent.request;
  var url = new URL(request.url);
  if (url.origin === location.origin) {
    fetchEvent.respondWith(cacheFirst(fetchEvent.request));
  } else {
    fetchEvent.respondWith(networkFirst(fetchEvent.request));
  }
});
async function cacheFirst(request) {
  console.log("[Service Worker] Cache first strategy");
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}
async function networkFirst(request) {
  console.log("[Service Worker] Network first strategy");
  const dynamicCache = await caches.open(cacheName);
  try {
    const networkResponse = await fetch(request);
    if (!networkResponse.ok) throw "Resource requested does not exist.";
    console.log(
      "[Service Worker] Network success, networkResponse:",
      networkResponse
    );
    // Cache the dynamic API response
    dynamicCache.put(request, networkResponse.clone()).catch((err) => {
      console.warn(request.url + ": " + err.message);
    });
    // Return the API response
    return networkResponse;
  } catch (err) {
    console.log("Service Worker] Network failed:", err);
    // Return the cached API response
    var cachedResponse = await dynamicCache.match(request);
    if (cachedResponse == null) cachedResponse = new Response();
    console.log("[Service Worker] cachedResponse:", cachedResponse);
    return cachedResponse;
  }
}

self.addEventListener("push", (event) => {
  console.log("[Service Worker] ");

  var title = "Push notification demo";
  var body = {
    body: "click to return to application",
    tag: "demo",
    icon: "./images/icons/apple-touch-icon.png",
    badge: "./images/icons/apple-touch-icon.png",
    //Custom actions buttons
    actions: [
      { action: "yes", title: "I ♥ this app!" },
      { action: "no", title: "I don't like this app" },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, body));
});
