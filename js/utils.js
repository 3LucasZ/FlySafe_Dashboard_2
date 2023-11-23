console.log("utils.js");

function mToFt(x) {
  return x * 3.28084;
}

function getSeconds() {
  var d = new Date();
  return (d.getTime() - d.setHours(0, 0, 0)) / 1000;
}

function between(l, x, r) {
  return (l <= x && x <= r) || (r <= x && x <= l);
}

function synth(str, vol) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = str;
  msg.volume = vol / 100;
  window.speechSynthesis.cancel(); // !!! clear q
  window.speechSynthesis.speak(msg);
}

function rng(mx) {
  return Math.floor(Math.random() * mx);
}

function download(fileContent, fileName) {
  var file = new File(["\ufeff" + fileContent], fileName, {
    type: "text/plain:charset=UTF-8",
  });
  url = window.URL.createObjectURL(file);
  console.log(file);
  console.log(url);

  //a.style = "display: none";
  secretDiv.href = url;
  logsDiv.innerHTML =
    url + " | " + fileContent + " | " + file.webkitRelativePath;
  //secretDiv.download = file.name;
  //a.click();
  //window.URL.revokeObjectURL(url);
}
function downloadFlightData() {
  var content = "hello world";
  download(content, "flight_data.txt");
}

function ls_get(key) {
  return localStorage.getItem(key);
}
function ls_set(key, value) {
  localStorage.setItem(key, value);
}
