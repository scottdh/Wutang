const KatanaIndexLogo =
  '<img src="./img/katana_logo_inIndex.png" style="height: 16px;" />';

const navItems = [
  {
    icon: null,
    label: "Dashboard",
    artboard_ID: "dashboard"
  },
  {
    icon: null,
    label: "Trade ideas",
    artboard_ID: "tradeIdeas"
  },
  {
    icon: null,
    label: "Bookmarks",
    artboard_ID: "bookmarks"
  }
];

const getExpirySpan = security => {
  var today = new Date.now();
  console.log(security.maturity_date - today);
};

const getRandomZscore = () => {
  var min = 1;
  var max = 4;
  var random = Math.random() * (max - min) + min;
  var zScore = random.toFixed(2);
  return zScore;
};

const getRandomReversion = () => {
  var min = -20;
  var max = 100;
  var random = Math.floor(Math.random() * (max - min) + min);
  return random;
};

const getRandomComparison = () => {
  let html;
  html = `
  <div class="similarityIcons">
  <i class="${Math.random() < 0.3 ? "secondary" : ""} fas fa-info-circle"></i>
  <i class="fas fa-flag ${Math.random() < 0.3 ? "secondary" : ""}"></i>
  <i class="fas fa-industry ${Math.random() < 0.3 ? "secondary" : ""}"></i>
  <i class="fas fa-star ${Math.random() < 0.3 ? "secondary" : ""}"></i>
  <i class="fas fa-calendar-alt ${Math.random() < 0.3 ? "secondary" : ""}"></i>
  </div>
  `;
  return html;
};

const getRandomComparisonV2 = () => {
  let html;
  if (Math.random() < 0.5) return "<div class='secondary'></div>";

  html = `
  <div class="similarityIcons">
  ${Math.random() < 0.1 ? "<i class='fas fa-info-circle'></i>" : ""} 
  ${Math.random() < 0.3 ? "<i class='fas fa-flag'></i>" : ""}
  ${Math.random() < 0.3 ? "<i class='fas fa-industry'></i>" : ""}
  ${Math.random() < 0.6 ? "<i class='fas fa-star'></i>" : ""}
  ${Math.random() < 0.6 ? "<i class='fas fa-calendar-alt'></i>" : ""}
  </div>
  `;
  return html;
};

const STORAGE_PREFIX = "KATANA_APP";

const getLocal = name =>
  JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}_${name}`));
const setLocal = (name, value) =>
  window.localStorage.setItem(
    `${STORAGE_PREFIX}_${name}`,
    JSON.stringify(value)
  );

export {
  getExpirySpan,
  getRandomZscore,
  getRandomReversion,
  getRandomComparison,
  getRandomComparisonV2,
  KatanaIndexLogo,
  navItems,
  STORAGE_PREFIX,
  getLocal,
  setLocal
};
