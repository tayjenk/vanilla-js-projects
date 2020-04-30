//grab all tab div and add click event listener
const tabDiv = document.querySelector("#tabs")
tabDiv.addEventListener('click', openTab)

function openTab(event) {
  //grab all content and hide
  const content = document.querySelectorAll(".content")
  Array.from(content).forEach(language => language.style.display = 'none')

  //grab all tabs and remove active from className
  const tabs = tabDiv.querySelectorAll('.tab')
  Array.from(tabs).forEach(tab => tab.className = tab.className.replace(' active',''))

  //grab target lang, set target button to active and display block according to targetLang
  const targetLanguage = event.target.name
  event.target.className += " active"
  document.querySelector(`#${targetLanguage}`).style.display = 'block'
}
