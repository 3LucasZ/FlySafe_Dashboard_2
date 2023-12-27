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
var websocket;
var prevMsgTimestamp = 0;

window.onload = (event) => {
  if (ls_get("autoConnect") == "1") ws_connect();
  var stalkLoop = setInterval(stalk, 7500); //run stalk every 7.5s
};
function stalk() {
  console.log("stalk");
  //if 2.5s have passed since the last message was received, force a reconnect
  if (getSecondsDeep() - prevMsgTimestamp > 2.5 && ls_get("autoConnect") == "1")
    ws_reconnect();
}

function ws_connect() {
  const url = "wss://192.168.4.1/ws";
  console.log("Connecting to:", url);
  websocket = new WebSocket(url);
  websocket.onopen = function (evt) {
    onOpen(evt);
  };
  websocket.onclose = function (evt) {
    onClose(evt);
  };
  websocket.onmessage = function (evt) {
    onMessage(evt);
  };
  websocket.onerror = function (evt) {
    onError(evt);
  };
  function onOpen(evt) {
    console.log("Websocket connected");
    updateStatusUI(true);
  }
  function onClose(evt) {
    console.log("Websocket disconnected");
    updateStatusUI(false);
  }
  function onMessage(evt) {
    console.log("WS Received: " + evt.data);
    prevMsgTimestamp = getSecondsDeep();
    handleNewY(evt.data);
  }
  function onError(evt) {
    console.log(evt.data);
  }
}
function ws_disconnect() {
  console.log("Manually disconnected websocket");
  websocket.close();
  updateStatusUI(false);
}
function ws_reconnect() {
  if (websocket) ws_disconnect();
  ws_connect();
}
