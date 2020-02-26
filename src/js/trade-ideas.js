import { getLocal, setLocal } from './utils'
import { createIdeasTables, createNav } from './generic'
import {
  toggleFilter,
  toggleFilters,
  selectOption,
  updateFilters,
  saveFilter,
  clearFilter,
  clearFocus
} from './filters'

const deleteFilter = button => {
  const filter = button.closest('.filterCard')
  const filterId = filter.id
  const savedFilters = getLocal('SAVED') || []
  const updated = savedFilters.filter(({ id }) => id !== filterId)

  setLocal('SAVED', updated)
  filter.remove()

  if (!updated.length) {
    document.getElementById('noSavedFilters').style.display = 'block'
  }
}

const addFilterCard = ({
  id,
  name,
  list,
  numIdeas = 0,
  numIndexed = 0,
  numNew = 0
}) => {
  const gridHolder = document.getElementById('SavedFilterList')
  const card = `
    <div id="${id}" class="filterCard">
      <h3>${name}</h3>
      <div class="meta-data">
        ${
          list
            ? list.map(item => `<div class="meta-tag">${item}</div>`).join('')
            : ''
        }
      </div>
      <ol>
        <li><strong>${numIdeas}</strong> ideas</li>
        <li>
          <strong>${numIndexed}</strong> ideas in Katana Index
          ${
            numNew
              ? `<span class="highlight new-ideas">${numNew} new</span>`
              : ''
          }
        </li>
      </ol>
      <div class="table_footer">
        <a class="Button Button--secondary Button--link viewIdeas" href="#">View ideas &rarr;</a>
      </div>
      <a class="Button Button--secondary Button--link deleteFilter" href="#"><i class="fas fa-trash-alt"></i></a>
    </div>
  `

  const noSavedMessage = document.getElementById('noSavedFilters')
  if (noSavedMessage) noSavedMessage.style.display = 'none'

  if (gridHolder) gridHolder.innerHTML = card + gridHolder.innerHTML

  document
    .querySelectorAll('.deleteFilter')
    .forEach(filter =>
      filter.addEventListener('click', ({ target }) => deleteFilter(target))
    )

  document.querySelectorAll('.viewIdeas').forEach(filter =>
    filter.addEventListener('click', ({ target }) => {
      const { id } = target.closest('.filterCard')
      setLocal('VIEW', id)
      window.location.pathname = './filter-view.html'
    })
  )
}
const toggleActions = (disabled = true) => {
  document.getElementById('saveFilter').disabled = disabled
  document.getElementById('clearFilter').disabled = disabled
}

// Init
createNav()

const presetFilters = getLocal('FILTERS') || {}
if (Object.entries(presetFilters).length !== 0) {
  updateFilters(presetFilters)
  toggleFilters(presetFilters)
  toggleActions(false)
}
createIdeasTables(presetFilters)

const savedFilters = getLocal('SAVED')
if (savedFilters) {
  savedFilters.forEach(filter => addFilterCard(filter))
}

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
    toggleActions(false)
  })
)

document.getElementById('saveFilter').addEventListener('click', () => {
  addFilterCard(saveFilter())
  clearFilter()
})
document.getElementById('clearFilter').addEventListener('click', () => {
  toggleActions(true)
  clearFilter()
})
document
  .getElementById('toggleSaved')
  .addEventListener('click', ({ target }) => {
    target.innerText = target.innerText === 'HIDE' ? 'SHOW' : 'HIDE'
    target.parentNode.nextElementSibling.classList.toggle(
      'savedFilters__body--is-closed'
    )
  })
