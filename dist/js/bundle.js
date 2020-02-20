/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _securities_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./securities.json */ "./src/js/securities.json");
var _securities_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./securities.json */ "./src/js/securities.json", 1);



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
    html += _securities_json__WEBPACK_IMPORTED_MODULE_1__
      .map((security, index) => {
        const rowData = `
          <tr>
          <td class="col_new">${security.new ? "New" : ""}</td>
            <td class="buySide">${security["name"]}</td>
            <td class="sellSide">${_securities_json__WEBPACK_IMPORTED_MODULE_1__[index]["name"]}</td>
            <td class=>${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomZscore"])()}</td>
            <td class=>${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomReversion"])()} bp</td>
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


/***/ }),

/***/ "./src/js/securities.json":
/*!********************************!*\
  !*** ./src/js/securities.json ***!
  \********************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"isin\":\"XS1973630889\",\"name\":\"ZHPRHK 8 13/20 21/01/2023\",\"country_of_risk\":\"CHN\",\"bb_composite\":\"B\",\"industry_group\":\"Financials\",\"coupon_rate\":8.65,\"maturity_date\":\"2023-01-21\",\"currency\":\"USD\",\"issuer_name\":\"Zhenro Properties Group Limited\",\"industry_sector\":\"Corporate\",\"new\":true},{\"isin\":\"XS0908570459\",\"name\":\"VW 3 3/10 22/03/2033\",\"country_of_risk\":\"DEU\",\"bb_composite\":\"BBB+\",\"industry_group\":\"Consumer Goods\",\"coupon_rate\":3.3,\"maturity_date\":\"2033-03-22\",\"currency\":\"EUR\",\"issuer_name\":\"Volkswagen International Finance N.V.\",\"industry_sector\":\"Corporate\",\"new\":true},{\"isin\":\"XS1329671132\",\"name\":\"EXOIM 2 1/8 02/12/2022\",\"country_of_risk\":\"ITA\",\"bb_composite\":\"BBB+\",\"industry_group\":\"Consumer Goods\",\"coupon_rate\":2.125,\"maturity_date\":\"2015-12-03\",\"currency\":\"EUR\",\"issuer_name\":\"EXOR N.V.\",\"industry_sector\":\"Corporate\",\"new\":true},{\"isin\":\"USU85969AC41\",\"name\":\"SGLSJ 6 1/8 27/06/2022\",\"last_query_date\":\"2020-01-31 03:08:59.851379\",\"country_of_risk\":\"ZAF\",\"bb_composite\":\"BB-\",\"industry_group\":\"Basic Materials\",\"coupon_rate\":6.125,\"maturity_date\":\"2022-06-27 00:00:00\",\"currency\":\"USD\",\"ticker\":\"SGLSJ\",\"issuer_name\":\"Stillwater Mining Company\",\"industry_sector\":\"Corporate\"},{\"isin\":\"USP9451YAC77\",\"name\":\"UNACEM 5 7/8 10/30/21\",\"last_query_date\":\"2019-01-18 04:00:00.732769\",\"country_of_risk\":\"PER\",\"bb_composite\":\"BB\",\"industry_group\":\"Industrials\",\"coupon_rate\":5.875,\"maturity_date\":\"2021-10-30 00:00:00\",\"issue_date\":\"2014-10-31 00:00:00\",\"currency\":\"USD\",\"par_value\":1000,\"ticker\":\"UNACEM\",\"issuer_name\":\"Union Andina de Cementos\",\"industry_sector\":\"Corporate\"},{\"isin\":\"XS1238166257\",\"name\":\"LANDMA 3 21/50 12/06/2020\",\"country_of_risk\":\"CHN\",\"bb_composite\":\"A\",\"industry_group\":\"Financials\",\"coupon_rate\":3.42,\"maturity_date\":\"2020-06-12 00:00:00\",\"issue_date\":\"2015-06-12 00:00:00\",\"currency\":\"USD\",\"par_value\":1000,\"ticker\":\"LANDMA\",\"issuer_name\":\"LANDMARK FUNDING 2015 LIMITED\",\"industry_sector\":\"Corporate\"},{\"isin\":\"XS1681519184\",\"name\":\"GSK 1 0 12/09/2026\",\"last_query_date\":\"2020-01-31 03:05:09.069627\",\"country_of_risk\":\"USA\",\"bb_composite\":\"A-\",\"industry_group\":\"Healthcare\",\"coupon_rate\":1,\"maturity_date\":\"2026-09-12 00:00:00\",\"issue_date\":\"2017-09-12 00:00:00\",\"currency\":\"EUR\",\"par_value\":1000,\"ticker\":\"GSK\",\"issuer_name\":\"GlaxoSmithKline Capital PLC\",\"industry_sector\":\"Corporate\"},{\"isin\":\"XS1807409450\",\"name\":\"HYNOE 0 7/8 10/16/23\",\"last_query_date\":\"2019-01-18 04:00:00.732769\",\"country_of_risk\":\"AUT\",\"bb_composite\":\"A\",\"industry_group\":\"Financials\",\"coupon_rate\":0.875,\"maturity_date\":\"2023-10-16 00:00:00\",\"issue_date\":\"2018-04-16 00:00:00\",\"currency\":\"EUR\",\"par_value\":100000,\"ticker\":\"HYNOE\",\"issuer_name\":\"\",\"industry_sector\":\"Corporate\"}]");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: getExpirySpan, getRandomZscore, getRandomReversion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExpirySpan", function() { return getExpirySpan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomZscore", function() { return getRandomZscore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomReversion", function() { return getRandomReversion; });
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




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map