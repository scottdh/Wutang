import { getExpirySpan, getRandomZscore, getRandomReversion } from "./utils";
import securities from "./securities.json";

const img_inKatanaIndex_new =
  "<img src='./img/katana_logo_new.png' style='height: 16px;' />";
const img_inKatanaIndex =
  "<img src='./img/katana_logo_inIndex.png' style='height: 16px;' />";

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

const navMenus = Array.prototype.slice.call(document.querySelectorAll("nav"));
const ideasTables = Array.prototype.slice.call(
  document.querySelectorAll(".tradeIdeas_table")
);

const findArtboard = element => {
  return element.closest("div.artboard").id;
};

{
  /* <img src='./img/katana_logo_platform.png' alt='katana logo'/> */
}

const createNav = () => {
  navMenus.forEach(nav => {
    const artboard = findArtboard(nav);
    let html;
    if (artboard === "pairDetails") {
      html = `
      "<a href='#' class='mainLogo'></a>"
      <ul>
        <li class="active">
            <div>&larr;</div>
            <label>Back</label>
        </li>
       </ul>`;
    } else {
      html =
        "<a href='#' class='mainLogo'></a>" +
        "<ul>" +
        `${navItems
          .map(item => {
            // if nav item matches artboard's ID, add active class
            if (artboard === item.artboard_ID) {
              return `<li class="active">
                  <div class="icon"></div>
                  <label>${item.label}</label>
                </li>`;
            } else {
              return `<li>
                  <div class="icon"></div>
                  <label>${item.label}</label>
                </li>`;
            }
          })
          .join("")}` +
        "</ul>";
    }

    nav.innerHTML = html;
  });
};

const createIdeasTables = () => {
  ideasTables.forEach(table => {
    let html = `
    <table>
      <thead>
      <th scope="col"></th>
        <th scope="col">Buy</th>
        <th scope="col">Sell</th>
        <th scope="col">Z-score</th>
        <th scope="col">Reversion</th>
        <th></th>
      </thead>
      <tbody>`;
    html += securities
      .map((security, index) => {
        const rowData = `
          <tr>
          <td class="col_new">${
            security.in_katana_index
              ? security.new
                ? "·  " + img_inKatanaIndex
                : img_inKatanaIndex
              : ""
          }</td>
            <td class="buySide ${security.is_monitored ? "monitored" : ""}">${
          security["name"]
        }</td>
            <td class="sellSide">${securities[index]["name"]}</td>
            <td class=>${getRandomZscore()}</td>
            <td class=>${getRandomReversion()} bp</td>
          </tr>
          `;
        return rowData;
      })
      .join("");
    html += `</tbody>
    </table>
    <div class="tableFooter">
      <div>Showing 1-20 of 37,486 ideas</div>
    </div>
    
          `;
    table.innerHTML = html;
  });
};
console.log(ideasTables);
createIdeasTables();
createNav();

// `<ul>
// <li>
//   <div class="icon"></div>
//   <label>Dashboard</label>
// </li>
// <li class="active">
//   <div class="icon"></div>
//   <label>Trade ideas</label>
// </li>
// <li>
//   <div class="icon"></div>
//   <label>Bookmarks</label>
// </li>
// </ul>`;
