import ready from "../../shared/js/ready.js";

ready(async () => {
  const doublesText = document.getElementById("doubles-text");
  const word = "Doubles";
  const letterSizes = {};

  word.split("").forEach((char, index) => {
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = char;
    letter.dataset.index = index;
    letterSizes[index] = 1;

    letter.addEventListener("click", () => {
      letterSizes[index] *= 2;
      letter.style.fontSize = `${letterSizes[index]}em`;
    });

    doublesText.appendChild(letter);
  });
});
