import ready from "../../shared/js/ready.js";

ready(async () => {
  const lightbulbBtn = document.getElementById("lightbulb");
  const emojiWrapper = document.querySelector(".emoji-wrapper");
  const allEmoji = [...document.getElementsByClassName("emoji")].filter(
    (emoji) => !emoji.classList.contains("thinking")
  );
  const thinkingEmoji = [...document.getElementsByClassName("thinking")];
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

  function updateEmojiDisplay(emoji) {
    const label = emoji.getAttribute("aria-label");
    emojiWrapper.setAttribute("aria-label", label);
  }

  lightbulbBtn.addEventListener("click", () => {
    lightbulbBtn.classList.toggle("off");
    document.body.classList.toggle("off");
    document.body.classList.toggle("on");

    const isOn = !lightbulbBtn.classList.contains("off");
    lightbulbBtn.setAttribute("aria-pressed", isOn);
    lightbulbBtn.setAttribute("aria-label", isOn ? "Lightbulb on, click to turn off" : "Lightbulb off, click to turn on");

    if (lightbulbBtn.classList.contains("off")) {
      thinkingEmoji[0].classList.remove("d-none");
      allEmoji.forEach((emoji) => emoji.classList.add("d-none"));
      updateEmojiDisplay(thinkingEmoji[0]);
    } else {
      thinkingEmoji[0].classList.add("d-none");
      const face = getRandomEmoji();
      allEmoji.forEach((emoji) => emoji.classList.add("d-none"));
      face.classList.remove("d-none");
      updateEmojiDisplay(face);
    }
  });

  lightbulbBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      lightbulbBtn.click();
    }
  });

  updateEmojiDisplay(thinkingEmoji[0]);
});