console.log("insights.js");

//load PWA service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/ClientServerTesters/serviceWorker.js", {
        scope: "/ClientServerTesters/",
      })
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

//divs
const canvasDiv = document.getElementById("canvasDiv");
const distDiv = document.getElementById("distDiv");
const distTypeDiv = document.getElementById("distTypeDiv");
const statusDiv = document.getElementById("statusDiv");
const recordAvatarDiv = document.getElementById("recordAvatarDiv");

//seed localStorage defaults
if (ls_get("volume") === null) ls_set("volume", "5");
if (ls_get("speakMode") === null) ls_set("speakMode", "0");
if (ls_get("offset") === null) ls_set("offset", "0");
if (ls_get("coef") === null) ls_set("coef", "1");
if (ls_get("imperial") === null) ls_set("imperial", "1");

//running variables
var distsM = [];
var times = [];

//init display
distTypeDiv.innerHTML = ls_get("imperial") == "1" ? "meters" : "feet";

//graph handler
function appendGraph(newDistM) {
  distsM.push(newDistM);
  times.push(getSeconds());
  if (times.length > 25) {
    distsM.shift();
    times.shift();
  }
  updGraph();
}
var chart = new Chart(canvasDiv);
function updGraph() {
  chart.destroy();
  chart = new Chart(canvasDiv, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label:
            "AGL Altitude (" + (ls_get("imperial") == "1" ? "m" : "ft") + ")",
          data: ls_get("imperial") == "1" ? distsM.map(mToFt) : distsM,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
updGraph();

//button handlers
var isRecording = false;
function updRecordUI() {
  recordAvatarDiv.className =
    "bg-red-500 mx-auto " +
    (isRecording ? "w-10 h-10 rounded-lg" : "w-14 h-14 rounded-full");
}
updRecordUI();
function toggleIsRecording() {
  isRecording = !isRecording;
  updRecordUI();
}

//websocket handler
var websocket;
window.onload = (event) => {
  websocket_connect();
};
function websocket_connect() {
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
}
function updateStatusUI(connected) {
  statusDiv.innerHTML = connected ? "Connected" : "Not Connected";
  statusDiv.className =
    "p-4 rounded-lg text-center " +
    (connected
      ? "bg-gradient-to-br from-green-400 to-green-200"
      : "bg-gradient-to-br from-red-500 to-red-300");
}
function onOpen(evt) {
  console.log("Websocket connected");
  updateStatusUI(true);
}
function onClose(evt) {
  console.log("Websocket disconnected");
  updateStatusUI(false);
  websocket_connect();
}
function onMessage(evt) {
  console.log(evt.data);
  distDiv.innerHTML = evt.data;
  appendGraph(evt.data);
}
function onError(evt) {
  console.log(evt.data);
}

// const fileHandle = await opfsRoot
//     .getFileHandle('my first file', {create: true});
