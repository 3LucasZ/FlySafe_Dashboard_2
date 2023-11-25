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
if (ls_get("shown") === null) ls_set("shown", "10");
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
  //calc new
  t = getSecondsDeep();
  y = newCm / 100;
  dy = preT == 0 ? 0 : (y - preY) / (t - preT);
  //upd distDiv
  distDiv.innerHTML =
    ls_get("imperial") == "1" ? mToFt(y).toFixed(1) : y.toFixed(2);
  //upd graph
  updGraph(t, y, dy);
  //upd rec
  if (isRecording) {
    recT.push(t);
    recY.push(y);
    recDy.push(dy);
  }
  //store last received t,y
  preT = t;
  preY = y;
  //voiceover (convert y to specified unit from here on out)
  if (ls_get("imperial") === "1") y = mToFt(y);
  if (t - preSayT > 1) {
    if (ls_get("speakMode") === "0") {
      var callout;
      for (x in preSayY < y ? events_ft_seed : events_ft.slice().reverse()) {
        if (between(preSayY, x, y)) {
          callout = x;
        }
      }
      if (callout !== null && callout !== undefined) {
        //threshold was hit
        if (audio) say(callout);
        preSayY = y;
        preSayT = t;
      }
    } else if (ls_get("speakMode") === "1") {
      if (audio) sayNum(y);
      preSayY = y;
      preSayT = t;
    }
  }
}

//graph handler
var chart = new Chart(canvasDiv, {
  type: "line",
  data: {
    labels: new Array(Number(ls_get("shown"))).fill(""),
    datasets: [
      {
        label: "altitude(" + (ls_get("imperial") == "1" ? "ft" : "m") + ")",
        data: new Array(Number(ls_get("shown"))).fill(0),
        borderWidth: 5,
        cubicInterpolationMode: "monotone",
        pointStyle: false,
        yAxisID: "y1",
      },
      {
        label: "descent(" + (ls_get("imperial") == "1" ? "ft" : "m") + "/s)",
        data: new Array(Number(ls_get("shown"))).fill(0),
        borderWidth: 0.5,
        cubicInterpolationMode: "monotone",
        pointStyle: false,
        yAxisID: "y2",
      },
    ],
  },
  options: getGraphOptions(),
});
function updGraph(t, y, dy) {
  // chart.data.labels.push(t);
  chart.data.datasets[0].data.push(ls_get("imperial") === "1" ? mToFt(y) : y);
  chart.data.datasets[1].data.push(ls_get("imperial") === "1" ? mToFt(dy) : dy);
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
// updRecordUI(); // Manually set in html
async function toggleIsRecording() {
  isRecording = !isRecording;
  if (!isRecording) {
    //only save AND return csv as feet
    const cb = new CSVBuilder(["time(s)", "altitude(ft)", "descent(ft/s)"]);
    for (const i of Array(recY.length).keys())
      cb.addEntry([recT[i], mToFt(recY[i]), mToFt(recDy[i])]);
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
  ws_connect();
  var stalkLoop = setInterval(stalk, 7500);
};
function stalk() {
  console.log("stalk");
  if (getSecondsDeep() - preT > 2.5) {
    ws_disconnect();
    ws_connect();
  }
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
}
function onMessage(evt) {
  console.log("WS Received: " + evt.data);
  handleNewY(evt.data);
}
function onError(evt) {
  console.log(evt.data);
}
function ws_disconnect() {
  console.log("Manually disconnected websocket");
  websocket.close();
  updateStatusUI(false);
}
//misc
async function reboot() {
  console.log("Rebooting the ESP");
  try {
    const req = await fetch("https://192.168.4.1/reboot", { method: "POST" });
  } catch (error) {
    console.log(error);
  }
}
function refresh() {
  location.reload();
}

//vol on and off
audio = false;
audioBtn = document.getElementById("audioBtn");
function toggleAudio() {
  say("");
  audio = !audio;
  updAudioUI();
}
function updAudioUI() {
  if (!audio) {
    audioBtn.className = "absolute rounded top-2 right-2 p-1 bg-red-400";
    audioBtn.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    class="w-6 h-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"/>
   </svg>`;
  } else {
    audioBtn.className = "absolute rounded top-2 right-2 p-1 bg-green-400";
    audioBtn.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      class="w-6 h-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>
    </svg>`;
  }
}
updAudioUI();
