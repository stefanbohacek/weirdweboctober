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

  console.log("window.webgazer", window.webgazer);

  if (window.webgazer) {
    let previousDataWasValid = false;
    let dataCount = 0;
    let validDataCount = 0;

    webgazer
      .setGazeListener((data, elapsedTime) => {
        dataCount++;

        if (dataCount % 60 === 0) {
          console.log({
            data: data !== null,
            validDataCount,
            totalCount: dataCount
          });
        }

        const currentDataIsValid = data !== null;

        if (currentDataIsValid) {
          validDataCount++;
        }

        if (previousDataWasValid && !currentDataIsValid && validDataCount > 30) {
          console.log("blink detected");
          updatePoem(poemContainer);
        }

        previousDataWasValid = currentDataIsValid;
      })
      .begin();

    webgazer.showVideoPreview(true);
    webgazer.showPredictionPoints(true);
  }

  updatePoem(poemContainer);
});