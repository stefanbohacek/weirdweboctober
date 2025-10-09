import ready from "../../shared/js/ready.js";
import randomFromArray from "../../shared/js/randomFromArray.js";

ready(async () => {
  const resp = await fetch("/shared/data/poems/poems.json");
  const poems = await resp.json();
  const poemContainer = document.getElementById("poem-container");

  const updatePoem = () => {
    const poem = randomFromArray(poems);
    poemContainer.innerHTML = /* html */ `
      <p>${poem.lines.join("<br />")}</p>
      <p>—${poem.author}</p>
    `;
  };

  updatePoem();
  poemContainer.classList.remove("d-none");

  setInterval(() => {
    poemContainer.classList.add("d-none");
    setTimeout(() => {
      updatePoem();
      poemContainer.classList.remove("d-none");
    }, 1300);
  }, 6750);
});
