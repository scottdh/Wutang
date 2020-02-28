import {
  goBack,
  getRandomZscore,
  getRandomReversion,
  KatanaIndexLogo,
  navItems
} from './utils'
import { securities } from './json'

export const createNav = () => {
  document.querySelectorAll('#main-nav').forEach(nav => {
    const { id } = nav.closest('div.artboard')
    let html = '<a href="#" id="mainLogo" class="mainLogo"></a>'

    if (['filterView'].includes(id)) {
      html += `
        <ul>
          <li id="back" class="navItem navItem--no-border">
            &larr; <label>Back</label>
          </li>
        </ul>
      `
    } else {
      html +=
        '<ul>' +
        `${navItems
          .map(
            item => `<li id="${item.id}" class="navItem ${
              id === item.id ? 'active' : ''
            }">
              <div class="icon"></div>
              <label>${item.label}</label>
            </li>`
          )
          .join('')}` +
        '</ul>'
    }

    nav.innerHTML = html

    const backButton = document.getElementById('back')
    if (backButton) backButton.addEventListener('click', goBack)
  })
}

export const createIdeasTables = (filters = {}) => {
  const appliedFilters = Object.values(filters).length
    ? Object.values(filters).reduce((mem, filter) => [...mem, ...filter])
    : []
  const rows = !!appliedFilters.length
    ? securities.filter(row => {
        let shouldDisplay = {}

        Object.keys(filters).filter(key => {
          if (filters[key].length) {
            shouldDisplay[key] = filters[key].includes(row[key])
          }
        })

        return !Object.values(shouldDisplay).includes(false)
      })
    : securities

  document.querySelectorAll('.tradeIdeas_table').forEach(table => {
    const lastIndexedRow = rows.find(row => !row.isIndexed)
    const seperatorIndex = rows.indexOf(lastIndexedRow) - 1
    let html = `
      <table class="tradeIdeas">
        <thead>
          <th scope="col"></th>
          <th scope="col">Buy</th>
          <th scope="col">Sell</th>
          <th scope="col">Z-score</th>
          <th scope="col">Reversion</th>
          <th></th>
        </thead>
        <tbody class="indexed">
      `

    html += rows
      .map((row, index) => {
        const { isIndexed, isNew, isMonitored, name } = row

        return `
            <tr class="ideaRow ${isIndexed ? 'isIndexed' : ''} ${
          isNew ? 'isNew' : ''
        }">
              <td>
                <div class="status">
                  ${isNew ? '<span class="new-indicator">·</span>' : ''}
                  ${isIndexed ? KatanaIndexLogo : ''}
                </div>
              </td>
              <td class="buySide ${isMonitored ? 'monitored' : ''}">${name}</td>
              <td class="sellSide">${name}</td>
              <td class=>${getRandomZscore()}</td>
              <td class=>${getRandomReversion()}bp</td>
            </tr>
            ${
              index === seperatorIndex
                ? '</tbody><tbody class="notIndexed"><tr><th></th><th colspan="4">Alternative ideas</th></tr>'
                : ''
            }
          `
      })
      .join('')

    html += `</tbody>
        <tfoot class="secondary">
          <tr>
            <td colspan="5">Showing 1-20 of 37,486 ideas</td>
          </tr>
        </tfoot>
      </table>
    `
    table.innerHTML = html

    // document
    //   .querySelectorAll('.isIndexed:last-child')
    //   .classList.add('ideaSeperator')
  })
}
