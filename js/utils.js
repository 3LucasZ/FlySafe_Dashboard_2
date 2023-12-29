//convert
function mToFt(x) {
  return x * 3.28084;
}
function ftToM(x) {
  return x / 3.28084;
}
function radToDeg(angle) {
  return angle * (180 / Math.PI);
}
function degToRad(angle) {
  return angle * (Math.PI / 180);
}
//get date time
const zeroPad = (num, places) => String(num).padStart(places, "0");
function getSeconds() {
  var d = new Date();
  return (d.getTime() - d.setHours(0, 0, 0)) / 1000;
}
function getSecondsDeep() {
  var d = new Date();
  return (d.getTime() - d.setHours(0, 0, 0, 0)) / 1000;
}
function getDateFormatted() {
  const date = new Date();
  return (
    zeroPad(date.getMonth() + 1, 2) +
    "-" +
    zeroPad(date.getDate(), 2) +
    "-" +
    date.getFullYear()
  );
}
function getTimeFormatted() {
  const date = new Date();
  return (
    zeroPad(date.getHours(), 2) +
    "-" +
    zeroPad(date.getMinutes(), 2) +
    "-" +
    zeroPad(date.getSeconds(), 2)
  );
}
function getMomentFormatted() {
  return (
    getDateFormatted() +
    "_" +
    getTimeFormatted() +
    "_" +
    zeroPad(new Date().getMilliseconds(), 3)
  );
}

//utility
function between(l, x, r) {
  return (l <= x && x <= r) || (r <= x && x <= l);
}

//CSV
class CSV {
  constructor() {
    this.header;
    this.entries = [];
  }
  fromString(string) {
    const rows = string.split("\r\n");
    const splitRows = rows.map((row) => row.split(","));
    this.setHeader(splitRows[0]);
    for (i = 1; i < splitRows.length; i++) this.addEntry(splitRows[i]);
  }
  setHeader(header) {
    this.header = header;
  }
  addEntry(entry) {
    if (entry.length != this.header.length) {
      throw "ERR: Header length does not match entry length!";
    } else {
      this.entries.push(entry);
    }
  }
  toString() {
    return this.entries.join("\r\n");
  }
  getDownloadLink() {
    return "data:text/csv;charset=utf-8," + encodeURI(this.toString());
  }
}

//sound
function sayNum(num) {
  if (ls_get("imperial") == "1" && num < 1) {
    num = num.toPrecision(1);
  } else {
    num = num.toPrecision(2);
  }
  if (num < 1) say(("" + num).substring(1));
  else say("" + num);
}
function say(str) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = str;
  msg.volume = audio ? (Number(ls_get("volume")) * 20) / 100 : 0;
  window.speechSynthesis.cancel(); // !!! clear q
  window.speechSynthesis.speak(msg);
}
class RawSound {
  constructor() {
    //only called in page init (right below)
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.osc = this.audioCtx.createOscillator();
    this.vol = this.audioCtx.createGain();
    //
    this.osc.type = "sine";
    this.osc.frequency.value = 0;
    this.osc.connect(this.vol);
    this.lastTime = getSecondsDeep();
  }
  beginStream() {
    //only called when audio switched on
    console.log("beginStream");
    this.vol.connect(this.audioCtx.destination);
    try {
      this.osc.start();
    } catch (e) {
      console.log("e", e);
    }
  }
  stopStream() {
    //only called when audio switched off
    this.vol.disconnect(this.audioCtx.destination);
  }
  playNote(hz) {
    //only called when ws receives dist
    console.log(hz);
    this.lastTime = getSecondsDeep();
    if (hz < 0 || hz > 2000) return;
    this.vol.gain.value = (Number(ls_get("volume")) * 20) / 100.0;
    this.osc.frequency.value = hz;
    setTimeout(function () {
      if (getSecondsDeep() - rawSound.lastTime > 0.8)
        rawSound.vol.gain.value = 0.0;
    }, 1000);
  }
}
const rawSound = new RawSound();
//rng
function rng(mx) {
  return Math.floor(Math.random() * mx);
}

//files
function createFile(fileName, fileContent) {
  const createFileWorker = new Worker(
    "/FlySafe_Dashboard_2/js/createFileWorker.js"
  );
  createFileWorker.postMessage([fileName, fileContent]);
}

function ls_get(key) {
  return localStorage.getItem(key);
}
function ls_set(key, value) {
  localStorage.setItem(key, value);
}

//cache
function removeAllCaches() {
  console.log("removing all caches:");
  caches.keys().then(function (names) {
    for (let name of names) {
      caches.delete(name);
      console.log("removed:", name);
    }
  });
}

//pageview
curPage = "";
async function changePage(page) {
  if (curPage) document.getElementById(curPage).className = "hidden";
  curPage = page;
  document.getElementById(curPage).className = "block";
}

//distToHz
function distToHz(dist) {
  const a = 40;
  const b = 2000;
  if (ls_get("imperial") == "1") dist = ftToM(dist);
  if (dist < 0 || dist > a) return 0;
  //
  x = dist;
  X = x / a - 1;
  Y = -Math.sqrt(1 - X * X);
  y = (Y + 1) * b;
  //
  var hz = y;
  return Math.round(hz);
}
