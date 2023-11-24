console.log("insights.js");

//load PWA service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/FlySafe_Dashboard_2/serviceWorker.js", {
        scope: "/FlySafe_Dashboard_2/",
      })
      .then((res) => console.log("service worker registered", res))
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
var preT = 0; //seconds
var preY = 0; //meters
var recT = []; //seconds
var recY = []; //meters
var recDy = []; //meters/second

//init display
distTypeDiv.innerHTML = ls_get("imperial") == "1" ? "feet" : "meters";

//newY handler
function handleNewY(newCm) {
  y = newCm / 100;
  //upd distDiv
  distDiv.innerHTML =
    ls_get("imperial") == "1" ? mToFt(y).toFixed(1) : y.toFixed(2);
  //calc new
  t = getSecondsDeep();
  y = y;
  dy = preT == 0 ? 0 : (y - preY) / (t - preT);

  if (isRecording) {
    recT.push(t);
    recY.push(y);
    recDy.push(dy);
  }
  updGraph(t, y, dy);
  preT = t;
  preY = y;
}

//graph handler
var chart = new Chart(canvasDiv, {
  type: "line",
  data: {
    labels: new Array(25).fill(""),
    datasets: [
      {
        label: "altitude(" + (ls_get("imperial") == "1" ? "m" : "ft") + ")",
        data: new Array(25).fill(0),
        borderWidth: 3,
        cubicInterpolationMode: "monotone",
        pointStyle: false,
        yAxisID: "y1",
      },
      {
        label:
          "descent speed(" + (ls_get("imperial") == "1" ? "m" : "ft") + "/s)",
        data: new Array(25).fill(0),
        borderWidth: 1,
        cubicInterpolationMode: "monotone",
        pointStyle: false,
        yAxisID: "y2",
      },
    ],
  },
  options: graphOptions,
});
function updGraph(t, y, dy) {
  // chart.data.labels.push(t);
  chart.data.datasets[0].data.push(y);
  chart.data.datasets[1].data.push(dy);
  // chart.data.labels.shift();
  chart.data.datasets[0].data.shift();
  chart.data.datasets[1].data.shift();
  chart.update();
}

//button handlers
var isRecording = false;
function updRecordUI() {
  recordAvatarDiv.className =
    "bg-red-500 mx-auto " +
    (isRecording ? "w-10 h-10 rounded-lg" : "w-14 h-14 rounded-full");
}
updRecordUI();
async function toggleIsRecording() {
  isRecording = !isRecording;
  if (!isRecording) {
    const cb = new CSVBuilder(["time(s)", "altitude(ft)", "descent(ft/s)"]);
    for (const i of Array(recY.length).keys()) {
      cb.addEntry([recT[i], recY[i], recDy[i]]);
    }
    createFile(getMomentFormatted(), cb.getContent());
    recT = [];
    recY = [];
    recDy = [];
  }
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
  console.log("WS Received: " + evt.data);
  handleNewY(evt.data);
}
function onError(evt) {
  console.log(evt.data);
}
