(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var _securities = _interopRequireDefault(require("./securities.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var navItems = [{
  icon: null,
  label: "Dashboard",
  artboard_ID: "dashboard"
}, {
  icon: null,
  label: "Trade ideas",
  artboard_ID: "tradeIdeas"
}, {
  icon: null,
  label: "Bookmarks",
  artboard_ID: "bookmarks"
}];
var navMenus = Array.prototype.slice.call(document.querySelectorAll("nav"));
var ideasTables = Array.prototype.slice.call(document.querySelectorAll(".tradeIdeas_table"));

var findArtboard = function findArtboard(element) {
  return element.closest("div.artboard").id;
};

var createNav = function createNav() {
  navMenus.forEach(function (nav) {
    var artboard = findArtboard(nav);
    var html;

    if (artboard === "pairDetails") {
      html = "\n      <ul>\n        <li class=\"active\">\n            <div>&larr;</div>\n            <label>Back</label>\n        </li>\n       </ul>";
    } else {
      html = "<ul>" + "".concat(navItems.map(function (item) {
        // if nav item matches artboard's ID, add active class
        if (artboard === item.artboard_ID) {
          return "<li class=\"active\">\n                  <div class=\"icon\"></div>\n                  <label>".concat(item.label, "</label>\n                </li>");
        } else {
          return "<li>\n                  <div class=\"icon\"></div>\n                  <label>".concat(item.label, "</label>\n                </li>");
        }
      }).join("")) + "</ul>";
    }

    nav.innerHTML = html;
  });
};

var createIdeasTables = function createIdeasTables() {
  ideasTables.forEach(function (table) {
    var html = "\n    <table>\n      <thead>\n      <th scope=\"col\"></th>\n        <th scope=\"col\">Buy</th>\n        <th scope=\"col\">Sell</th>\n        <th scope=\"col\">Z-score</th>\n        <th scope=\"col\">Reversion</th>\n        <th></th>\n      </thead>\n      <tbody>";
    html += _securities["default"].map(function (security, index) {
      var rowData = "\n          <tr>\n          <td class=\"col_new\">".concat(security["new"] ? "New" : "", "</td>\n            <td class=\"buySide\">").concat(security["name"], "</td>\n            <td class=\"sellSide\">").concat(_securities["default"][index]["name"], "</td>\n            <td class=>").concat((0, _utils.getRandomZscore)(), "</td>\n            <td class=>").concat((0, _utils.getRandomReversion)(), " bp</td>\n          </tr>\n          ");
      return rowData;
    }).join("");
    html += "</tbody>\n    </table>\n    \n          ";
    table.innerHTML = html;
  });
};

console.log(ideasTables);
createIdeasTables();
createNav(); // `<ul>
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

},{"./securities.json":2,"./utils":3}],2:[function(require,module,exports){
module.exports=[
  {
    "isin": "XS1973630889",
    "name": "ZHPRHK 8 13/20 21/01/2023",
    "country_of_risk": "CHN",
    "bb_composite": "B",
    "industry_group": "Financials",
    "coupon_rate": 8.65,
    "maturity_date": "2023-01-21",
    "currency": "USD",
    "issuer_name": "Zhenro Properties Group Limited",
    "industry_sector": "Corporate",
    "new": true
  },
  {
    "isin": "XS0908570459",
    "name": "VW 3 3/10 22/03/2033",
    "country_of_risk": "DEU",
    "bb_composite": "BBB+",
    "industry_group": "Consumer Goods",
    "coupon_rate": 3.3,
    "maturity_date": "2033-03-22",
    "currency": "EUR",
    "issuer_name": "Volkswagen International Finance N.V.",
    "industry_sector": "Corporate",
    "new": true
  },
  {
    "isin": "XS1329671132",
    "name": "EXOIM 2 1/8 02/12/2022",
    "country_of_risk": "ITA",
    "bb_composite": "BBB+",
    "industry_group": "Consumer Goods",
    "coupon_rate": 2.125,
    "maturity_date": "2015-12-03",
    "currency": "EUR",
    "issuer_name": "EXOR N.V.",
    "industry_sector": "Corporate",
    "new": true
  },
  {
    "isin": "USU85969AC41",
    "name": "SGLSJ 6 1/8 27/06/2022",
    "last_query_date": "2020-01-31 03:08:59.851379",
    "country_of_risk": "ZAF",
    "bb_composite": "BB-",
    "industry_group": "Basic Materials",
    "coupon_rate": 6.125,
    "maturity_date": "2022-06-27 00:00:00",
    "currency": "USD",
    "ticker": "SGLSJ",
    "issuer_name": "Stillwater Mining Company",
    "industry_sector": "Corporate"
  },
  {
    "isin": "USP9451YAC77",
    "name": "UNACEM 5 7/8 10/30/21",
    "last_query_date": "2019-01-18 04:00:00.732769",
    "country_of_risk": "PER",
    "bb_composite": "BB",
    "industry_group": "Industrials",
    "coupon_rate": 5.875,
    "maturity_date": "2021-10-30 00:00:00",
    "issue_date": "2014-10-31 00:00:00",
    "currency": "USD",
    "par_value": 1000,
    "ticker": "UNACEM",
    "issuer_name": "Union Andina de Cementos",
    "industry_sector": "Corporate"
  },
  {
    "isin": "XS1238166257",
    "name": "LANDMA 3 21/50 12/06/2020",
    "country_of_risk": "CHN",
    "bb_composite": "A",
    "industry_group": "Financials",
    "coupon_rate": 3.42,
    "maturity_date": "2020-06-12 00:00:00",
    "issue_date": "2015-06-12 00:00:00",
    "currency": "USD",
    "par_value": 1000,
    "ticker": "LANDMA",
    "issuer_name": "LANDMARK FUNDING 2015 LIMITED",
    "industry_sector": "Corporate"
  },
  {
    "isin": "XS1681519184",
    "name": "GSK 1 0 12/09/2026",
    "last_query_date": "2020-01-31 03:05:09.069627",
    "country_of_risk": "USA",
    "bb_composite": "A-",
    "industry_group": "Healthcare",
    "coupon_rate": 1,
    "maturity_date": "2026-09-12 00:00:00",
    "issue_date": "2017-09-12 00:00:00",
    "currency": "EUR",
    "par_value": 1000,
    "ticker": "GSK",
    "issuer_name": "GlaxoSmithKline Capital PLC",
    "industry_sector": "Corporate"
  },
  {
    "isin": "XS1807409450",
    "name": "HYNOE 0 7/8 10/16/23",
    "last_query_date": "2019-01-18 04:00:00.732769",
    "country_of_risk": "AUT",
    "bb_composite": "A",
    "industry_group": "Financials",
    "coupon_rate": 0.875,
    "maturity_date": "2023-10-16 00:00:00",
    "issue_date": "2018-04-16 00:00:00",
    "currency": "EUR",
    "par_value": 100000,
    "ticker": "HYNOE",
    "issuer_name": "",
    "industry_sector": "Corporate"
  }
]
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomReversion = exports.getRandomZscore = exports.getExpirySpan = void 0;

var getExpirySpan = function getExpirySpan(security) {
  var today = new Date.now();
  console.log(security.maturity_date - today);
};

exports.getExpirySpan = getExpirySpan;

var getRandomZscore = function getRandomZscore() {
  var min = 1;
  var max = 4;
  var random = Math.random() * (max - min) + min;
  var zScore = random.toFixed(2);
  return zScore;
};

exports.getRandomZscore = getRandomZscore;

var getRandomReversion = function getRandomReversion() {
  var min = -20;
  var max = 100;
  var random = Math.floor(Math.random() * (max - min) + min);
  return random;
};

exports.getRandomReversion = getRandomReversion;

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
