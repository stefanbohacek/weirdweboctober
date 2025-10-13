import ready from "../../shared/js/ready.js";

ready(async () => {
  const wrapper = document.querySelector(".upside-down-wrapper");
  let rotations = 0;

  const rotateWrapper = () => {
    rotations++;
    wrapper.style.transform = `rotate(${rotations * 180}deg)`;
  };

  wrapper.addEventListener("click", rotateWrapper);

  wrapper.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      rotateWrapper();
    }
  });
});
