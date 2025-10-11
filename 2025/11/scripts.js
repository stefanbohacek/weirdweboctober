import ready from "../../shared/js/ready.js";

ready(async () => {
  const cameraBtn = document.getElementById("camera");
  const allEmoji = [...document.getElementsByClassName("emoji")];
  let availableEmoji = [...allEmoji];

  function getRandomEmoji() {
    if (availableEmoji.length === 0) {
      availableEmoji = [...allEmoji];
    }

    const randomIndex = Math.floor(Math.random() * availableEmoji.length);
    const selectedEmoji = availableEmoji[randomIndex];
    availableEmoji.splice(randomIndex, 1);
    
    return selectedEmoji;
  }

  cameraBtn.addEventListener("click", () => {
    cameraBtn.textContent = "📸";
    
    setTimeout(() => {
      cameraBtn.textContent = "📷";
      const face = getRandomEmoji();
      allEmoji.forEach(emoji => emoji.classList.add("d-none"));
      face.classList.remove("d-none");
    }, 150);
  });

  cameraBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cameraBtn.click();
    }
  });
});