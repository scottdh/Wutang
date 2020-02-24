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
const saveFilter = () => {
  console.log('Save', getLocal('FILTERS'))
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
