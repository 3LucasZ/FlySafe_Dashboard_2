console.log("index.js");

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
var preSayT = 0; //seconds
var preSayY = 0; //meters
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
  //voiceover
  if (ls_get("imperial") === "1") y = mToFt(y);
  if (t - preSayT > 1) {
    if (ls_get("speakMode") === "0") {
      var callout;
      for (x in preSayY < y ? events_ft_seed : events_ft.slice().reverse()) {
        if (between(preSayY, x, y)) {
          callout = x;
        }
      }
      console.log(callout);
      if (callout !== null && callout !== undefined) say(callout);
    } else if (ls_get("speakMode") === "1") {
      sayNum(y);
    }
    preSayY = y;
    preSayT = t;
  }
}

//graph handler
var chart = new Chart(canvasDiv, {
  type: "line",
  data: {
    labels: new Array(25).fill(""),
    datasets: [
      {
        label: "altitude(" + (ls_get("imperial") == "1" ? "ft" : "m") + ")",
        data: new Array(25).fill(0),
        borderWidth: 3,
        cubicInterpolationMode: "monotone",
        pointStyle: false,
        yAxisID: "y1",
      },
      {
        label: "descent(" + (ls_get("imperial") == "1" ? "ft" : "m") + "/s)",
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
  recordAvatarDiv.className = isRecording ? "avatar-square" : "avatar-circle";
  recordBtn.className = isRecording
    ? "avatar-container glow-fx"
    : "avatar-container";
}
// updRecordUI(); we will set this one manually in html!
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
  console.log("onload");
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
