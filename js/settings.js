const autoConnectDiv = document.getElementById("autoConnectDiv");
const volDiv = document.getElementById("volDiv");
const speakModeDiv = document.getElementById("speakModeDiv");
const checkSynthDiv = document.getElementById("checkSynthDiv");
const shownDiv = document.getElementById("shownDiv");
const shownInputDiv = document.getElementById("shownInputDiv");
const offsetDiv = document.getElementById("offsetDiv");
const offsetInputDiv = document.getElementById("offsetInputDiv");
const coefDiv = document.getElementById("coefDiv");
const coefInputDiv = document.getElementById("coefInputDiv");
const imperialDiv = document.getElementById("imperialDiv");

//connection
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
  if (ls_get("speakMode") == "0") speakModeDiv.innerHTML = "Threshold";
  else if (ls_get("speakMode") == "1") speakModeDiv.innerHTML = "Periodic";
}
updSpeakerModeUI();
function changeSpeakMode() {
  ls_set("speakMode", "" + ((Number(ls_get("speakMode")) + 1) % 2));
  updSpeakerModeUI();
}
//checkSynth
function checkSynth() {
  checkSynthDiv.className =
    "speechSynthesis" in window
      ? "widget bg-gradient-to-br from-green-400 to-green-200"
      : "widget bg-gradient-to-br from-red-500 to-red-300";
}
checkSynth();

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

//offset
function updOffsetUI() {
  offsetDiv.innerHTML = ls_get("offset");
}
updOffsetUI();
function setOffset() {
  offset = Number(offsetInputDiv.value);
  offset = Math.max(offset, 0);
  offset = Math.min(offset, 5000);
  ls_set("offset", "" + offset);
  updOffsetUI();
}

//coef
function updCoefUI() {
  coefDiv.innerHTML = ls_get("coef");
}
updCoefUI();
function setCoef() {
  coef = Number(coefInputDiv.value);
  coef = Math.max(coef, 0.01);
  coef = Math.min(coef, 1);
  ls_set("coef", "" + coef);
  updCoefUI();
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
