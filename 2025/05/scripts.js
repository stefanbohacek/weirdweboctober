import player from "../../shared/js/toneJSPlayer.js";

const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");
const recordBtn = document.getElementById("record-btn");
const downloadBtn = document.getElementById("download-btn");
let recordedBlob = null;

const tempoSlider = document.getElementById("tempo-slider");
const tempoValue = document.getElementById("tempo-value");
const volumeSlider = document.getElementById("volume-slider");
const volumeValue = document.getElementById("volume-value");
const reverbSlider = document.getElementById("reverb-slider");
const reverbValue = document.getElementById("reverb-value");
const attackSlider = document.getElementById("attack-slider");
const attackValue = document.getElementById("attack-value");
const releaseSlider = document.getElementById("release-slider");
const releaseValue = document.getElementById("release-value");
const densitySlider = document.getElementById("density-slider");
const densityValue = document.getElementById("density-value");
const pitchSlider = document.getElementById("pitch-slider");
const pitchValue = document.getElementById("pitch-value");
const distortionSlider = document.getElementById("distortion-slider");
const distortionValue = document.getElementById("distortion-value");
const delaySlider = document.getElementById("delay-slider");
const delayValue = document.getElementById("delay-value");
const filterSlider = document.getElementById("filter-slider");
const filterValue = document.getElementById("filter-value");

playBtn.addEventListener("click", async () => {
  const song =
    "frederic-chopin-prelude-in-e-minor-op28-no4/chopin-e-minor-op28-no4.json";

  if (!player.isLoaded) {
    await player.load(song);
  }
  if (player.isPlaying) {
    player.pause();
    playBtn.textContent = "Play";
  } else {
    player.play();
    playBtn.textContent = "Pause";
  }
});

stopBtn.addEventListener("click", () => {
  player.stop();
  playBtn.textContent = "Play";
});

recordBtn.addEventListener("click", async () => {
  if (!player.isRecording) {
    await player.startRecording();
    recordBtn.textContent = "Stop recording";
    recordBtn.style.background = "red";
    downloadBtn.disabled = true;
  } else {
    recordedBlob = await player.stopRecording();
    recordBtn.textContent = "Start recording";
    recordBtn.style.background = "";
    downloadBtn.disabled = false;
  }
});

downloadBtn.addEventListener("click", () => {
  if (recordedBlob) {
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chopin-remix-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  }
});

tempoSlider.addEventListener("input", function () {
  const value = this.value;
  tempoValue.textContent = value;
  player.setTempo(value / 100);
});

volumeSlider.addEventListener("input", function () {
  const value = this.value;
  volumeValue.textContent = value;
  player.setVolume(parseFloat(value));
});

reverbSlider.addEventListener("input", function () {
  const value = this.value;
  reverbValue.textContent = value;
  player.setReverb(parseFloat(value));
});

attackSlider.addEventListener("input", function () {
  const value = (this.value / 100).toFixed(2);
  attackValue.textContent = value;
  player.setAttack(parseFloat(value));
});

releaseSlider.addEventListener("input", function () {
  const value = (this.value / 100).toFixed(2);
  releaseValue.textContent = value;
  player.setRelease(parseFloat(value));
});

densitySlider.addEventListener("input", function () {
  const value = this.value;
  densityValue.textContent = value;
  player.setNoteDensity(parseFloat(value) / 100);
});

pitchSlider.addEventListener("input", function () {
  pitchValue.textContent = this.value;
  player.setPitch(parseFloat(this.value));
});

distortionSlider.addEventListener("input", function () {
  distortionValue.textContent = this.value;
  player.setDistortion(parseFloat(this.value));
});

delaySlider.addEventListener("input", function () {
  delayValue.textContent = this.value;
  player.setDelay(parseFloat(this.value));
});

filterSlider.addEventListener("input", function () {
  filterValue.textContent = Math.round(this.value).toLocaleString();
  player.setFilter(parseFloat(this.value));
});
