//load PWA service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/FlySafe_Dashboard_2/serviceWorker.js", {
        scope: "/FlySafe_Dashboard_2/",
      })
      .then((res) => console.log("[index.js] service worker registered:", res))
      .catch((err) =>
        console.log("[index.js] service worker register failed:", err)
      );
  });
}

//seed localStorage defaults
if (ls_get("autoConnect") === null) ls_set("autoConnect", "0");
if (ls_get("volume") === null) ls_set("volume", "5");
if (ls_get("speakMode") === null) ls_set("speakMode", "0");
if (ls_get("shown") === null) ls_set("shown", "10");
if (ls_get("offset") === null) ls_set("offset", "0");
if (ls_get("coef") === null) ls_set("coef", "1");
if (ls_get("imperial") === null) ls_set("imperial", "1");

//websocket handler
//websocket.readyState => 0: CONNECTING, 1: OPEN, (2: CLOSING, 3: CLOSED) (treat 2,3 as one entity since its finnicky)
//if connected: haven't received message within X seconds, force a disconnect
//if connected or connecting: you can't connect again
//if autoConnect and not connected: force a connect
var websocket;
var prevConnectedTimestamp = 0; //when was the last time you were connected?
window.onload = (event) => {
  setInterval(wsStalk, 1000);
};
function wsStalk() {
  console.log("stalk");
  if (
    (websocket == null || websocket.readyState > 1) &&
    ls_get("autoConnect") == "1"
  )
    ws_connect();
  if (
    websocket != null &&
    getSecondsDeep() - prevConnectedTimestamp > 3 &&
    websocket.readyState == 1
  )
    ws_disconnect();
}
function ws_connect() {
  if (websocket != null && websocket.readyState <= 1) return;
  const url = "wss://192.168.4.1/ws";
  websocket = new WebSocket(url);
  console.log("[index.js] Websocket: User forced connect to", url);
  prevConnectedTimestamp = getSecondsDeep();
  updateStatusUI(websocket.readyState);
  websocket.onopen = function (evt) {
    console.log("[index.js] Websocket: Connected", evt);
    prevConnectedTimestamp = getSecondsDeep();
    updateStatusUI(websocket.readyState);
  };
  websocket.onclose = function (evt) {
    console.log("[index.js] Websocket: Disconnected", evt);
    updateStatusUI(websocket.readyState);
  };
  websocket.onmessage = function (evt) {
    console.log("[index.js] Websocket: Received", evt.data);
    prevConnectedTimestamp = getSecondsDeep();
    handleNewY(evt.data);
  };
  //always called right before onclose, describing why the close happened
  websocket.onerror = function (evt) {
    console.log("[index.js] Websocket: Error", evt);
    updateStatusUI(websocket.readyState);
  };
}
function ws_disconnect() {
  //doesn't trigger onclose
  console.log("[index.js] Websocket: User forced disconnect");
  websocket.close();
  updateStatusUI(websocket.readyState);
}
