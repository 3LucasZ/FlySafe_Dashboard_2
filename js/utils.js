//convert
function mToFt(x) {
  return x * 3.28084;
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
    return this.entries.join("\r\n");
  }
  getDownloadLink() {
    return "data:text/csv;charset=utf-8," + encodeURI(this.getContent());
  }
}
function csvToJs(csv) {
  rows = csv.split("\r\n");
  return rows.map((row) => row.split(","));
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
  msg.volume = (Number(ls_get("volume")) * 20) / 100;
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

//pageview
curPage = "flyPage";
async function changePage(page) {
  document.getElementById(curPage).className = "hidden";
  curPage = page;
  document.getElementById(curPage).className = "block";
  await createWidgets();
}
changePage("flyPage");
