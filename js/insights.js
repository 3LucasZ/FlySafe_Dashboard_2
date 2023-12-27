const widgetListDiv = document.getElementById("widgetListDiv");

async function createWidgets() {
  console.log("createWidgets");
  const root = await navigator.storage.getDirectory();
  widgetListDiv.innerHTML = "";
  for await (const [name, handle] of root) {
    file = await handle.getFile();
    content = await file.text();
    widget = createWidget(name, content);
    widgetListDiv.appendChild(widget);
  }
  [...widgetListDiv.children]
    .sort((a, b) => (a.id < b.id ? 1 : -1))
    .forEach((node) => widgetListDiv.appendChild(node));
}

function createWidget(fileName, fileContent) {
  const csvString = fileContent;
  const csv = new CSV();
  csv.fromString(csvString);
  //downloadBtn
  var downloadBtn = document.createElement("button");
  downloadBtn.className = "bg-amber-100 rounded min-w-[32px] min-h-[32px]";
  downloadBtn.onclick = async () => {
    //only save AND return csv as feet
    const secret = document.createElement("a");
    secret.href = csv.getDownloadLink();
    secret.download = fileName;
    document.body.appendChild(secret);
    secret.click();
    secret.remove();
  };
  var downloadIcon = `<svg class="w-4 h-4 mx-auto"  viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>`;
  downloadBtn.innerHTML = downloadIcon;
  //trashBtn
  var trashBtn = document.createElement("button");
  trashBtn.className = "bg-red-500 rounded min-w-[32px] min-h-[32px]";
  trashBtn.onclick = async () => {
    const root = await navigator.storage.getDirectory();
    await root.removeEntry(fileName);
    await createWidgets();
  };
  var trashIcon = `<svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" ><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>`;
  trashBtn.innerHTML = trashIcon;
  //filename
  var fileNameDiv = document.createElement("div");
  fileNameDiv.className = "truncate px-3";
  fileNameDiv.innerHTML = fileName;
  //miniChart
  miniChart = createMiniChart(csv);
  //widgetDiv
  var widgetDiv = document.createElement("div");
  widgetDiv.className =
    "bg-gradient-to-br from-cyan-300 to-cyan-200 rounded shadow-lg p-1 w-full h-40";
  widgetDiv.id = fileName;
  //topbar
  var topDiv = document.createElement("div");
  topDiv.className = "flex justify-between mb-1";
  topDiv.appendChild(downloadBtn);
  topDiv.appendChild(fileNameDiv);
  topDiv.appendChild(trashBtn);
  widgetDiv.appendChild(topDiv);
  //bottombar
  var bottomDiv = document.createElement("div");
  bottomDiv.className = "h-[116px]";
  bottomDiv.appendChild(miniChart);
  widgetDiv.appendChild(bottomDiv);
  //ret
  return widgetDiv;
}

function createMiniChart(csv) {
  var canvasDiv = document.createElement("canvas");
  canvasDiv.className = "bg-white rounded relative";
  //only save AND return AND display csv as feet
  new Chart(canvasDiv, {
    type: "line",
    data: {
      labels: csv.entries.map((entry) => ""),
      datasets: [
        {
          data: csv.entries.map((entry) => entry[1]),
          borderWidth: 5,
          cubicInterpolationMode: "monotone",
          pointStyle: false,
          yAxisID: "y1",
        },
        {
          data: csv.entries.map((entry) => entry[2]),
          borderWidth: 0.5,
          cubicInterpolationMode: "monotone",
          pointStyle: false,
          yAxisID: "y2",
        },
      ],
    },
    options: getMiniGraphOptions(),
  });
  return canvasDiv;
}

//onload
function loadInsightsPage() {
  createWidgets();
  changePage("insightsPage");
}
