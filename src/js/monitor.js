import { createNav } from './generic'
import { getLocal, setLocal } from './utils'
import { securities } from './json'

const createMonitorTable = () => {
  const list = getLocal('MONITOR') || []

  document.querySelectorAll('.monitor_table').forEach(table => {
    let html = ''

    if (list.length < 1) {
      html = `
      <div id="montor_table_emptyState">
      <h3>No bonds yet added</h3>
      <p>Add Bonds you are interested in monitoring and Katana will alert you when they appear in idea pairs, provide insights and help you discover ideas with similar bonds. </p>
      </div>
      `
    } else {
      html = `
      <table>
      <thead>
        <th scope="col">Bond</th>
        <th scope="col">Buy</th>
        <th scope="col">Sell</th>
        <th scope="col">Ideas</th>
      </thead>
      <tbody>`

      html += list
        .map(
          ({ name, amountBuySide, amountSellSide, ideas }) => `
          <tr>
            <td>${name}</td>
            <td class=${
              amountBuySide > 0 ? 'buySideColor' : 'secondary'
            }>${amountBuySide}</td>
            <td class=${
              amountSellSide > 0 ? 'sellSideColor' : 'secondary'
            }>${amountSellSide}</td>
            <td>${ideas}</td>
            <td></td>
          </tr>
        `
        )
        .join('')

      html += `</tbody>
        </table>
        <div class="tableFooter"></div>
      `
    }
    table.innerHTML = html
  })
}

const addISIN = e => {
  e.preventDefault()

  if (
    e.target.id !== 'addISIN' ||
    document.querySelector('#isin').value.length < 2
  )
    return

  const storedList = getLocal('MONITOR') || []
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)

  if (Math.random() < 0.5) {
    setLocal('MONITOR', [
      ...storedList,
      {
        name: securities[storedList.length].name,
        amountSellSide: 0,
        amountBuySide: 0,
        ideas: getRandom(0, 120)
      }
    ])
  } else {
    setLocal('MONITOR', [
      ...storedList,
      {
        name: securities[storedList.length].name,
        amountSellSide: getRandom(0, 12),
        amountBuySide: getRandom(0, 12),
        ideas: getRandom(0, 120)
      }
    ])
  }

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
document.addEventListener('click', addISIN, false)
