console.log("constants.js");

const repoName = "FlySafe_Dashboard_2";

const events_ft = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90,
  100, 110, 120,
];

const graphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  scales: {
    y1: {
      position: "left",
      beginAtZero: true,
    },
    y2: {
      position: "right",
      beginAtZero: true,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};
