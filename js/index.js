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
    "p-4 rounded-lg text-center " + (connected ? "bg-green-300" : "bg-red-300");
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

// //set up BLE
// const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
// const CHAR_DIST_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
// // const CHAR_VOL_UUID = "66d04e60-89ba-4ab2-a0b3-2257bc8d43f7";
// // const CHAR_OFFSET_UUID = "8c3b12cb-3445-4961-b9af-c49521dc9d7a";
// const CHAR_REBOOT_UUID = "0d006e04-39d4-4d90-ae33-e278cbc6dc66";
// let distChar;
// // let volChar;
// // let offsetChar;
// let rebootChar;
// let ble = new p5ble();

// function bleStatusTrigger() {
//   const x = ble.isConnected();
//   statusDiv.innerHTML = x ? "Connected" : "Not Connected";
//   statusDiv.className =
//     "p-4 rounded-lg text-center " + (x ? "bg-green" : "bg-red");
//   return x;
// }
// function connectBLE() {
//   ble.connect(SERVICE_UUID, gotCharacteristics);
//   bleStatusTrigger();
//   curReboot = 1;
// }
// function disconnectBLE() {
//   ble.disconnect();
//   bleStatusTrigger();
//   curReboot = 1;
// }

// //called once characteristics are received
// function gotCharacteristics(error, characteristics) {
//   if (bleStatusTrigger()) {
//     if (error) console.log("error: ", error);
//     uuids = [];
//     for (let i = 0; i < characteristics.length; i++) {
//       uuids[i] = characteristics[i].uuid.toLowerCase();
//     }
//     distChar = characteristics[uuids.indexOf(CHAR_DIST_UUID)];
//     //volChar = characteristics[uuids.indexOf(CHAR_VOL_UUID)];
//     //offsetChar = characteristics[uuids.indexOf(CHAR_OFFSET_UUID)];
//     rebootChar = characteristics[uuids.indexOf(CHAR_REBOOT_UUID)];
//     //trigger daisy chain
//     ble.read(distChar, gotDist);
//   }
// }

// //looped r/w
// let cycleSize = 2;
// let cycleTime = 1000;
// let delay = cycleTime / cycleSize;
// console.log("delay: " + delay);

// function gotDist(error, value) {
//   if (bleStatusTrigger()) {
//     if (error) console.log("error: ", error);
//     //get raw m
//     console.log("Recv raw dist", value);
//     value -= curOffset;
//     value = Math.max(0, value) / 100;
//     //upd graph
//     updateGraphDisplay(value);
//     //convert Imperial if necessary
//     if (curImperial) value = mToFt(value);
//     //upd disp
//     distDiv.innerHTML = value.toFixed(2);
//     //speak depending on mode
//     if (curSpeakMode == 2) {
//       //periodic
//       synth(value.toPrecision(2), curVol);
//     } else if (curSpeakMode == 1) {
//       //pitch
//     } else if (curSpeakMode == 0) {
//       //threshold
//       for (let i = 0; i < events.length; i++) {
//         if (between(lastValue, events[i], value)) {
//           synth("" + events[i], curVol);
//           break;
//         }
//       }
//     }

//     setTimeout(() => {
//       writeReboot();
//     }, delay);
//   }
// }

// function writeReboot() {
//   if (bleStatusTrigger()) {
//     ble.write(rebootChar, curReboot);
//     setTimeout(() => {
//       ble.read(distChar, gotDist);
//     }, delay);
//   }
// }

// // State modifying threads
// function volUp() {
//   curVol += 20;
//   curVol = Math.min(curVol, 100);
//   volDiv.innerHTML = curVol;
//   localStorage.setItem("volume", "" + curVol);
// }
// function volDown() {
//   curVol -= 20;
//   curVol = Math.max(curVol, 0);
//   volDiv.innerHTML = curVol;
//   localStorage.setItem("volume", "" + curVol);
// }
// function setOffset() {
//   curOffset = Number(offsetInputDiv.value);
//   curOffset = Math.max(curOffset, 0);
//   curOffset = Math.min(curOffset, 5000);
//   offsetDiv.innerHTML = curOffset;
//   localStorage.setItem("offset", "" + curOffset);
// }
// function changeSpeakMode() {
//   curSpeakMode = (curSpeakMode + 1) % 3;
//   if (curSpeakMode == 0) speakModeDiv.innerHTML = "Threshold";
//   else if (curSpeakMode == 1) speakModeDiv.innerHTML = "Pitch";
//   else speakModeDiv.innerHTML = "Periodic";
//   localStorage.setItem("speakMode", "" + curSpeakMode);
// }
// function toggleImperial() {
//   curImperial = !curImperial;
//   imperialDiv.innerHTML = curImperial ? "Imperial" : "Metric";
//   distTypeDiv.innerHTML = curImperial ? "feet" : "meters";
//   localStorage.setItem("imperial", "" + curImperial);
//   reGraph();
// }
// function reboot() {
//   if (bleStatusTrigger()) {
//     curReboot = 2;
//   }
// }

// // !!! Make sure you can use speech synth!
// if ("speechSynthesis" in window) {
//   console.log(speechSynthesis.getVoices());
// } else {
//   alert("Sorry, your browser doesn't support text to speech!");
// }

// // Test audio
// var mySound;
// mySound = new Audio("0.wav");
// function testAudio() {
//   synth("Test", curVol);
//   mySound.play();
// }
