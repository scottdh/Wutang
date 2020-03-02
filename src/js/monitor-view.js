import { createNav, createIdeasTables } from './generic'
import { getLocal } from './utils'
import { securities } from './json'

const bondId = getLocal('MONITOR_VIEW')
const storedBonds = getLocal('MONITOR')
const bond = storedBonds.find(bond => bond.id === bondId)
const otherBonds = securities.filter(b => b.name !== bond.name)

const generateData = () => {
  let data = []

  for (let i = 0; i < bond.numBuySide; i++) {
    data = [...data, { ...bond, sellName: otherBonds[i].name }]
  }

  for (let i = 0; i < bond.numSellSide; i++) {
    data = [...data, { ...bond, buyName: otherBonds[i].name }]
  }

  return data
}

// Init
createNav()
createIdeasTables({}, generateData())
document.getElementById('bondName').innerText = bond.name

// Event Listeners
