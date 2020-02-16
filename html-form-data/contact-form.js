
const handleSubmit = event => {
  //prevent the default submit button, stops quick flash of the page event
  event.preventDefault()
  //creates empty data object, not JSON
  const data = {}
  //retrevies html element by classname and assigns to variable
  //.getElementsByClassName returns a HTMLCollection obj of nodes. Use indx to access specific node
  const dataContainer = document.getElementsByClassName("results-display")[0]
  //.textContent DOM property returns text from all elements, incl spacing, but w/o inner element tags
  // vs. .innerText returns just text, no extra spacing, text from all inner tags except <script> & <style>
  // vs. .innerHTML returns all text, extra spacing, and inner tags

  //setting the text content removes all child elements and replaces with new assignment
  //JSON.stringify converts JS object to a string which is used to set the text content
  dataContainer.textContent = JSON.stringify(data)
}

const form = document.getElementsByClassName("content-form")[0]
form.addEventListener("submit", handleSubmit)
