const repoName = "FlySafe_Dashboard_2";

// const events_ft = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90,
//   100, 110, 120,
// ];
const events_ft = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100];
const events_ft_seed = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

function getGraphOptions() {
  //dynamic units: ft/m
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    scales: {
      y1: {
        position: "left",
        suggestedMin: 0,
        suggestedMax:
          localStorage.getItem("imperial") === "1" ? 20 : 20 * 0.3048,
      },
      y2: {
        position: "right",
        suggestedMin:
          localStorage.getItem("imperial") === "1" ? -5 : -5 * 0.3048,
        suggestedMax: localStorage.getItem("imperial") === "1" ? 5 : 5 * 0.3048,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };
}
function getMiniGraphOptions() {
  //static units: ft
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    scales: {
      y1: {
        position: "left",
        suggestedMin: 0,
        suggestedMax: 100,
        grid: {
          drawOnChartArea: false,
        },
        display: true,
      },
      y2: {
        position: "right",
        suggestedMin: -20,
        suggestedMax: 20,
        grid: {
          drawOnChartArea: false,
        },
        display: true,
      },
      x: {
        display: false,
      },
    },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };
}
