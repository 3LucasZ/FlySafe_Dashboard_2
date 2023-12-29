const autoConnectDiv = document.getElementById("autoConnectDiv");
const checkNetworkDiv = document.getElementById("checkNetworkDiv");
const volDiv = document.getElementById("volDiv");
const speakModeDiv = document.getElementById("speakModeDiv");
const checkSynthDiv = document.getElementById("checkSynthDiv");
const shownDiv = document.getElementById("shownDiv");
const shownInputDiv = document.getElementById("shownInputDiv");
const offsetDiv = document.getElementById("offsetDiv");
const offsetInputDiv = document.getElementById("offsetInputDiv");
const angleDiv = document.getElementById("angleDiv");
const angleInputDiv = document.getElementById("angleInputDiv");
const imperialDiv = document.getElementById("imperialDiv");

//CONNECTION
//autoConnect
function updAutoConnectUI() {
  autoConnectDiv.className =
    ls_get("autoConnect") == "1"
      ? "widget bg-gradient-to-br from-green-400 to-green-200"
      : "widget bg-gradient-to-br from-red-500 to-red-300";
}
function toggleAutoConnect() {
  ls_set("autoConnect", "" + (1 - Number(ls_get("autoConnect"))));
  updAutoConnectUI();
}
updAutoConnectUI();
//checkNetwork
function checkNetwork() {
  checkNetworkDiv.className = window.navigator.onLine
    ? "widget bg-gradient-to-br from-green-400 to-green-200"
    : "widget bg-gradient-to-br from-red-500 to-red-300";
}
// checkNetwork();

//SOUND
//%vol
function updVolUI() {
  volDiv.innerHTML = "";
  vol = ls_get("volume");
  for (i = 1; i <= 5; i++) {
    indicator = document.createElement("div");
    indicator.className =
      "w-4 h-full flex rounded " + (i <= vol ? "bg-blue-400" : "bg-white");
    volDiv.appendChild(indicator);
  }
}
updVolUI();
function volUp() {
  ls_set("volume", "" + Math.min(Number(ls_get("volume")) + 1, 5));
  updVolUI();
}
function volDown() {
  ls_set("volume", "" + Math.max(Number(ls_get("volume")) - 1, 0));
  updVolUI();
}
//speakerMode
function updSpeakerModeUI() {
  if (ls_get("speakMode") == "0") {
    speakModeDiv.innerHTML = "Threshold";
  } else if (ls_get("speakMode") == "1") {
    speakModeDiv.innerHTML = "Periodic";
  } else if (ls_get("speakMode") == "2") {
    speakModeDiv.innerHTML = "Tone";
  }
}
updSpeakerModeUI();
function changeSpeakMode() {
  ls_set("speakMode", "" + ((Number(ls_get("speakMode")) + 1) % 3));
  updSpeakerModeUI();
}
//checkSynth
function checkSynth() {
  checkSynthDiv.className =
    "speechSynthesis" in window
      ? "widget bg-gradient-to-br from-green-400 to-green-200"
      : "widget bg-gradient-to-br from-red-500 to-red-300";
}
// checkSynth();

//# datapoints shown in graph
function updShownUI() {
  shownDiv.innerHTML = ls_get("shown");
}
updShownUI();
function setShown() {
  shown = Number(shownInputDiv.value);
  shown = Math.max(shown, 10);
  shown = Math.min(shown, 300);
  ls_set("shown", "" + shown);
  updShownUI();
}

//TUNE
//offset
function updOffsetUI() {
  offsetDiv.innerHTML = ls_get("offset");
}
updOffsetUI();
function setOffset() {
  offset = Number(offsetInputDiv.value);
  offset = Math.max(offset, 0);
  offset = Math.min(offset, 1000);
  ls_set("offset", "" + offset);
  updOffsetUI();
}
//angle
function updAngleUI() {
  angleDiv.innerHTML = ls_get("angle");
}
updAngleUI();
function setAngle() {
  angle = Number(angleInputDiv.value);
  angle = Math.max(angle, 0);
  angle = Math.min(angle, 45);
  ls_set("angle", "" + angle);
  updAngleUI();
}

//imperial
function updImperialUI() {
  imperialDiv.innerHTML = ls_get("imperial") == "1" ? "Imperial" : "Metric";
}
updImperialUI();
function toggleImperial() {
  ls_set("imperial", "" + (1 - Number(ls_get("imperial"))));
  updImperialUI();
}

//onload
function loadSettingsPage() {
  changePage("settingsPage");
}
