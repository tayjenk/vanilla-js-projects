
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
  const formData = [].reduce.call(elements, (parsedDataObj, element) => {
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

const handleSubmit = event => {
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

const form = document.getElementsByClassName("content-form")[0]
//console.log(form.elements)
form.addEventListener("submit", handleSubmit)
