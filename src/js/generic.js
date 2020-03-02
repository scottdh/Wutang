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
            item => `<li id="mainNav-${item.id}" class="navItem ${
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

export const createIdeasTables = (filters = {}, data = securities) => {
  const appliedFilters = Object.values(filters).length
    ? Object.values(filters).reduce((mem, filter) => [...mem, ...filter])
    : []
  const rows = !!appliedFilters.length
    ? data.filter(row => {
        let shouldDisplay = {}

        Object.keys(filters).filter(key => {
          if (filters[key].length) {
            shouldDisplay[key] = filters[key].includes(row[key])
          }
        })

        return !Object.values(shouldDisplay).includes(false)
      })
    : data

  document.querySelectorAll('.tradeIdeas_table').forEach(table => {
    const lastIndexedRow = rows.find(row => !row.isIndexed)
    const seperatorIndex = rows.indexOf(lastIndexedRow) - 1
    let html = `
      <table class="tradeIdeas">
        <thead>
          <th></th>
          <th>Buy</th>
          <th>Sell</th>
          <th>Z-score</th>
          <th>Reversion</th>
          <th class="similarity hide">${rows[0].similarityColLabel || ''}</th>
        </thead>
        <tbody class="indexed">
      `

    html += rows
      .map((row, index) => {
        const { isIndexed, isNew, name, buyName, sellName, similarity } = row

        return `
            <tr class="ideaRow 
              ${isIndexed ? 'isIndexed' : ''} 
              ${isNew ? 'isNew' : ''}
            ">
              <td>
                <div class="status">
                  ${isNew ? '<span class="new-indicator">·</span>' : ''}
                  ${isIndexed ? KatanaIndexLogo : ''}
                </div>
              </td>
              <td class="buySide ${sellName ? 'monitored' : ''}">
                ${buyName || name}
              </td>
              <td class="sellSide ${buyName ? 'monitored' : ''}">
                ${sellName || name}
              </td>
              <td class=>${getRandomZscore()}</td>
              <td class=>${getRandomReversion()}bp</td>
              ${similarity ? `<td class="similarity">${similarity}</td>` : ``}
            </tr>
            ${
              index === seperatorIndex
                ? `</tbody><tbody class="notIndexed">
                  <tr>
                    <th></th>
                    <th colspan="${similarity ? '5' : '4'}">Alternatives</th>
                  </tr>
                `
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
  })
}

export const createFilters = () => {
  const form = document.getElementById('filterForm')
  const filterOptions = [
    {
      id: 'type',
      label: 'Type',
      options: ['Senior', 'Subordinated']
    },
    {
      id: 'country_of_risk',
      label: 'Country',
      options: ['China', 'USA', 'Germany']
    },
    {
      id: 'industry_group',
      label: 'Industry',
      options: ['Consumer Goods', 'Financials', 'Healthcare']
    },
    {
      id: 'bb_composite',
      label: 'Rating',
      options: ['A', 'BBB', 'BB', 'B']
    },
    {
      id: 'maturity',
      label: 'Maturity',
      options: ['1 - 2 years', '3 - 5 years', '6 - 10 years']
    }
  ]
  let html = ''

  if (form) {
    html = `<div class="FilterRow">     
        <div class="Filters">`

    filterOptions.forEach(({ id, label, options }) => {
      html += `<div class="Filter">
          <input hidden type="checkbox" class="Filter__checkbox" />
          <label for="${id}" class="Filter__label">${label}</label>
          <div class="dropdown-content FilterGroup">
            ${options
              .map(
                option => `
                <label class="group-label FilterGroup__label">
                  <input hidden type="checkbox" name="${id}" value="${option}" />
                  <span class="label">${option}</span>
                  <span class="FilterGroup__count">(0)</span>
                </label>`
              )
              .join('')}
          </div>
        </div>`
    })

    html += `</div>
    </div>`
  }

  form.innerHTML = html
}
