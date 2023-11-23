const volDiv = document.getElementById("volDiv");
const offsetDiv = document.getElementById("offsetDiv");
const offsetInputDiv = document.getElementById("offsetInputDiv");
const speakModeDiv = document.getElementById("speakModeDiv");
const imperialDiv = document.getElementById("imperialDiv");

// State modifiers
function updVolUI() {
  volDiv.innerHTML = ls_get("volume");
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

function updSpeakerModeUI() {
  if (ls_get("speakMode") == "0") speakModeDiv.innerHTML = "Threshold";
  else if (ls_get("speakMode") == 1) speakModeDiv.innerHTML = "Pitch";
  else speakModeDiv.innerHTML = "Periodic";
}
updSpeakerModeUI();
function changeSpeakMode() {
  ls_set("speakMode", "" + ((Number(ls_get("speakMode")) + 1) % 3));
  updSpeakerModeUI();
}

function updImperialUI() {
  console.log(ls_get("imperial"));
  imperialDiv.innerHTML = ls_get("imperial") == "1" ? "Imperial" : "Metric";
}
updImperialUI();
function toggleImperial() {
  ls_set("imperial", "" + (1 - Number(ls_get("imperial"))));
  updImperialUI();
}
