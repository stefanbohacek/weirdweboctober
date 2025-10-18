import ready from "../../shared/js/ready.js";

ready(async () => {
  const maxDataPoints = 60;
  const initialData = [];
  const labels = [];

  const emojiElement = document.getElementById("emoji");
  const liveRegion = document.getElementById("live-region");
  let currentEmoji = "📈";
  let lastAnnouncementTime = 0;

  const getEmojiData = (value) => {
    if (value >= 200) return { emoji: "🤑", label: "money-mouth face" };
    if (value >= 100)
      return { emoji: "😄", label: "grinning face with smiling eyes" };
    if (value >= 40)
      return { emoji: "😊", label: "smiling face with smiling eyes" };
    if (value >= 20) return { emoji: "🙂", label: "slightly smiling face" };
    if (value >= -20) return { emoji: "😐", label: "neutral face" };
    if (value >= -100) return { emoji: "😟", label: "worried face" };
    if (value >= -200) return { emoji: "😨", label: "fearful face" };
    return { emoji: "😱", label: "face screaming in fear" };
  };

  const getRandomValue = () => {
    const spike = Math.random();

    if (spike < 0.9) {
      return Math.random() * 200 - 100;
    } else {
      return Math.random() * 2000 - 1000;
    }
  };

  const updateEmojiPosition = (chartInstance) => {
    const meta = chartInstance.getDatasetMeta(0);
    const lastPoint = meta.data[meta.data.length - 1];

    if (lastPoint) {
      const x = lastPoint.x;
      const y = lastPoint.y;

      emojiElement.style.left = `${x}px`;
      emojiElement.style.top = `${y}px`;
      emojiElement.style.transform = "translate(-50%, -50%)";
    }
  };

  const chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Trading Value",
          data: initialData,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: -1000,
          max: 1000,
          ticks: {
            callback: (value) => {
              return value + "%";
            },
          },
        },
        x: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return context.parsed.y.toFixed(1) + "%";
            },
          },
        },
      },
      animation: {
        duration: 500,
        onComplete: (animation) => {
          const chartData = animation.chart.data.datasets[0].data;
          const currentValue = chartData[chartData.length - 1];
          if (currentValue === undefined) return;

          const emojiData = getEmojiData(currentValue);
          if (emojiData.emoji !== currentEmoji) {
            currentEmoji = emojiData.emoji;
            emojiElement.textContent = emojiData.emoji;
            emojiElement.setAttribute("aria-label", emojiData.label);

            const now = Date.now();

            if (now - lastAnnouncementTime > 4000) {
              liveRegion.textContent = `Stock market sentiment: ${
                emojiData.label
              }, value at ${currentValue.toFixed(1)}%`;
              lastAnnouncementTime = now;
            }
          }
        },
      },
    },
  });

  setInterval(() => {
    const newValue = getRandomValue();

    if (chart.data.datasets[0].data.length >= maxDataPoints) {
      chart.data.datasets[0].data.shift();
      chart.data.labels.shift();
    }

    chart.data.datasets[0].data.push(newValue);
    chart.data.labels.push("");

    const scale = 1 + Math.abs(newValue) / 2000;
    emojiElement.style.fontSize = `${scale * 2.5}rem`;

    chart.update("none");
    updateEmojiPosition(chart);
    emojiElement.classList.add("visible");
    chart.update();
  }, 670);
});
