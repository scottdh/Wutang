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
/* harmony import */ var _generic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generic */ "./src/js/generic.js");



Object(_generic__WEBPACK_IMPORTED_MODULE_1__["createIdeasTables"])()
Object(_generic__WEBPACK_IMPORTED_MODULE_1__["createNav"])()

const presetFilters = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getLocal"])('FILTERS')
const toggleFilter = filter => {
  const openClass = '--is-open'
  const selected = filter.nextElementSibling

  document
    .querySelectorAll('.Filter__label')
    .forEach(
      label =>
        label !== filter && label.classList.remove(`Filter__label${openClass}`)
    )
  filter.classList.toggle(`Filter__label${openClass}`)

  document
    .querySelectorAll('.FilterGroup')
    .forEach(
      group =>
        group !== selected && group.classList.remove(`FilterGroup${openClass}`)
    )
  selected.classList.toggle(`FilterGroup${openClass}`)
}
const toggleFilters = () => {
  const storedFilters = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getLocal"])('FILTERS')

  Object.keys(storedFilters).forEach(key => {
    const action = storedFilters[key].length ? 'add' : 'remove'

    document
      .querySelector(`[for=${key}`)
      .classList[action](`Filter__label--is-selected`)
  })
}
const selectOption = label => {
  const { name, value } = label.previousElementSibling
  const storedFilters = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getLocal"])('FILTERS') || {}
  const storedGroup = storedFilters[name] || []
  let group = storedGroup.includes(value)
    ? storedGroup.filter(item => item !== value)
    : [...storedGroup, value]
  const newFilters = { ...storedFilters, [name]: group }

  label.parentNode.classList.toggle('FilterGroup__label--is-selected')
  toggleFilters()
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setLocal"])('FILTERS', newFilters)
}
const updateFilters = filters => {
  Object.keys(filters).forEach(key => {
    const selected = filters[key]
    const options = document.querySelectorAll(`input[name=${key}]`)

    options.forEach(option => {
      if (!selected.includes(option.value)) return
      option.parentNode.classList.toggle(`FilterGroup__label--is-selected`)
    })
  })
}
const saveFilter = () => {
  console.log('Save', Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getLocal"])('FILTERS'))
}

if (presetFilters) {
  updateFilters(presetFilters)
  toggleFilters()
}

// Event handlers
document
  .querySelectorAll('.Filter__label')
  .forEach(filter =>
    filter.addEventListener('click', ({ target }) => toggleFilter(target))
  )
document
  .querySelectorAll('.label')
  .forEach(filter =>
    filter.addEventListener('click', ({ target }) => selectOption(target))
  )
document.querySelector('#save-filter').addEventListener('click', saveFilter)


/***/ }),

/***/ "./src/js/generic.js":
/*!***************************!*\
  !*** ./src/js/generic.js ***!
  \***************************/
/*! exports provided: createNav, createIdeasTables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNav", function() { return createNav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIdeasTables", function() { return createIdeasTables; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json */ "./src/js/json/index.js");



