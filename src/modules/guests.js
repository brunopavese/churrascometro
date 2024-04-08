export const guestsInputs = {
  adults: createGuestInputs('adults'),
  children: createGuestInputs('children'),
  beer: createGuestInputs('beer'),
  button: document.getElementById('calculate-button')
}

addEventListeners(guestsInputs.adults)
addEventListeners(guestsInputs.children)
addEventListeners(guestsInputs.beer, guestsInputs.adults)

function createGuestInputs(name) {
  const amount = document.getElementById(`${name}-amount`)
  const increment = document.getElementById(`${name}-increment`)
  const decrement = document.getElementById(`${name}-decrement`)

  return { amount, increment, decrement }
}

function addEventListeners(element, limit = null) {
  element.increment.addEventListener('click', () => {
    if (!limit || element.amount.value < limit.amount.value) {
      element.amount.value++
    }
  })

  element.decrement.addEventListener('click', () => {
    if (element.amount.value > 0) element.amount.value--
  })

  limit?.decrement.addEventListener('click', () => {
    if (element.amount.value > limit.amount.value) element.amount.value--
  })
}