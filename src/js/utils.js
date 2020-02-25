const KatanaIndexLogo =
  '<img src="./img/katana_logo_inIndex.png" style="height: 16px;" />'

const navItems = [
  {
    icon: null,
    label: 'Dashboard',
    artboard_ID: 'dashboard'
  },
  {
    icon: null,
    label: 'Trade ideas',
    artboard_ID: 'tradeIdeas'
  },
  {
    icon: null,
    label: 'Bookmarks',
    artboard_ID: 'bookmarks'
  }
]

const getExpirySpan = security => {
  var today = new Date.now()
  console.log(security.maturity_date - today)
}

const getRandomZscore = () => {
  var min = 1
  var max = 4
  var random = Math.random() * (max - min) + min
  var zScore = random.toFixed(2)
  return zScore
}

const getRandomReversion = () => {
  var min = -20
  var max = 100
  var random = Math.floor(Math.random() * (max - min) + min)
  return random
}

const getCounts = () => {
  const rows = [...document.querySelectorAll('.ideaRow')]

  return {
    numIdeas: rows.length,
    numIndexed: rows.filter(row => row.classList.contains('isIndexed')).length,
    numNew: rows.filter(row => row.classList.contains('isNew')).length
  }
}

const STORAGE_PREFIX = 'KATANA_APP'

const getLocal = name =>
  JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}_${name}`))
const setLocal = (name, value) =>
  window.localStorage.setItem(
    `${STORAGE_PREFIX}_${name}`,
    JSON.stringify(value)
  )

export {
  getExpirySpan,
  getRandomZscore,
  getRandomReversion,
  KatanaIndexLogo,
  navItems,
  getCounts,
  STORAGE_PREFIX,
  getLocal,
  setLocal
}
