function validateName(name) {
  return name.length >= 3 && /^[a-zA-ZÀ-ú]+(?: [a-zA-ZÀ-ú]+)*$/.test(name)
}

function validateEmail(email) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}

async function validateCep(cep) {
  const formatCep = cep.replace(/\D/g, '')
  try {
    const response = await fetch(`https://viacep.com.br/ws/${formatCep}/json/`)
    const data = await response.json()
    return !data.erro
  } catch (error) {
    return false
  }
}

export async function access({ name, email, cep }) {
  const nameIsValid = validateName(name)
  const emailIsValid = validateEmail(email)
  const cepIsValid = await validateCep(cep)

  return nameIsValid && emailIsValid && cepIsValid
}
