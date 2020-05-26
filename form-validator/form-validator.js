const form = document.forms["register-form"]

const checkPasswordMatch = (password, passwordReEnter) => {
  console.log({password, passwordReEnter})
  if(password.value !== passwordReEnter.value) showError(passwordReEnter, "Passwords do not match")
}

const isValidEmail = (input) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   if (!emailRegex.test(input.value.toLowerCase())) showError(input, "Please enter valid email")
}

const showError = (input, message) => {
  console.log({message})
  const formControl = input.parentElement
  formControl.className += " error"
  const smallErrorText = formControl.querySelector("small")
  if(input.id === "passwordConfrim") message = "Re-enter password required"
  smallErrorText.textContent = message
}

const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const checkRequired = inputArr => {
  inputArr.forEach(input => {
      if(!input.value) showError(input, `${getFieldName(input)} is required`)
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  let email, password, passwordConfirm
  const formInputs = Array.from(form.elements).filter(element => {
    (element.id === "email") && (email = element);
    (element.id === "password") && (password = element);
    (element.id === "passwordConfirm") && (passwordConfirm = element);
    return element.tagName === "INPUT"
  })
  checkRequired(formInputs)
  isValidEmail(email)
  checkPasswordMatch(password, passwordConfirm)
})
