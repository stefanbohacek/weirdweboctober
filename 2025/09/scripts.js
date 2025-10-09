import ready from "../../shared/js/ready.js";
import randomFromArray from "../../shared/js/randomFromArray.js";

ready(async () => {
  const resp = await fetch("/shared/data/poems/poems.json");
  const poems = await resp.json();
  const poemContainer = document.getElementById("poem-container");

  const updatePoem = (poemContainer) => {
    const poem = randomFromArray(poems);
    poemContainer.innerHTML = /* html */ `
  <p>${poem.lines.join("<br />")}</p>
  <p>—${poem.author}</p>
  `;
  };

  poemContainer.addEventListener("click", () => {
    updatePoem(poemContainer);
  });

  poemContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      updatePoem(poemContainer);
    }
  });

  if (window.webgazer) {
    let wasLookingAway = false;
    let hasSeenValidData = false;

    webgazer
      .setGazeListener((data, elapsedTime) => {
        if (data != null) {
          hasSeenValidData = true;
          wasLookingAway = false;
        }

        if (data == null && hasSeenValidData && !wasLookingAway) {
          updatePoem(poemContainer);
          wasLookingAway = true;
        }
      })
      .begin();

    webgazer.showVideoPreview(false);
    webgazer.showPredictionPoints(false);
  }

  updatePoem(poemContainer);
});
