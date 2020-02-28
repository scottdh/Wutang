import { isEqual } from 'lodash'
import { getLocal, setLocal, getCounts } from './utils'
import { createIdeasTables, createNav } from './generic'
import {
  toggleFilter,
  toggleFilters,
  selectOption,
  updateFilters,
  saveFilter,
  clearFocus,
  editName,
  getFilterById
} from './filters'

const currentFilterId = getLocal('VIEW')
const activeFilter = getFilterById(currentFilterId)

const deleteFilter = filterId => {
  const savedFilters = getLocal('SAVED')
  const withoutFilter = savedFilters.filter(({ id }) => id !== filterId)
  setLocal('SAVED', withoutFilter)
  setLocal('FILTERS', {})
  window.location.pathname = '/pages/trade-ideas/'
}
const toggleActions = (disabled = true) => {
  document.getElementById('updateFilter').disabled = disabled
}
const populatePage = () => {
  document.querySelector('.filterName').innerText = activeFilter.name
  document.getElementById('numIdeas').innerText = activeFilter.counts.numIdeas
  document.getElementById('numIndexed').innerText =
    activeFilter.counts.numIndexed
  document.getElementById('numNew').innerText = activeFilter.counts.numNew

  activeFilter.list.forEach(label => {
    document.getElementById(
      'metaData'
    ).innerHTML += `<div class="meta-tag">${label}</div>`
  })
}

// Init
createNav()
populatePage()
setLocal('FILTERS', activeFilter.filters)
updateFilters(activeFilter.filters)
toggleFilters(activeFilter.filters)
createIdeasTables(activeFilter.filters)

// Event handlers
document.addEventListener('click', clearFocus)
document.getElementById('mainLogo').addEventListener('click', () => {
  window.localStorage.clear()
  window.location.reload()
})
document.querySelectorAll('.Filter__label').forEach(filter => {
  filter.addEventListener('click', ({ target }) => toggleFilter(target))
})
document.querySelectorAll('.label').forEach(filter =>
  filter.addEventListener('click', ({ target }) => {
    selectOption(target)

    const filters = getLocal('FILTERS')
    const disableActions =
      !Object.entries(filters).length || isEqual(filters, activeFilter.filters)
    toggleActions(disableActions)
  })
)
document.getElementById('updateFilter').addEventListener('click', () => {
  saveFilter({
    ...activeFilter,
    filters: getLocal('FILTERS'),
    counts: getCounts()
  })
  window.location.reload()
})
document
  .getElementById('back')
  .addEventListener('click', () => setLocal('FILTERS', {}))
document
  .getElementById('deleteFilter')
  .addEventListener('click', () => deleteFilter(currentFilterId))
document
  .querySelector('.filterName')
  .addEventListener('click', ({ target }) => editName(target, currentFilterId))
