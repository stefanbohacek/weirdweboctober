import ready from "../../shared/js/ready.js";

ready(async () => {
  const resp = await fetch("/shared/data/stefanbohacek.com/versions.json");
  const versions = await resp.json();

  const slider = document.getElementById("slider");
  const sliderValue = document.getElementById("slider-value");
  const versionImage = document.getElementById("version-image");

  slider.max = versions.length - 1;
  slider.setAttribute("aria-valuemax", versions.length - 1);

  function updateVersion(index) {
    const version = versions[index];
    const announcement = `Version ${version.version} from ${version.date} (${
      index + 1
    }/${versions.length})`;
    sliderValue.textContent = announcement;
    versionImage.src = `./images/version-${version.version}.png`;
    versionImage.alt = `Screenshot of version ${version.version} of my website from ${version.date}. ${version.alt}`;
    slider.setAttribute("aria-valuenow", index);
    slider.setAttribute(
      "aria-valuetext",
      `Version ${version.version} from ${version.date}`
    );
  }

  updateVersion(0);

  slider.addEventListener("input", function () {
    updateVersion(parseInt(this.value));
  });
});
