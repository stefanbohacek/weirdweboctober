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
    let validDataCount = 0;
    let nullCount = 0;
    let blinkCooldown = 0;

    webgazer
      .setGazeListener((data, elapsedTime) => {
        const currentDataIsValid = data !== null;

        if (currentDataIsValid) {
          validDataCount++;
          nullCount = 0;
        } else if (validDataCount > 30) {
          nullCount++;

          if (nullCount >= 3 && blinkCooldown === 0) {
            console.log("blink detected");
            updatePoem(poemContainer);
            blinkCooldown = 60;
          }
        }

        if (blinkCooldown > 0) {
          blinkCooldown--;
        }
      })
      .begin();

    webgazer.showVideoPreview(true);
    webgazer.showPredictionPoints(true);
  }

  updatePoem(poemContainer);
});
