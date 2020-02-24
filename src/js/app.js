import { getLocal, setLocal } from './utils'
import { createIdeasTables, createNav } from './generic'

createIdeasTables()
createNav()

const presetFilters = getLocal('FILTERS')
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
  const storedFilters = getLocal('FILTERS')

  Object.keys(storedFilters).forEach(key => {
    const action = storedFilters[key].length ? 'add' : 'remove'

    document
      .querySelector(`[for=${key}`)
      .classList[action](`Filter__label--is-selected`)
  })
}
const selectOption = label => {
  const { name, value } = label.previousElementSibling
  const storedFilters = getLocal('FILTERS') || {}
  const storedGroup = storedFilters[name] || []
  let group = storedGroup.includes(value)
    ? storedGroup.filter(item => item !== value)
    : [...storedGroup, value]
  const newFilters = { ...storedFilters, [name]: group }

  label.parentNode.classList.toggle('FilterGroup__label--is-selected')
  toggleFilters()
  setLocal('FILTERS', newFilters)
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
const addSavedFilter = filters => {
  const gridHolder = document.getElementById('SavedFilterList')
  const now = new Date()
  const formattedNow = now.toLocaleDateString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'long'
  })
  const name = `Untitled ${formattedNow}`
  const filterList = Object.values(filters).reduce((mem, filter) => [
    ...mem,
    ...filter
  ])
  const card = `
    <div class="filterCard">
      <h3>${name}</h3>
      <div class="meta-data">
        ${filterList
          .map(item => `<div class="meta-tag">${item}</div>`)
          .join('')}
      </div>
      <ol>
        <li><strong>43</strong> ideas</li>
        <li>
          <strong>8</strong> ideas in Katana Index
          <span class="highlight new-ideas">2 new</span>
        </li>
      </ol>
      <div class="table_footer">
        <a class="linkButton" href="#">View ideas &rarr;</a>
      </div>
    </div>
  `

  gridHolder.innerHTML = card + gridHolder.innerHTML
}
const saveFilter = () => {
  addSavedFilter(getLocal('FILTERS'))
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
