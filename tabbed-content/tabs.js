//grab all tab div and add click event listener
const tabDiv = document.querySelector("#tabs")
tabDiv.addEventListener('click', openTab)

function openTab(event) {
  //grab all content and hide
  const content = document.querySelectorAll(".content")
  Array.from(content).forEach(language => language.style.display = 'none')

  //grab all tabs and remove active from className
  const tabs = tabDiv.querySelectorAll('.tab')
  Array.from(tabs).forEach(tab => tab.className = tab.className.replace(' focus',''))

  //grab target lang, set target button to active and display block according to targetLang
  const targetLanguage = event.target.name
  event.target.className += " focus"
  document.querySelector(`#${targetLanguage}`).style.display = 'block'
}

//allows tab navigation by arrow keys
const tabs = tabDiv.querySelectorAll('.tab')
Array.from(tabs).forEach(tab => tab.addEventListener('keyup', function(event) {
    if(event.keyCode === 39 && this.nextElementSibling) this.nextElementSibling.focus()
    if(event.keyCode === 37 && this.previousElementSibling) this.previousElementSibling.focus()
  }))

