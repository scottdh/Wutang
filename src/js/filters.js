import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { getLocal, setLocal, getCounts } from './utils'
import { createIdeasTables } from './generic'

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
const toggleFilters = filters => {
  const selectedClass = 'Filter__label--is-selected'

  document
    .querySelectorAll('.Filter__label')
    .forEach(label => label.classList.remove(selectedClass))
  Object.keys(filters).forEach(key => {
    document.querySelector(`[for=${key}`).classList.add(selectedClass)
  })
}
const selectOption = label => {
  const { name, value } = label.previousElementSibling
  const storedFilters = getLocal('FILTERS') || {}
  const storedList = storedFilters[name] || []
  const list = storedList.includes(value)
    ? storedList.filter(item => item !== value)
    : [...storedList, value]
  const { [name]: omit, ...withoutProperty } = storedFilters
  const newFilters = list.length
    ? { ...storedFilters, [name]: list }
    : withoutProperty

  label.parentNode.classList.toggle('FilterGroup__label--is-selected')
  setLocal('FILTERS', newFilters)
  createIdeasTables(newFilters)
  toggleFilters(newFilters)
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

const saveFilter = (filter = {}) => {
  const filters = filter.filters || getLocal('FILTERS')
  const list = Object.values(filters).reduce((mem, value) => [...mem, ...value])
  const savedFilters = getLocal('SAVED') || []
  const newSaved = {
    id: filter.id || uuidv4(),
    name:
      filter.name || moment().format('[Untitled Filter] DD/MM/YYYY HH:mm:ss'),
    list,
    filters,
    ...getCounts()
  }

  if (filter.id) {
    const updatedStored = savedFilters.map(saved =>
      saved.id === filter.id ? newSaved : saved
    )
    setLocal('SAVED', updatedStored)
  } else {
    setLocal('SAVED', [...savedFilters, newSaved])
  }

  return newSaved
}

const clearFilter = () => {
  setLocal('FILTERS', {})
  window.location.reload()
}

const clearFocus = ({ target }) => {
  const openClass = '--is-open'
  const openFilterLabel = document.querySelector(`.Filter__label${openClass}`)
  const openFilterGroup = document.querySelector(`.FilterGroup${openClass}`)

  if (!target.closest('.Filter') && openFilterLabel && openFilterGroup) {
    openFilterLabel.classList.remove(`Filter__label${openClass}`)
    openFilterGroup.classList.remove(`FilterGroup${openClass}`)
  }
}

export {
  toggleFilter,
  toggleFilters,
  selectOption,
  updateFilters,
  saveFilter,
  clearFilter,
  clearFocus
}
