const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
const topImage = document.getElementById("top-image");
const opacityValue = document.getElementById("opacityValue");

slider.addEventListener("input", function () {
  const opacity = this.value / 100;
  sliderValue.innerHTML = this.value
  topImage.style.opacity = opacity;
  opacityValue.textContent = this.value;
});
