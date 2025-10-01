const slider = document.getElementById("opacitySlider");
const topImage = document.getElementById("topImage");
const opacityValue = document.getElementById("opacityValue");

slider.addEventListener("input", function () {
  const opacity = this.value / 100;
  topImage.style.opacity = opacity;
  opacityValue.textContent = this.value;
});
