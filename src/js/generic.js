import {
  getRandomZscore,
  getRandomReversion,
  KatanaIndexLogo,
  navItems
} from "./utils";
import { securities } from "./json";

export const createNav = () => {
  document.querySelectorAll("#main-nav").forEach(nav => {
    const artboard = nav.closest("div.artboard").id;
    let html;
    if (artboard === "pairDetails" || artboard === "filterView") {
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

export const createIdeasTables = () => {
  document.querySelectorAll(".tradeIdeas_table").forEach(table => {
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
        <tbody>
      `;

    html += securities
      .map(
        ({ isIndexed, isNew, isMonitored, name }) => `
          <tr class="ideaRow">
            <td>
              <div class="status">
                ${isNew ? '<span class="new-indicator">·</span>' : ""}
                ${isIndexed ? KatanaIndexLogo : ""}
              </div>
            </td>
            <td class="buySide ${isMonitored ? "monitored" : ""}">${name}</td>
            <td class="sellSide">${name}</td>
            <td class=>${getRandomZscore()}</td>
            <td class=>${getRandomReversion()}bp</td>
          </tr>
        `
      )
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
