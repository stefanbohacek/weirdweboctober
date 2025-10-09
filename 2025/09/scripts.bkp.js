import ready from "../../shared/js/ready.js";
import isMobile from "../../shared/js/isMobile.js";
import randomFromArray from "../../shared/js/randomFromArray.js";

ready(async () => {
  const resp = await fetch("/shared/data/poems/poems.json");
  const poems = await resp.json();
  const poemContainer = document.getElementById("poem-container");

  if (!poemContainer) {
    console.error("Poem container not found!");
    return;
  }

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

  let lastBlinkTime = 0;
  const BLINK_DEBOUNCE = isMobile() ? 3000 : 1000;

  document.addEventListener("blink", (e) => {
    console.log("blink event received", e.detail, e.detail.faceDetected);

    if (e.detail.faceDetected) {
      const currentTime = Date.now();
      if (currentTime - lastBlinkTime > BLINK_DEBOUNCE) {
        updatePoem(poemContainer);
        lastBlinkTime = currentTime;
      }
    }
  });

  updatePoem(poemContainer);
});
