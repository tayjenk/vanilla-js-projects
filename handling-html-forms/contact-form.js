//handling html forms:

// grab form element by document.forms with id or array idx and add event listner for a submit event, firing a handleSubmit func when event occurs

//handle submit func:
// prevents default flashing of page
// converts form data to a JSON object --> passes array-like form.elements to formToJSON func
// grabs the html element to display form results
// sets text content of html display element to the stringified JSON data object

//formToJSON func:
// takes all elements within the form
// creates array from all form elements loops over each element and performs two checks:
// 1. is element a valid element? does it have an element.name and element.value? (ex: submit button element)
// 2. if element is valid, is it a checkbox? (checkbox data will grab an element even if not selected). If element is valid and is a checkbox, it has a checked attribute
// if multiple options are selected in checkbox, it will add options into an array
//reduces valid elements/radios/checkboxes to empty object
//returns object


const isCheckbox = element => element.type === "checkbox"

const isValidValue = element => {
  //checks if element type is not checkbox or radio
  //if it is, element has checked attribute
  return (!['checkbox', 'radio'].includes(element.type) || element.checked)
}

const isValidElement = element => {
  //checks if element has name and value before adding to obj
  //no empty fields added into obj
  return element.name && element.value
}

const formToJSON = elements => {
  //elements is an array-like HTMLFormCollection of the form.elements
  //binds [] to form.elements, forcing reduce to work with elements
  //inital value = empty obj
  //reduces each elements name and value into new obj
  console.log(elements)
  const formData = Array.from(elements).reduce((parsedDataObj, element) => {
    if(isValidElement(element) && isValidValue(element)) {
      //checks if element is a checkbox
      //if so, adds element.name as new key in parsedDataObj
      //adds element.value to array of selected elements or creates a new array if none is already present
      if(isCheckbox(element)) {
        //console.log('selected element', element)
        parsedDataObj[element.name] = (parsedDataObj[element.name] || []).concat(element.value)
        return parsedDataObj
      }
      parsedDataObj[element.name] = element.value
    }
    return parsedDataObj
  }, {})
  return formData
}

function handleSubmit(event) {
  //prevent the default submit button, stops quick flash of the page event
  event.preventDefault()
  //creates empty data object, not JSON
  //const data = formToJSON(form.elements)
  //retrevies html element by classname and assigns to variable
  //.getElementsByClassName returns a HTMLCollection obj of nodes. Use indx to access specific node
  const data = formToJSON(form.elements)
  const dataContainer = document.getElementsByClassName("results-display")[0]
  //.textContent DOM property returns text from all elements, incl spacing, but w/o inner element tags
  // vs. .innerText returns just text, no extra spacing, text from all inner tags except <script> & <style>
  // vs. .innerHTML returns all text, extra spacing, and inner tags

  //setting the text content removes all child elements and replaces with new assignment
  //JSON.stringify converts JS object to a string which is used to set the text content
  dataContainer.textContent = JSON.stringify(data, null, " ")
}

const form = document.forms[0]
form.addEventListener("submit", handleSubmit)

module.exports = {
  isCheckbox,
  isValidValue,
  isValidElement,
  formToJSON,
  handleSubmit
}
