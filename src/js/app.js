import { v4 as uuidv4 } from 'uuid'
import { getLocal, setLocal } from './utils'
import { createIdeasTables, createNav } from './generic'

createIdeasTables()
createNav()

const presetFilters = getLocal('FILTERS')
const savedFilters = getLocal('SAVED')

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
  const storedFilters = getLocal('FILTERS') || {}

  Object.keys(storedFilters).forEach(key => {
    const action = storedFilters[key].length ? 'add' : 'remove'

    document
      .querySelector(`[for=${key}`)
      .classList[action](`Filter__label--is-selected`)
  })
}
const toggleActions = (disabled = true) => {
  document.getElementById('saveFilter').disabled = disabled
  document.getElementById('clearFilter').disabled = disabled
}
const selectOption = label => {
  const { name, value } = label.previousElementSibling
  const storedFilters = getLocal('FILTERS') || {}
  const storedList = storedFilters[name] || []
  let list = storedList.includes(value)
    ? storedList.filter(item => item !== value)
    : [...storedList, value]
  const newFilters = { ...storedFilters, [name]: list }

  label.parentNode.classList.toggle('FilterGroup__label--is-selected')
  setLocal('FILTERS', newFilters)
  toggleFilters()
  toggleActions(false)
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
const addSavedFilter = ({
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
        <a class="linkButton" href="#">View ideas &rarr;</a>
      </div>
      <a class="linkButton deleteFilter" href="#"><i class="fas fa-trash"></i></a>
    </div>
  `

  document.getElementById('noSavedFilters').style.display = 'none'
  gridHolder.innerHTML = card + gridHolder.innerHTML
  document
    .querySelectorAll('.deleteFilter')
    .forEach(filter =>
      filter.addEventListener('click', ({ target }) => deleteFilter(target))
    )
}

if (presetFilters) {
  updateFilters(presetFilters)
  toggleFilters()
  toggleActions(false)
}

if (savedFilters) {
  savedFilters.forEach(filter => addSavedFilter(filter))
}

// Event handlers
document.addEventListener('click', ({ target }) => {
  const openClass = '--is-open'
  const openFilterLabel = document.querySelector(`.Filter__label${openClass}`)
  const openFilterGroup = document.querySelector(`.FilterGroup${openClass}`)

  if (!target.closest('.Filter') && openFilterLabel && openFilterGroup) {
    openFilterLabel.classList.remove(`Filter__label${openClass}`)
    openFilterGroup.classList.remove(`FilterGroup${openClass}`)
  }
})
document.querySelectorAll('.Filter__label').forEach(filter => {
  filter.addEventListener('click', ({ target }) => toggleFilter(target))
})
document
  .querySelectorAll('.label')
  .forEach(filter =>
    filter.addEventListener('click', ({ target }) => selectOption(target))
  )
document.getElementById('saveFilter').addEventListener('click', () => {
  const now = new Date()
  const formattedNow = now.toLocaleDateString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'long'
  })
  const name = `Untitled ${formattedNow}`
  const list = Object.values(getLocal('FILTERS')).reduce((mem, filter) => [
    ...mem,
    ...filter
  ])
  const storedSaved = getLocal('SAVED') || []
  const newSaved = {
    id: uuidv4(),
    name,
    list
  }

  setLocal('SAVED', [...storedSaved, newSaved])
  addSavedFilter(newSaved)
})
document.getElementById('clearFilter').addEventListener('click', () => {
  setLocal('FILTERS', null)
  toggleActions(true)
  window.location.reload()
})
