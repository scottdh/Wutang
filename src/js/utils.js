const KatanaIndexLogo =
  '<img src="/img/katana_logo_inIndex.png" style="height: 16px;" />'

const navItems = [
  {
    icon: null,
    label: 'Dashboard',
    id: 'dashboard'
  },
  {
    icon: null,
    label: 'Trade ideas',
    id: 'tradeIdeas'
  },
  {
    icon: null,
    label: 'Bookmarks',
    id: 'bookmarks'
  },
  {
    icon: null,
    label: 'Monitor',
    id: 'monitor'
  }
]

const goBack = () => {
  window.history.back()
}

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
  const numIndexed = rows.filter(r => r.classList.contains('isIndexed')).length

  return {
    numIdeas: rows.length - numIndexed,
    numIndexed,
    numNew: rows.filter(row => row.classList.contains('isNew')).length
  }
}

const getRandomComparison = (version = 1) => {
  let html = '<div class="similarityIcons">'

  switch (version) {
    case 2:
      if (Math.random() < 0.5) {
        html += '<div class="secondary"></div>'
        break
      }

      html += `
        ${Math.random() < 0.1 ? '<i class="fas fa-info-circle"></i>' : ''} 
        ${Math.random() < 0.3 ? '<i class="fas fa-flag"></i>' : ''}
        ${Math.random() < 0.3 ? '<i class="fas fa-industry"></i>' : ''}
        ${Math.random() < 0.6 ? '<i class="fas fa-star"></i>' : ''}
        ${Math.random() < 0.6 ? '<i class="fas fa-calendar-alt"></i>' : ''}
      `
      break
    default:
      const showHide = Math.random() < 0.3
      html += `
        <i class="${showHide ? 'secondary' : ''} fas fa-info-circle"></i>
        <i class="fas fa-flag ${showHide ? 'secondary' : ''}"></i>
        <i class="fas fa-industry ${showHide < 0.3 ? 'secondary' : ''}"></i>
        <i class="fas fa-star ${showHide < 0.3 ? 'secondary' : ''}"></i>
        <i class="fas fa-calendar-alt ${showHide < 0.3 ? 'secondary' : ''}"></i>
      `
      break
  }

  html += '</div>'

  return html
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
  goBack,
  getExpirySpan,
  getRandomZscore,
  getRandomReversion,
  getRandomComparison,
  KatanaIndexLogo,
  navItems,
  getCounts,
  STORAGE_PREFIX,
  getLocal,
  setLocal
}
