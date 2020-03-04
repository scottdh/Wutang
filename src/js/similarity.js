import qs from 'qs'
import { createNav, createIdeasTables, createFilters } from './generic'
import { securities } from './json'
import { getRandomComparison } from './utils'

const v = qs.parse(window.location.search.replace('?', '')).v || '1'
const VERSION = parseInt(v)

const generateData = () =>
  securities.map(row => ({
    ...row,
    similarity: getRandomComparison(VERSION)
  }))

// Init
createNav()
createIdeasTables({}, generateData())
createFilters()
