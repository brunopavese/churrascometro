import { guestsInputs } from './modules/guests.js'
import * as validate from './modules/validation.js'
import * as calc from './modules/calculator.js'

const accessInputs = {
  name: document.getElementById('name-input'),
  email: document.getElementById('email-input'),
  cep: document.getElementById('cep-input'),
  promotionalEmails: document.getElementById('promotional-emails'),
  button: document.getElementById('access-button'),
  reset: document.getElementById('reset-button')
}

fillAccessInputs()

async function createUuid() {
  const response = await fetch('https://www.uuidtools.com/api/generate/v4')
  const uuid = await response.json()
  return uuid[0]
}

function getInputValues(inputsObject) {
  const values = {}
  for (const key in inputsObject) {
    if (inputsObject.hasOwnProperty(key)) {
      if (inputsObject[key].type === 'checkbox') {
        values[key] = inputsObject[key].checked
      } else {
        values[key] = inputsObject[key].value
      }
    }
  }
  return values
}

function getAccessDataFromStorage() {
  const accessDataRecovered = localStorage.getItem('accessData')
  if (accessDataRecovered) {
    return JSON.parse(accessDataRecovered)
  }
  return null
}

function fillAccessInputs() {
  const accessDataRecovered = getAccessDataFromStorage()

  if (accessDataRecovered) {
    accessInputs.name.value = accessDataRecovered.name
    accessInputs.email.value = accessDataRecovered.email
    accessInputs.cep.value = accessDataRecovered.cep
    accessInputs.promotionalEmails.checked = accessDataRecovered.promotionalEmails
    unlockCalculator()
  }
}

function areLoggedIn() {
  const token = localStorage.getItem('token')
  return token ? true : false
}

function unlockCalculator() {
  if (areLoggedIn()) {
    const guestsForm = document.getElementById('guests-form')
    guestsForm.style.display = 'flex'
  }
}

accessInputs.button.addEventListener('click', async () => {
  const data = getInputValues(accessInputs)
  const inputsAreValid = await validate.access(data)

  if (inputsAreValid) {
    const accessDataStringified = JSON.stringify(data)
    localStorage.setItem('accessData', accessDataStringified)
    localStorage.setItem('token', await createUuid())
    unlockCalculator()
  }
})

accessInputs.reset.addEventListener('click', () => {
  localStorage.clear()
  location.reload()
})

guestsInputs.button.addEventListener('click', () => {
  const adults = Number(guestsInputs.adults.amount.value)
  const children = Number(guestsInputs.children.amount.value)
  const beer = Number(guestsInputs.beer.amount.value)
  const divWidth = document.getElementById('forms-section').offsetWidth
  const tableContainer = document.getElementById('shopping-list')
  tableContainer.style.width = divWidth + 'px'
  tableContainer.removeAttribute('hidden')

  const results = {
    meat: calc.meat(adults, children),
    garlicBread: calc.garlicBread(adults, children),
    charcoalBriquettes: calc.charcoalBriquettes(adults, children),
    salt: calc.salt(adults, children),
    ice: calc.ice(adults, children),
    softDrinks: calc.softDrinks(adults, children),
    water: calc.water(adults, children),
    beer: calc.beer(beer),
  }

  for (const item in results) {
    const element = document.getElementById(`${item}-field`)
    element.innerText = `${results[item].amount.toFixed(1)} ${results[item].unit}`
  }

})

accessInputs.cep.addEventListener('input', () => {
  const maxLength = 8
  if (accessInputs.cep.value.length > maxLength) {
    accessInputs.cep.value = accessInputs.cep.value.slice(0, maxLength)
  }
})