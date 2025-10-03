const slider = document.getElementById("slider");
const brain = document.getElementById("brain");
const scribble = document.getElementById("scribble");
// const opacityValue = document.getElementById("opacityValue");
const minDuration = 600;
const maxDuration = 2000;

let animation = brain.animate(
  [
    { transform: "translateY(0)" },
    { transform: "translateY(3px)" },
    { transform: "translateY(0)" },
  ],
  {
    duration: maxDuration,
    iterations: Infinity,
  }
);

slider.addEventListener("input", function () {
  const opacity = this.value / 100;
  scribble.style.opacity = opacity;

  const distance = `${Math.max(this.value / 10, 3)}px`;
  brain.style.setProperty("--float-distance", distance);

  animation.effect.setKeyframes([
    { transform: "translateY(0)" },
    { transform: `translateY(${distance})` },
    { transform: "translateY(0)" },
  ]);

  const scale = 0.5 + (this.value / 100) * 0.5;
  scribble.style.transform = `scale(${scale})`;

  const duration =
    maxDuration - (this.value / 100) * (maxDuration - minDuration);

  animation.effect.updateTiming({ duration });
  console.log(duration);
});
