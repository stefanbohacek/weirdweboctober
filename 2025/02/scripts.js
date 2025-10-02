import randomFromArray from "../../shared/js/randomFromArray.js";

const anotherOneBtn = document.getElementById("another");
const description = document.getElementById("description");
const title = document.getElementById("title");

anotherOneBtn.addEventListener("click", (ev) => {
  showRandomBot();
});

const showRandomBot = async () => {
  description.textContent = "Loading...";
  title.textContent = "";
  anotherOneBtn.disabled = true;
  anotherOneBtn.setAttribute("aria-busy", "true");

  const resp = await fetch("/2025/02/bots.json");
  const respJSON = await resp.json();
  const bots = respJSON.filter((bot) => bot.active !== false);
  const bot = randomFromArray(bots);
  const username = bot.username.replace("@", "");
  const apiUrl = `https://${bot.server}/api/v1/accounts/lookup?acct=${username}`;
  const accountResp = await fetch(apiUrl);
  const accountData = await accountResp.json();
  const accountId = accountData.id;

  const statusesUrl = `https://${bot.server}/api/v1/accounts/${accountId}/statuses?limit=1`;
  const statusesResp = await fetch(statusesUrl);
  const statuses = await statusesResp.json();
  const mostRecentPost = statuses[0];

  const iframe = document.getElementById("iframe");
  iframe.src = `${mostRecentPost.url}/embed`;

  title.innerHTML = /* html */ `This map was posted by
    <a href="${bot.url || `https://${bot.server}/${bot.username}`}">${
    bot.name
  } @ ${bot.server}</a>
  !`;

  description.textContent = `"${bot.description}"`;
  anotherOneBtn.classList.remove("d-none");
  setTimeout(() => {
    anotherOneBtn.disabled = false;
    anotherOneBtn.removeAttribute("aria-busy");
    // anotherOneBtn.focus();
  }, 2000);
};

showRandomBot();