const createNav = () => {
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
        `${_utils__WEBPACK_IMPORTED_MODULE_0__["navItems"]
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
  document.querySelectorAll(".tradeIdeas_table").forEach(table => {
    let html = `
      <table>
        <thead>
        <th scope="col"></th>
          <th scope="col">Buy</th>
          <th scope="col">Sell</th>
          <th scope="col">Z-score</th>
          <th scope="col">Reversion</th>
          <th scope="col">Similarity</th>
          <th></th>
        </thead>
        <tbody>
      `;

    html += _json__WEBPACK_IMPORTED_MODULE_1__["securities"]
      .map(
        ({ isIndexed, isNew, isMonitored, name }) => `
          <tr class="ideaRow">
            <td>
              <div class="status">
                ${isNew ? '<span class="new-indicator">·</span>' : ""}
                ${isIndexed ? _utils__WEBPACK_IMPORTED_MODULE_0__["KatanaIndexLogo"] : ""}
              </div>
            </td>
            <td class="buySide ${isMonitored ? "monitored" : ""}">${name}</td>
            <td class="sellSide">${name}</td>
            <td class=>${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomZscore"])()}</td>
            <td class=>${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomReversion"])()}bp</td>
            <td class=>${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomComparisonV2"])()}</td>
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


/***/ }),

/***/ "./src/js/json/ideas.json":
/*!********************************!*\
  !*** ./src/js/json/ideas.json ***!
  \********************************/
/*! exports provided: totalNumHits, hits, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"totalNumHits\":79,\"hits\":[{\"id\":\"XS1955255283XS1991146892\",\"spreadLastZscore\":3.060257141660099,\"similarityPct\":0.5046763311430427,\"spreadMean\":-81.6773212096774,\"spreadMeanReversion\":248.3961612096773,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1955255283\",\"rating\":\"BBB\",\"name\":\"CHQENE 5 5/8 18/03/2022\",\"issuer\":\"CHQENE\",\"issuerName\":\"Chongqing Energy Investment Group Co., Ltd.\",\"issuerMaturity\":\"CHQENE 22\",\"maturityCategory\":\"1-to-2\",\"couponRate\":\"5.625\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1991146892\",\"rating\":\"BB-\",\"name\":\"GRNLHK 6 0 17/07/2021\",\"issuer\":\"GRNLHK\",\"issuerName\":\"Greenland Hong Kong Holdings Limited\",\"issuerMaturity\":\"GRNLHK 21\",\"maturityCategory\":\"1-to-2\",\"couponRate\":\"6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS1953029284XS1725308859\",\"spreadLastZscore\":3.059873907841211,\"similarityPct\":0.5046763311430427,\"spreadMean\":-234.5324807142857,\"spreadMeanReversion\":105.9180707142857,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1953029284\",\"rating\":\"BBB-\",\"name\":\"SHIMAO 6 1/8 21/02/2024\",\"issuer\":\"SHIMAO\",\"issuerName\":\"Shimao Property Holdings Limited\",\"issuerMaturity\":\"SHIMAO 24\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.125\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1725308859\",\"rating\":\"BB-\",\"name\":\"TPHL 6 3/5 02/03/2023\",\"issuer\":\"TPHL\",\"issuerName\":\"TIMES CHINA HOLDINGS LIMITED\",\"issuerMaturity\":\"TPHL 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS1891434604XS1725308859\",\"spreadLastZscore\":3.039380524460399,\"similarityPct\":0.5046763311430427,\"spreadMean\":-264.81207309523813,\"spreadMeanReversion\":99.61817309523812,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1891434604\",\"rating\":\"BBB-\",\"name\":\"SHIMAO 6 3/8 15/10/2021\",\"issuer\":\"SHIMAO\",\"issuerName\":\"Shimao Property Holdings Limited\",\"issuerMaturity\":\"SHIMAO 21\",\"maturityCategory\":\"1-to-2\",\"couponRate\":\"6.375\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1725308859\",\"rating\":\"BB-\",\"name\":\"TPHL 6 3/5 02/03/2023\",\"issuer\":\"TPHL\",\"issuerName\":\"TIMES CHINA HOLDINGS LIMITED\",\"issuerMaturity\":\"TPHL 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS1772325210XS1725308859\",\"spreadLastZscore\":3.0883844491586405,\"similarityPct\":0.6115592037254812,\"spreadMean\":-152.8138368253968,\"spreadMeanReversion\":98.55117682539682,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1772325210\",\"rating\":\"BB\",\"name\":\"LOGPH 6 3/8 07/03/2021\",\"issuer\":\"LOGPH\",\"issuerName\":\"Logan Property Holdings Company Limited\",\"issuerMaturity\":\"LOGPH 21\",\"maturityCategory\":\"1-to-2\",\"couponRate\":\"6.375\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1725308859\",\"rating\":\"BB-\",\"name\":\"TPHL 6 3/5 02/03/2023\",\"issuer\":\"TPHL\",\"issuerName\":\"TIMES CHINA HOLDINGS LIMITED\",\"issuerMaturity\":\"TPHL 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS1972092248XS1725308859\",\"spreadLastZscore\":3.5214423731818547,\"similarityPct\":0.6561498362974706,\"spreadMean\":181.93586567999998,\"spreadMeanReversion\":82.65305432,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1972092248\",\"rating\":\"BB-\",\"name\":\"CHFOTN 8 3/5 08/04/2024\",\"issuer\":\"CHFOTN\",\"issuerName\":\"CFLD (CAYMAN) INVESTMENT LTD.\",\"issuerMaturity\":\"CHFOTN 24\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"8.6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1725308859\",\"rating\":\"BB-\",\"name\":\"TPHL 6 3/5 02/03/2023\",\"issuer\":\"TPHL\",\"issuerName\":\"TIMES CHINA HOLDINGS LIMITED\",\"issuerMaturity\":\"TPHL 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS1811206066XS1725308859\",\"spreadLastZscore\":3.1699516246444106,\"similarityPct\":0.6115592037254812,\"spreadMean\":-82.44649952000002,\"spreadMeanReversion\":68.89522952000003,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1811206066\",\"rating\":\"BB-\",\"name\":\"KWGPRO 7 7/8 09/08/2021\",\"issuer\":\"KWGPRO\",\"issuerName\":\"KWG Group Holdings Limited\",\"issuerMaturity\":\"KWGPRO 21\",\"maturityCategory\":\"1-to-2\",\"couponRate\":\"7.875\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1725308859\",\"rating\":\"BB-\",\"name\":\"TPHL 6 3/5 02/03/2023\",\"issuer\":\"TPHL\",\"issuerName\":\"TIMES CHINA HOLDINGS LIMITED\",\"issuerMaturity\":\"TPHL 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS1974522853XS1725308859\",\"spreadLastZscore\":3.2427065269876336,\"similarityPct\":0.5046763311430427,\"spreadMean\":-138.74997174603172,\"spreadMeanReversion\":63.42580174603174,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1974522853\",\"rating\":\"BBB-\",\"name\":\"COGARD 6 1/2 08/04/2024\",\"issuer\":\"COGARD\",\"issuerName\":\"Country Garden Holdings Company Limited\",\"issuerMaturity\":\"COGARD 24\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.5\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1725308859\",\"rating\":\"BB-\",\"name\":\"TPHL 6 3/5 02/03/2023\",\"issuer\":\"TPHL\",\"issuerName\":\"TIMES CHINA HOLDINGS LIMITED\",\"issuerMaturity\":\"TPHL 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US73181LAA98XS1713473608\",\"spreadLastZscore\":3.0074104268943507,\"similarityPct\":0.6131158328141298,\"spreadMean\":-119.9840042063492,\"spreadMeanReversion\":45.09806420634919,\"bondBuy\":{\"countryOfRisk\":\"RUS\",\"isin\":\"US73181LAA98\",\"rating\":\"BB\",\"name\":\"PGILLN 4 7/10 29/01/2024\",\"issuer\":\"PGILLN\",\"issuerName\":\"POLYUS FINANCE PLC\",\"issuerMaturity\":\"PGILLN 24\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"4.7\",\"currency\":\"USD\",\"industry\":\"Basic Materials\"},\"bondSell\":{\"countryOfRisk\":\"IRL\",\"isin\":\"XS1713473608\",\"rating\":\"BB+\",\"name\":\"GTLKOA 5 19/20 17/04/2025\",\"issuer\":\"GTLKOA\",\"issuerName\":\"GTLK EUROPE CAPITAL DESIGNATED ACTIVITY COMPANY\",\"issuerMaturity\":\"GTLKOA 25\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"5.95\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS1517977093US39530VAB45\",\"spreadLastZscore\":3.3752589721401876,\"similarityPct\":0.5815624340647151,\"spreadMean\":-103.8748834920635,\"spreadMeanReversion\":43.57333349206348,\"bondBuy\":{\"countryOfRisk\":\"IDN\",\"isin\":\"XS1517977093\",\"rating\":\"BB\",\"name\":\"PWONIJ 5 0 14/02/2024\",\"issuer\":\"PWONIJ\",\"issuerName\":\"PAKUWON PRIMA PTE. LTD.\",\"issuerMaturity\":\"PWONIJ 24\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"5\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"IND\",\"isin\":\"US39530VAB45\",\"rating\":\"BB-\",\"name\":\"GRNKEN 5 19/20 29/07/2026\",\"issuer\":\"GRNKEN\",\"issuerName\":\"Greenko Solar (Mauritius) Limited\",\"issuerMaturity\":\"GRNKEN 26\",\"maturityCategory\":\"6-to-10\",\"couponRate\":\"5.95\",\"currency\":\"USD\",\"industry\":\"Utilities\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS2027426027XS1725308859\",\"spreadLastZscore\":3.8744816619450235,\"similarityPct\":0.6561498362974706,\"spreadMean\":11.690954444444433,\"spreadMeanReversion\":38.410955555555546,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS2027426027\",\"rating\":\"BB-\",\"name\":\"TPHL 6 3/4 16/07/2023\",\"issuer\":\"TPHL\",\"issuerName\":\"TIMES CHINA HOLDINGS LIMITED\",\"issuerMaturity\":\"TPHL 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.75\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1725308859\",\"rating\":\"BB-\",\"name\":\"TPHL 6 3/5 02/03/2023\",\"issuer\":\"TPHL\",\"issuerName\":\"TIMES CHINA HOLDINGS LIMITED\",\"issuerMaturity\":\"TPHL 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"6.6\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US26139PAA12XS0897453493\",\"spreadLastZscore\":3.0032571097425844,\"similarityPct\":0.5199344652609288,\"spreadMean\":2.628406111111113,\"spreadMeanReversion\":37.9825638888889,\"bondBuy\":{\"countryOfRisk\":\"ARE\",\"isin\":\"US26139PAA12\",\"rating\":\"BBB+\",\"name\":\"DPWDU 3 227/250 31/05/2023\",\"issuer\":\"DPWDU\",\"issuerName\":\"DP World Crescent Limited\",\"issuerMaturity\":\"DPWDU 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"3.908\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"ARE\",\"isin\":\"XS0897453493\",\"rating\":\"A\",\"name\":\"ADCBUH 4 1/2 06/03/2023\",\"issuer\":\"ADCBUH\",\"issuerName\":\"ADCB Finance (Cayman) Limited\",\"issuerMaturity\":\"ADCBUH 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"4.5\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"XS1984473071XS1685542141\",\"spreadLastZscore\":3.103694915992822,\"similarityPct\":0.6561498362974706,\"spreadMean\":122.65972404761906,\"spreadMeanReversion\":37.12214595238096,\"bondBuy\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1984473071\",\"rating\":\"BB-\",\"name\":\"CENCHI 7 1/4 24/04/2023\",\"issuer\":\"CENCHI\",\"issuerName\":\"Central China Real Estate Limited\",\"issuerMaturity\":\"CENCHI 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"7.25\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"CHN\",\"isin\":\"XS1685542141\",\"rating\":\"BB-\",\"name\":\"KWGPRO 5 1/5 21/09/2022\",\"issuer\":\"KWGPRO\",\"issuerName\":\"KWG Group Holdings Limited\",\"issuerMaturity\":\"KWGPRO 22\",\"maturityCategory\":\"1-to-2\",\"couponRate\":\"5.2\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US23330JAA97US46507VAB80\",\"spreadLastZscore\":3.4888061383156113,\"similarityPct\":0.5815624340647151,\"spreadMean\":90.86397879999998,\"spreadMeanReversion\":36.320971199999974,\"bondBuy\":{\"countryOfRisk\":\"ARE\",\"isin\":\"US23330JAA97\",\"rating\":\"BBB+\",\"name\":\"DPWDU 6 17/20 02/07/2037\",\"issuer\":\"DPWDU\",\"issuerName\":\"DP World PLC\",\"issuerMaturity\":\"DPWDU 37\",\"maturityCategory\":\"11-to-20\",\"couponRate\":\"6.85\",\"currency\":\"USD\",\"industry\":\"Industrials\"},\"bondSell\":{\"countryOfRisk\":\"ISR\",\"isin\":\"US46507VAB80\",\"rating\":\"BBB\",\"name\":\"ISRELE 7 3/4 15/12/2027\",\"issuer\":\"ISRELE\",\"issuerName\":\"The Israel Electric Corporation LTD.\",\"issuerMaturity\":\"ISRELE 27\",\"maturityCategory\":\"6-to-10\",\"couponRate\":\"7.75\",\"currency\":\"USD\",\"industry\":\"Utilities\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US26139PAB94XS1825455030\",\"spreadLastZscore\":3.0172043116807203,\"similarityPct\":0.6115592037254812,\"spreadMean\":62.76018480000001,\"spreadMeanReversion\":35.96194519999998,\"bondBuy\":{\"countryOfRisk\":\"ARE\",\"isin\":\"US26139PAB94\",\"rating\":\"BBB+\",\"name\":\"DPWDU 4 106/125 26/09/2028\",\"issuer\":\"DPWDU\",\"issuerName\":\"DP World Crescent Limited\",\"issuerMaturity\":\"DPWDU 28\",\"maturityCategory\":\"6-to-10\",\"couponRate\":\"4.848\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"QAT\",\"isin\":\"XS1825455030\",\"rating\":\"A-\",\"name\":\"COMQAT 5 0 24/05/2023\",\"issuer\":\"COMQAT\",\"issuerName\":\"CBQ Finance Limited\",\"issuerMaturity\":\"COMQAT 23\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"5\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US23330JAA97XS1887479902\",\"spreadLastZscore\":3.487682109771504,\"similarityPct\":0.5666304157794883,\"spreadMean\":75.26369168,\"spreadMeanReversion\":35.72029831999998,\"bondBuy\":{\"countryOfRisk\":\"ARE\",\"isin\":\"US23330JAA97\",\"rating\":\"BBB+\",\"name\":\"DPWDU 6 17/20 02/07/2037\",\"issuer\":\"DPWDU\",\"issuerName\":\"DP World PLC\",\"issuerMaturity\":\"DPWDU 37\",\"maturityCategory\":\"11-to-20\",\"couponRate\":\"6.85\",\"currency\":\"USD\",\"industry\":\"Industrials\"},\"bondSell\":{\"countryOfRisk\":\"ARE\",\"isin\":\"XS1887479902\",\"rating\":\"BBB+\",\"name\":\"ALDAR 4 3/4 29/09/2025\",\"issuer\":\"ALDAR\",\"issuerName\":\"ALDAR SUKUK LTD.\",\"issuerMaturity\":\"ALDAR 25\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"4.75\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US05537GAD79US05674XAA90\",\"spreadLastZscore\":3.004438190181834,\"similarityPct\":0.5815624340647151,\"spreadMean\":-42.01128873015873,\"spreadMeanReversion\":34.09896873015874,\"bondBuy\":{\"countryOfRisk\":\"PER\",\"isin\":\"US05537GAD79\",\"rating\":\"BBB\",\"name\":\"BCOCPE 5 1/4 22/09/2029\",\"issuer\":\"BCOCPE\",\"issuerName\":\"BBVA Banco Continental\",\"issuerMaturity\":\"BCOCPE 29\",\"maturityCategory\":\"6-to-10\",\"couponRate\":\"5.25\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"BRA\",\"isin\":\"US05674XAA90\",\"rating\":\"BBB-\",\"name\":\"SUZANO 5 3/4 14/07/2026\",\"issuer\":\"SUZANO\",\"issuerName\":\"Suzano Austria GmbH\",\"issuerMaturity\":\"SUZANO 26\",\"maturityCategory\":\"6-to-10\",\"couponRate\":\"5.75\",\"currency\":\"USD\",\"industry\":\"Basic Materials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US26139PAB94US46507VAB80\",\"spreadLastZscore\":3.5534711265246828,\"similarityPct\":0.6274991086910956,\"spreadMean\":36.20050112,\"spreadMeanReversion\":33.35125888,\"bondBuy\":{\"countryOfRisk\":\"ARE\",\"isin\":\"US26139PAB94\",\"rating\":\"BBB+\",\"name\":\"DPWDU 4 106/125 26/09/2028\",\"issuer\":\"DPWDU\",\"issuerName\":\"DP World Crescent Limited\",\"issuerMaturity\":\"DPWDU 28\",\"maturityCategory\":\"6-to-10\",\"couponRate\":\"4.848\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"ISR\",\"isin\":\"US46507VAB80\",\"rating\":\"BBB\",\"name\":\"ISRELE 7 3/4 15/12/2027\",\"issuer\":\"ISRELE\",\"issuerName\":\"The Israel Electric Corporation LTD.\",\"issuerMaturity\":\"ISRELE 27\",\"maturityCategory\":\"6-to-10\",\"couponRate\":\"7.75\",\"currency\":\"USD\",\"industry\":\"Utilities\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US279158AE95US71647NAK54\",\"spreadLastZscore\":3.04513865846587,\"similarityPct\":0.5046763311430427,\"spreadMean\":-71.57981571428571,\"spreadMeanReversion\":33.0213057142857,\"bondBuy\":{\"countryOfRisk\":\"COL\",\"isin\":\"US279158AE95\",\"rating\":\"BBB\",\"name\":\"ECOPET 7 3/8 18/09/2043\",\"issuer\":\"ECOPET\",\"issuerName\":\"Ecopetrol S.A.\",\"issuerMaturity\":\"ECOPET 43\",\"maturityCategory\":\"20-plus\",\"couponRate\":\"7.375\",\"currency\":\"USD\",\"industry\":\"Energy\"},\"bondSell\":{\"countryOfRisk\":\"BRA\",\"isin\":\"US71647NAK54\",\"rating\":\"BB\",\"name\":\"PETBRA 7 1/4 17/03/2044\",\"issuer\":\"PETBRA\",\"issuerName\":\"Petrobras Global Finance B.V.\",\"issuerMaturity\":\"PETBRA 44\",\"maturityCategory\":\"20-plus\",\"couponRate\":\"7.25\",\"currency\":\"USD\",\"industry\":\"Energy\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US26139PAB94XS1887479902\",\"spreadLastZscore\":3.7418776521578843,\"similarityPct\":0.6115592037254812,\"spreadMean\":20.600214,\"spreadMeanReversion\":32.75058600000002,\"bondBuy\":{\"countryOfRisk\":\"ARE\",\"isin\":\"US26139PAB94\",\"rating\":\"BBB+\",\"name\":\"DPWDU 4 106/125 26/09/2028\",\"issuer\":\"DPWDU\",\"issuerName\":\"DP World Crescent Limited\",\"issuerMaturity\":\"DPWDU 28\",\"maturityCategory\":\"6-to-10\",\"couponRate\":\"4.848\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"bondSell\":{\"countryOfRisk\":\"ARE\",\"isin\":\"XS1887479902\",\"rating\":\"BBB+\",\"name\":\"ALDAR 4 3/4 29/09/2025\",\"issuer\":\"ALDAR\",\"issuerName\":\"ALDAR SUKUK LTD.\",\"issuerMaturity\":\"ALDAR 25\",\"maturityCategory\":\"3-to-5\",\"couponRate\":\"4.75\",\"currency\":\"USD\",\"industry\":\"Financials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"},{\"id\":\"US210314AB60US49836AAB08\",\"spreadLastZscore\":3.3084010125705516,\"similarityPct\":0.5666304157794883,\"spreadMean\":-249.0933204761905,\"spreadMeanReversion\":31.113290476190485,\"bondBuy\":{\"countryOfRisk\":\"PER\",\"isin\":\"US210314AB60\",\"rating\":\"BBB-\",\"name\":\"TRANSM 4 7/10 16/04/2034\",\"issuer\":\"TRANSM\",\"issuerName\":\"CONSORCIO TRANSMANTARO S.A.\",\"issuerMaturity\":\"TRANSM 34\",\"maturityCategory\":\"11-to-20\",\"couponRate\":\"4.7\",\"currency\":\"USD\",\"industry\":\"Utilities\"},\"bondSell\":{\"countryOfRisk\":\"BRA\",\"isin\":\"US49836AAB08\",\"rating\":\"BB+\",\"name\":\"KLAB 7 0 03/04/2049\",\"issuer\":\"KLAB\",\"issuerName\":\"Klabin Austria GmbH\",\"issuerMaturity\":\"KLAB 49\",\"maturityCategory\":\"20-plus\",\"couponRate\":\"7\",\"currency\":\"USD\",\"industry\":\"Basic Materials\"},\"targetDate\":\"2020-02-20T00:00:00Z\"}]}");

/***/ }),

