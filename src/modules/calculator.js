export function meat(adults, children) {
  const amount = adults * 0.36 + children * 0.2
  return { amount, unit: 'Kg' }
}

export function garlicBread(adults, children) {
  const amount = adults * 2 + children
  return { amount, unit: 'Uni' }
}

export function charcoalBriquettes(adults, children) {
  const amount = adults + children
  return { amount, unit: 'Kg' }
}

export function salt(adults, children) {
  const amount = (adults + children) * 0.04
  return { amount, unit: 'Kg' }
}

export function ice(adults, children) {
  const amount = (adults + children) * 0.5
  return { amount, unit: 'Kg' }
}

export function softDrinks(adults, children) {
  const amount = (adults + children) * 0.4
  return { amount, unit: 'L' }
}

export function water(adults, children) {
  const amount = (adults + children) * 0.2
  return { amount, unit: 'L' }
}

export function beer(adults) {
  const amount = adults * 1.8
  return { amount, unit: 'L' }
}
