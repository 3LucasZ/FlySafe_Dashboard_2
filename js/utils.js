console.log("utils.js");
//convert
function mToFt(x) {
  return x * 3.28084;
}
//get date time
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
  return date.getMonth() + 1 + "_" + date.getDate() + "_" + date.getFullYear();
}
function getTimeFormatted() {
  const date = new Date();
  return date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds();
}
function getMomentFormatted() {
  return (
    getDateFormatted() +
    "_" +
    getTimeFormatted() +
    "_" +
    new Date().getMilliseconds()
  );
}

//utility
function between(l, x, r) {
  return (l <= x && x <= r) || (r <= x && x <= l);
}

//CSV
class CSVBuilder {
  constructor(headers) {
    this.entries = [headers];
  }
  addEntry(entry) {
    if (entry.length != this.entries[0].length) {
      throw "Header length does not match entry length";
    } else {
      this.entries.push(entry);
    }
  }
  getContent() {
    return this.entries.join("\n");
  }
  getDownloadLink() {
    return "data:text/csv;charset=utf-8," + encodeURI(this.getContent());
  }
}
function csvToJs(csv) {
  rows = csv.split("\n");
  return rows.map((row) => row.split(","));
}
//sound
function synth(str, vol) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = str;
  msg.volume = vol / 100;
  window.speechSynthesis.cancel(); // !!! clear q
  window.speechSynthesis.speak(msg);
}

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
