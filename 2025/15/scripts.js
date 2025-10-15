import ready from "../../shared/js/ready.js";

ready(async () => {
  const resp = await fetch("/shared/data/unicode/unicode-versions.json");
  const data = await resp.json();

  new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Number of Unicode characters",
          data: data.map((row) => row.count),
          version: data.map((row) => row.version),
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "category",
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (context) => {
              const index = context[0].dataIndex;
              const version = context[0].dataset.version[index];
              return `Unicode ${version} (${context[0].label})`;
            },
          },
        },
      },
    },
  });
});
