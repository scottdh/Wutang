import { getExpirySpan, getRandomZscore, getRandomReversion } from "./utils";
import securities from "./securities.json";

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

const findArtboard = (element) => {
  return element.closest("div.artboard").id;
};

const createNav = () => {
  navMenus.forEach(nav => {
    const artboard = findArtboard(nav);
    let html;
    if (artboard === "pairDetails") {
      html = `
      <ul>
        <li class="active">
            <div>&larr;</div>
            <label>Back</label>
        </li>
       </ul>`;
    } else {
      html =
        "<ul>" +
        `${navItems
          .map((item) => {
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
  ideasTables.forEach((table) => {
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
          <td class="col_new">${security.new ? "New" : ""}</td>
            <td class="buySide">${security["name"]}</td>
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
