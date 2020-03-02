import { v4 as uuidv4 } from 'uuid'
import { createNav } from './generic'
import { getLocal, setLocal } from './utils'
import { securities } from './json'

const createMonitorTable = () => {
  const list = getLocal('MONITOR') || []
  const container = document.getElementById('monitor-table__container')
  let html = ''

  if (list.length < 1) {
    html = `
      <div id="monitor-no-bonds">
        <h3>No bonds yet added</h3>
        <p class="secondary">Add Bonds you are interested in monitoring and Katana will alert you when they appear in idea pairs, provide insights and help you discover ideas with similar bonds. </p>
      </div>`
  } else {
    html = `
      <table class="monitor-table">
        <thead>
          <th scope="col">Bond</th>
          <th scope="col">Buy</th>
          <th scope="col">Sell</th>
          <th scope="col">Alternatives</th>
        </thead>
      <tbody>`

    html += list
      .map(
        ({ id, name, numBuySide, numSellSide, numAlternatives }) => `
        <tr id="${id}">
          <td class="bond-name">${name}</td>
          <td class=${
            numBuySide > 0 ? 'buySideColor' : 'secondary'
          }>${numBuySide}</td>
          <td class=${
            numSellSide > 0 ? 'sellSideColor' : 'secondary'
          }>${numSellSide}</td>
          <td>${numAlternatives}</td>
        </tr>
      `
      )
      .join('')

    html += `</tbody>
      </table>
      <div class="tableFooter"></div>
    `
  }

  container.innerHTML = html

  container.querySelectorAll('tr').forEach(row =>
    row.addEventListener('click', ({ target }) => {
      setLocal('MONITOR_VIEW', target.parentNode.id)
      window.location.pathname = '/pages/monitor/monitor-view.html'
    })
  )
}

const addISIN = e => {
  e.preventDefault()

  if (document.querySelector('#isin').value.length < 2) return

  const storedList = getLocal('MONITOR') || []
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)
  const numSellSide = Math.random() < 0.5 ? 0 : getRandom(0, 12)
  const numBuySide = Math.random() < 0.5 ? 0 : getRandom(0, 12)
  const numAlternatives = getRandom(0, 120)

  setLocal('MONITOR', [
    ...storedList,
    {
      id: uuidv4(),
      ...securities[storedList.length],
      numSellSide,
      numBuySide,
      numAlternatives
    }
  ])

  document.querySelector('#isin').value = ''

  createMonitorTable()
}

// Init
createNav()
createMonitorTable()

// Event Listeners
document.getElementById('mainLogo').addEventListener('click', () => {
  window.localStorage.clear()
  window.location.reload()
})
document.getElementById('addISIN').addEventListener('click', addISIN)
