console.log("insights_page.js");

const widgetListDiv = document.getElementById("widgetListDiv");
async function createWidgets() {
  const root = await navigator.storage.getDirectory();
  widgetListDiv.innerHTML = "";
  for await (const [name, handle] of root) {
    file = await handle.getFile();
    content = await file.text();
    console.log(name, content);
    widget = createWidget(name, content);
    widgetListDiv.appendChild(widget);
  }
}
window.onload = async (event) => {
  await createWidgets();
};

function createWidget(fileName, fileContent) {
  //widgetDiv
  var widgetDiv = document.createElement("div");
  widgetDiv.className =
    "bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg p-5 my-5 flex flex-row justify-between w-full h-24 p-0";
  //downloadBtn
  var downloadBtn = document.createElement("button");
  downloadBtn.className = "bg-amber-100 col-span-1 h-full p-2";
  downloadBtn.onclick = async () => {
    const secret = document.createElement("a");
    secret.href = "data:text/csv;charset=utf-8," + fileContent;
    document.body.appendChild(secret);
    secret.click();
    secret.remove();
  };
  var downloadIcon = `<svg class="w-4 h-4 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>`;
  downloadBtn.innerHTML = downloadIcon;
  widgetDiv.appendChild(downloadBtn);
  //body
  var body = document.createElement("div");
  body.className = "col-span-6";
  //graph
  //filename
  var fileNameDiv = document.createElement("div");
  fileNameDiv.innerHTML = fileName + " " + fileContent;
  body.appendChild(fileNameDiv);
  widgetDiv.appendChild(body);
  //trashBtn
  var trashBtn = document.createElement("button");
  trashBtn.className = "bg-red-500 col-span-1 right-0 h-full ";
  trashBtn.onclick = async () => {
    const root = await navigator.storage.getDirectory();
    await root.removeEntry(fileName);
    await createWidgets();
  };
  var trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>`;
  trashBtn.innerHTML = trashIcon;
  widgetDiv.appendChild(trashBtn);
  //ret
  return widgetDiv;
}
function createChart() {
  var chartDiv = document.createElement("canvas");
  var chart = new Chart(canvasDiv);
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
  return chartDiv;
}
