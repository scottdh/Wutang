var data = {
  securities: [
    {
      isin: "XS1973630889",
      name: "ZHPRHK 8 13/20 21/01/2023",
      country_of_risk: "CHN",
      bb_composite: "B",
      industry_group: "Financials",
      coupon_rate: 8.65,
      maturity_date: "2023-01-21",
      currency: "USD",
      issuer_name: "Zhenro Properties Group Limited",
      industry_sector: "Corporate",
      new: true
    },
    {
      isin: "XS0908570459",
      name: "VW 3 3/10 22/03/2033",
      country_of_risk: "DEU",
      bb_composite: "BBB+",
      industry_group: "Consumer Goods",
      coupon_rate: 3.3,
      maturity_date: "2033-03-22",
      currency: "EUR",
      issuer_name: "Volkswagen International Finance N.V.",
      industry_sector: "Corporate",
      new: true
    },
    {
      isin: "XS1329671132",
      name: "EXOIM 2 1/8 02/12/2022",
      country_of_risk: "ITA",
      bb_composite: "BBB+",
      industry_group: "Consumer Goods",
      coupon_rate: 2.125,
      maturity_date: "2015-12-03",
      currency: "EUR",
      issuer_name: "EXOR N.V.",
      industry_sector: "Corporate",
      new: true
    },
    {
      isin: "USU85969AC41",
      name: "SGLSJ 6 1/8 27/06/2022",
      last_query_date: "2020-01-31 03:08:59.851379",
      country_of_risk: "ZAF",
      bb_composite: "BB-",
      industry_group: "Basic Materials",
      coupon_rate: 6.125,
      maturity_date: "2022-06-27 00:00:00",
      currency: "USD",
      ticker: "SGLSJ",
      issuer_name: "Stillwater Mining Company",
      industry_sector: "Corporate"
    },
    {
      isin: "USP9451YAC77",
      name: "UNACEM 5 7/8 10/30/21",
      last_query_date: "2019-01-18 04:00:00.732769",
      country_of_risk: "PER",
      bb_composite: "BB",
      industry_group: "Industrials",
      coupon_rate: 5.875,
      maturity_date: "2021-10-30 00:00:00",
      issue_date: "2014-10-31 00:00:00",
      currency: "USD",
      par_value: 1000,
      ticker: "UNACEM",
      issuer_name: "Union Andina de Cementos",
      industry_sector: "Corporate"
    },
    {
      isin: "XS1238166257",
      name: "LANDMA 3 21/50 12/06/2020",
      country_of_risk: "CHN",
      bb_composite: "A",
      industry_group: "Financials",
      coupon_rate: 3.42,
      maturity_date: "2020-06-12 00:00:00",
      issue_date: "2015-06-12 00:00:00",
      currency: "USD",
      par_value: 1000,
      ticker: "LANDMA",
      issuer_name: "LANDMARK FUNDING 2015 LIMITED",
      industry_sector: "Corporate"
    },
    {
      isin: "XS1681519184",
      name: "GSK 1 0 12/09/2026",
      last_query_date: "2020-01-31 03:05:09.069627",
      country_of_risk: "USA",
      bb_composite: "A-",
      industry_group: "Healthcare",
      coupon_rate: 1,
      maturity_date: "2026-09-12 00:00:00",
      issue_date: "2017-09-12 00:00:00",
      currency: "EUR",
      par_value: 1000,
      ticker: "GSK",
      issuer_name: "GlaxoSmithKline Capital PLC",
      industry_sector: "Corporate"
    },
    {
      isin: "XS1807409450",
      name: "HYNOE 0 7/8 10/16/23",
      last_query_date: "2019-01-18 04:00:00.732769",
      country_of_risk: "AUT",
      bb_composite: "A",
      industry_group: "Financials",
      coupon_rate: 0.875,
      maturity_date: "2023-10-16 00:00:00",
      issue_date: "2018-04-16 00:00:00",
      currency: "EUR",
      par_value: 100000,
      ticker: "HYNOE",
      issuer_name: "",
      industry_sector: "Corporate"
    }
  ],
  getExpirySpan(security) {
    var today = new Date.now();
    console.log(security.maturity_date - today);
  },
  getRandomZscore() {
    var min = 1;
    var max = 4;
    var random = Math.random() * (max - min) + min;
    var zScore = random.toFixed(2);
    return zScore;
  },
  getRandomReversion() {
    var min = -20;
    var max = 100;
    var random = Math.floor(Math.random() * (max - min) + min);
    return random;
  }
};

navItems = [
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

var navMenus = Array.prototype.slice.call(document.querySelectorAll("nav"));
var ideasTables = Array.prototype.slice.call(
  document.querySelectorAll(".tradeIdeas_table")
);

var findArtboard = function(element) {
  return element.closest("div.artboard").id;
};

var createNav = function() {
  navMenus.forEach(nav => {
    var artboard = findArtboard(nav);
    var html;
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
          .map(function(item) {
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

var createIdeasTables = function() {
  ideasTables.forEach(function(table) {
    var html = `
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
    html += data.securities
      .map(function(security, index) {
        var rowData = `
          <tr>
          <td class="col_new">${security.new ? "New" : ""}</td>
            <td class="buySide">${security["name"]}</td>
            <td class="sellSide">${data.securities[index]["name"]}</td>
            <td class=>${data.getRandomZscore()}</td>
            <td class=>${data.getRandomReversion()} bp</td>
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