/***/ "./src/js/json/index.js":
/*!******************************!*\
  !*** ./src/js/json/index.js ***!
  \******************************/
/*! exports provided: securities, ideas, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "securities", function() { return securities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ideas", function() { return ideas; });
/* harmony import */ var _securities_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./securities.json */ "./src/js/json/securities.json");
var _securities_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./securities.json */ "./src/js/json/securities.json", 1);
/* harmony import */ var _ideas_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ideas.json */ "./src/js/json/ideas.json");
var _ideas_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./ideas.json */ "./src/js/json/ideas.json", 1);



const securities = _securities_json__WEBPACK_IMPORTED_MODULE_0__
const ideas = _ideas_json__WEBPACK_IMPORTED_MODULE_1__

/* harmony default export */ __webpack_exports__["default"] = ({ securities, ideas });


/***/ }),

/***/ "./src/js/json/securities.json":
/*!*************************************!*\
  !*** ./src/js/json/securities.json ***!
  \*************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"isin\":\"XS1973630889\",\"name\":\"ZHPRHK 8 13/20 21/01/2023\",\"country_of_risk\":\"CHN\",\"bb_composite\":\"B\",\"industry_group\":\"Financials\",\"coupon_rate\":8.65,\"maturity_date\":\"2023-01-21\",\"currency\":\"USD\",\"issuer_name\":\"Zhenro Properties Group Limited\",\"industry_sector\":\"Corporate\",\"isIndexed\":true,\"isNew\":true},{\"isin\":\"XS0908570459\",\"name\":\"VW 3 3/10 22/03/2033\",\"country_of_risk\":\"DEU\",\"bb_composite\":\"BBB+\",\"industry_group\":\"Consumer Goods\",\"coupon_rate\":3.3,\"maturity_date\":\"2033-03-22\",\"currency\":\"EUR\",\"issuer_name\":\"Volkswagen International Finance N.V.\",\"industry_sector\":\"Corporate\",\"isIndexed\":true,\"isNew\":true},{\"isin\":\"XS1329671132\",\"name\":\"EXOIM 2 1/8 02/12/2022\",\"country_of_risk\":\"ITA\",\"bb_composite\":\"BBB+\",\"industry_group\":\"Consumer Goods\",\"coupon_rate\":2.125,\"maturity_date\":\"2015-12-03\",\"currency\":\"EUR\",\"issuer_name\":\"EXOR N.V.\",\"industry_sector\":\"Corporate\",\"isIndexed\":true,\"isNew\":true},{\"isin\":\"USU85969AC41\",\"name\":\"SGLSJ 6 1/8 27/06/2022\",\"last_query_date\":\"2020-01-31 03:08:59.851379\",\"country_of_risk\":\"ZAF\",\"bb_composite\":\"BB-\",\"industry_group\":\"Basic Materials\",\"coupon_rate\":6.125,\"maturity_date\":\"2022-06-27 00:00:00\",\"currency\":\"USD\",\"ticker\":\"SGLSJ\",\"issuer_name\":\"Stillwater Mining Company\",\"industry_sector\":\"Corporate\",\"isIndexed\":true,\"isNew\":true},{\"isin\":\"USP9451YAC77\",\"name\":\"UNACEM 5 7/8 10/30/21\",\"last_query_date\":\"2019-01-18 04:00:00.732769\",\"country_of_risk\":\"PER\",\"bb_composite\":\"BB\",\"industry_group\":\"Industrials\",\"coupon_rate\":5.875,\"maturity_date\":\"2021-10-30 00:00:00\",\"issue_date\":\"2014-10-31 00:00:00\",\"currency\":\"USD\",\"par_value\":1000,\"ticker\":\"UNACEM\",\"issuer_name\":\"Union Andina de Cementos\",\"industry_sector\":\"Corporate\",\"isIndexed\":true,\"isNew\":true},{\"isin\":\"XS1238166257\",\"name\":\"LANDMA 3 21/50 12/06/2020\",\"country_of_risk\":\"CHN\",\"bb_composite\":\"A\",\"industry_group\":\"Financials\",\"coupon_rate\":3.42,\"maturity_date\":\"2020-06-12 00:00:00\",\"issue_date\":\"2015-06-12 00:00:00\",\"currency\":\"USD\",\"par_value\":1000,\"ticker\":\"LANDMA\",\"issuer_name\":\"LANDMARK FUNDING 2015 LIMITED\",\"industry_sector\":\"Corporate\",\"isIndexed\":true,\"isNew\":true},{\"isin\":\"XS1681519184\",\"name\":\"GSK 1 0 12/09/2026\",\"last_query_date\":\"2020-01-31 03:05:09.069627\",\"country_of_risk\":\"USA\",\"bb_composite\":\"A-\",\"industry_group\":\"Healthcare\",\"coupon_rate\":1,\"maturity_date\":\"2026-09-12 00:00:00\",\"issue_date\":\"2017-09-12 00:00:00\",\"currency\":\"EUR\",\"par_value\":1000,\"ticker\":\"GSK\",\"issuer_name\":\"GlaxoSmithKline Capital PLC\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"XS1807409450\",\"name\":\"HYNOE 0 7/8 10/16/23\",\"last_query_date\":\"2019-01-18 04:00:00.732769\",\"country_of_risk\":\"AUT\",\"bb_composite\":\"A\",\"industry_group\":\"Financials\",\"coupon_rate\":0.875,\"maturity_date\":\"2023-10-16 00:00:00\",\"issue_date\":\"2018-04-16 00:00:00\",\"currency\":\"EUR\",\"par_value\":100000,\"ticker\":\"HYNOE\",\"issuer_name\":\"\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"XS1973630889\",\"name\":\"ZHPRHK 8 13/20 21/01/2023\",\"country_of_risk\":\"CHN\",\"bb_composite\":\"B\",\"industry_group\":\"Financials\",\"coupon_rate\":8.65,\"maturity_date\":\"2023-01-21\",\"currency\":\"USD\",\"issuer_name\":\"Zhenro Properties Group Limited\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"XS0908570459\",\"name\":\"VW 3 3/10 22/03/2033\",\"country_of_risk\":\"DEU\",\"bb_composite\":\"BBB+\",\"industry_group\":\"Consumer Goods\",\"coupon_rate\":3.3,\"maturity_date\":\"2033-03-22\",\"currency\":\"EUR\",\"issuer_name\":\"Volkswagen International Finance N.V.\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"XS1329671132\",\"name\":\"EXOIM 2 1/8 02/12/2022\",\"country_of_risk\":\"ITA\",\"bb_composite\":\"BBB+\",\"industry_group\":\"Consumer Goods\",\"coupon_rate\":2.125,\"maturity_date\":\"2015-12-03\",\"currency\":\"EUR\",\"issuer_name\":\"EXOR N.V.\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"USU85969AC41\",\"name\":\"SGLSJ 6 1/8 27/06/2022\",\"last_query_date\":\"2020-01-31 03:08:59.851379\",\"country_of_risk\":\"ZAF\",\"bb_composite\":\"BB-\",\"industry_group\":\"Basic Materials\",\"coupon_rate\":6.125,\"maturity_date\":\"2022-06-27 00:00:00\",\"currency\":\"USD\",\"ticker\":\"SGLSJ\",\"issuer_name\":\"Stillwater Mining Company\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"USP9451YAC77\",\"name\":\"UNACEM 5 7/8 10/30/21\",\"last_query_date\":\"2019-01-18 04:00:00.732769\",\"country_of_risk\":\"PER\",\"bb_composite\":\"BB\",\"industry_group\":\"Industrials\",\"coupon_rate\":5.875,\"maturity_date\":\"2021-10-30 00:00:00\",\"issue_date\":\"2014-10-31 00:00:00\",\"currency\":\"USD\",\"par_value\":1000,\"ticker\":\"UNACEM\",\"issuer_name\":\"Union Andina de Cementos\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"XS1238166257\",\"name\":\"LANDMA 3 21/50 12/06/2020\",\"country_of_risk\":\"CHN\",\"bb_composite\":\"A\",\"industry_group\":\"Financials\",\"coupon_rate\":3.42,\"maturity_date\":\"2020-06-12 00:00:00\",\"issue_date\":\"2015-06-12 00:00:00\",\"currency\":\"USD\",\"par_value\":1000,\"ticker\":\"LANDMA\",\"issuer_name\":\"LANDMARK FUNDING 2015 LIMITED\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"XS1681519184\",\"name\":\"GSK 1 0 12/09/2026\",\"last_query_date\":\"2020-01-31 03:05:09.069627\",\"country_of_risk\":\"USA\",\"bb_composite\":\"A-\",\"industry_group\":\"Healthcare\",\"coupon_rate\":1,\"maturity_date\":\"2026-09-12 00:00:00\",\"issue_date\":\"2017-09-12 00:00:00\",\"currency\":\"EUR\",\"par_value\":1000,\"ticker\":\"GSK\",\"issuer_name\":\"GlaxoSmithKline Capital PLC\",\"industry_sector\":\"Corporate\",\"isIndexed\":true},{\"isin\":\"XS1807409450\",\"name\":\"HYNOE 0 7/8 10/16/23\",\"last_query_date\":\"2019-01-18 04:00:00.732769\",\"country_of_risk\":\"AUT\",\"bb_composite\":\"A\",\"industry_group\":\"Financials\",\"coupon_rate\":0.875,\"maturity_date\":\"2023-10-16 00:00:00\",\"issue_date\":\"2018-04-16 00:00:00\",\"currency\":\"EUR\",\"par_value\":100000,\"ticker\":\"HYNOE\",\"issuer_name\":\"\",\"industry_sector\":\"Corporate\"},{\"isin\":\"USP9451YAC77\",\"name\":\"UNACEM 5 7/8 10/30/21\",\"last_query_date\":\"2019-01-18 04:00:00.732769\",\"country_of_risk\":\"PER\",\"bb_composite\":\"BB\",\"industry_group\":\"Industrials\",\"coupon_rate\":5.875,\"maturity_date\":\"2021-10-30 00:00:00\",\"issue_date\":\"2014-10-31 00:00:00\",\"currency\":\"USD\",\"par_value\":1000,\"ticker\":\"UNACEM\",\"issuer_name\":\"Union Andina de Cementos\",\"industry_sector\":\"Corporate\"},{\"isin\":\"XS1238166257\",\"name\":\"LANDMA 3 21/50 12/06/2020\",\"country_of_risk\":\"CHN\",\"bb_composite\":\"A\",\"industry_group\":\"Financials\",\"coupon_rate\":3.42,\"maturity_date\":\"2020-06-12 00:00:00\",\"issue_date\":\"2015-06-12 00:00:00\",\"currency\":\"USD\",\"par_value\":1000,\"ticker\":\"LANDMA\",\"issuer_name\":\"LANDMARK FUNDING 2015 LIMITED\",\"industry_sector\":\"Corporate\"},{\"isin\":\"XS1681519184\",\"name\":\"GSK 1 0 12/09/2026\",\"last_query_date\":\"2020-01-31 03:05:09.069627\",\"country_of_risk\":\"USA\",\"bb_composite\":\"A-\",\"industry_group\":\"Healthcare\",\"coupon_rate\":1,\"maturity_date\":\"2026-09-12 00:00:00\",\"issue_date\":\"2017-09-12 00:00:00\",\"currency\":\"EUR\",\"par_value\":1000,\"ticker\":\"GSK\",\"issuer_name\":\"GlaxoSmithKline Capital PLC\",\"industry_sector\":\"Corporate\"},{\"isin\":\"XS1807409450\",\"name\":\"HYNOE 0 7/8 10/16/23\",\"last_query_date\":\"2019-01-18 04:00:00.732769\",\"country_of_risk\":\"AUT\",\"bb_composite\":\"A\",\"industry_group\":\"Financials\",\"coupon_rate\":0.875,\"maturity_date\":\"2023-10-16 00:00:00\",\"issue_date\":\"2018-04-16 00:00:00\",\"currency\":\"EUR\",\"par_value\":100000,\"ticker\":\"HYNOE\",\"issuer_name\":\"\",\"industry_sector\":\"Corporate\"}]");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: getExpirySpan, getRandomZscore, getRandomReversion, getRandomComparison, getRandomComparisonV2, KatanaIndexLogo, navItems, STORAGE_PREFIX, getLocal, setLocal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExpirySpan", function() { return getExpirySpan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomZscore", function() { return getRandomZscore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomReversion", function() { return getRandomReversion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomComparison", function() { return getRandomComparison; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomComparisonV2", function() { return getRandomComparisonV2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KatanaIndexLogo", function() { return KatanaIndexLogo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navItems", function() { return navItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STORAGE_PREFIX", function() { return STORAGE_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocal", function() { return getLocal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocal", function() { return setLocal; });
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




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map