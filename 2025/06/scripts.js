const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
const cubeInner = document.querySelector(".cube > div");
const cubeBottom = document.querySelector(".cube > div > div:nth-child(4)");

slider.addEventListener("input", function () {
  const meltPercent = this.value;
  sliderValue.innerHTML = this.value;

  const progress = meltPercent / 100;
  const translateY = progress * 50;
  const scaleY = 1 - progress * 0.99;

  cubeInner.style.transform = `translate3d(0, ${translateY}px, 0) scaleY(${scaleY})`;

  const puddleSize = progress * 76.92308;
  cubeBottom.style.boxShadow = `0px 0px 0 ${puddleSize}px rgba(255, 255, 255, 0.2)`;
});
