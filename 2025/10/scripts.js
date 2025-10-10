import ready from "../../shared/js/ready.js";

ready(async () => {
  const resp = await fetch("/shared/data/warnings/warnings.json");
  const warnings = await resp.json();

  const leaveBtn = document.getElementById("leave");
  const ignoreBtn = document.getElementById("ignore");
  const warningText = document.getElementById("warning");
  let currentWarningIndex = 1;

  ignoreBtn.addEventListener("click", () => {
    if (warnings.length > 0) {
      currentWarningIndex++;
      const warning = warnings.shift();

      document.body.style.backgroundColor = "#" + warning.bg;
      warningText.innerHTML = warning.text;
      warningText.setAttribute("aria-label", `Warning #${currentWarningIndex}`);
      warningText.focus();
    } else {
      leaveBtn.remove();
      ignoreBtn.remove();
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#fff";
      document.querySelector("h1 a").style.color = "#fff";
      warningText.innerHTML = /* html */ `
        <iframe class="mx-auto" width="560" height="315" src="https://www.youtube.com/embed/amn3kn0XPLQ?si=96b8sdK913OSO8Bg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <p>
          <a target="_blank" style="color:#fff" href="https://en.wikipedia.org/wiki/Ray_cat">Ray cat</a>
        </p>
      `;
    }
  });

  leaveBtn.addEventListener("click", () => {
    document.body.style.backgroundColor =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#3f3f3f"
        : "#fff";
    document.body.innerHTML = "";
  });
});
