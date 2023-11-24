console.log("insights_page.js");

const widgetListDiv = document.getElementById("widgetListDiv");
async function createWidgets() {
  const root = await navigator.storage.getDirectory();
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
  var widgetDiv = document.createElement("div");
  widgetDiv.innerHTML = fileName + " " + fileContent;
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
}
