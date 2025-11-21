// ------------------------------------------
// Shared Colors
// ------------------------------------------
const COLORS = [
  "#9B1D64",
  "#2ECC71",
  "#1B4F72",
  "#FF6F61",
  "#FFD700",
  "#8E44AD",
  "#E67E22",
  "#16A085",
];

// Get colors automatically based on dataset size
function autoColors(count) {
  return COLORS.slice(0, count);
}

// ------------------------------------------
// Tool Usage Chart (Bar, Line, Pie etc.)
// ------------------------------------------
export function createUsageChart(ctx, labels, data, type = "bar") {
  if (window.usageChart) window.usageChart.destroy();

  window.usageChart = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [
        {
          label: "Tool Usage",
          data,
          backgroundColor: autoColors(data.length),
          borderColor: autoColors(data.length),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: type === "bar" ? { y: { beginAtZero: true } } : {},
    },
    plugins: [ChartDataLabels],
  });
}

// ------------------------------------------
// Activity Chart
// ------------------------------------------
export function createActivityChart(ctx, labels, data) {
  if (window.activityChart) window.activityChart.destroy();

  window.activityChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Activity",
          data,
          backgroundColor: autoColors(data.length),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
    plugins: [ChartDataLabels],
  });
}

// ------------------------------------------
// Earnings Line Chart
// ------------------------------------------
export function createEarningsLineChart(ctx, labels, data) {
  if (window.earnLine) window.earnLine.destroy();

  window.earnLine = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Earnings",
          data,
          fill: true,
          tension: 0.3,
          borderColor: COLORS[0],
          backgroundColor: COLORS[0] + "33", // transparent fill
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
    },
    plugins: [ChartDataLabels],
  });
}

// ------------------------------------------
// Earnings Pie Chart
// ------------------------------------------
export function createEarningsPie(ctx, labels, data) {
  if (window.earnPie) window.earnPie.destroy();

  window.earnPie = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: autoColors(data.length),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}
