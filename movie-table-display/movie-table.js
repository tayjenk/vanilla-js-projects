
//grab table html element
let movieTable = document.querySelector("#movie-table")

class CreateMovieTable {
  constructor() {
    this.movies = this.getMovies()
  }

  async getMovies() {
    const response = await fetch('http://localhost:3000/movies')
    const data = await response.json()
    console.log(data)
  }
}

const newTable = new CreateMovieTable()
newTable.getMovies()


  // _createTableHeader(firstMovie) {
  //   const tableHead = document.querySelector('#table-head')
  //   if(tableHead.childNodes) tableHead.textContent = ''
  //   const columnNames = Object.keys(firstMovie)
  //   const headRow = document.createElement('tr')
  //   headRow.className = 'table-head-row'
  //   columnNames.forEach(name => {
  //     const headerCell = document.createElement('th')
  //     headerCell.innerText = name
  //     headRow.appendChild(headerCell)
  //   })
  //   headRow.appendChild(document.createElement('th'))
  //   tableHead.appendChild(headRow)
  //   return tableHead
  // }

  // _createTableBody(movieData, key='Name') {
  //   const tableBody = document.querySelector('#table-body')
  //   if (tableBody.childNodes) tableBody.textContent = ""
  //   //default alphabetically sort movie by title
  //   movieData.sort(this._compareElements(key)).forEach(movie => {
  //   tableBody.appendChild(this._insertRow(movie))
  // })
  //   return tableBody
  // }

  // async _createTable(allMovies) {
  //   const response = await fetch("https://my-json-server.typicode.com/tayjenk/vanilla-js-projects/movies")
  //   const data = allMovies ? allMovies : await response.json()
  //   const table = document.querySelector('#movie-table')
  //   table.appendChild(this._createTableBody(allMovies[0]))
  //   table.appendChild(this._createTableBody(data))
  // }

  // _insertRow(newMovieObj) {
  //   const newRow = document.createElement('tr')
  //   newRow.className = 'table-row'
  //   for(let key in newMovieObj) {
  //     const rowCell = document.createElement('td')
  //     newCell.className = 'table-cell'
  //     newCell.innerText = newMovieObj[key]
  //     newRow.appendChild(rowCell)
  //   }
  //   const buttonWrapper = document.createElement('td')
  //   const removeButton = document.createElement('button')
  //   removeButton.type = 'button'
  //   removeButton.addEventListener('click', () => this._removeRow(event.target.parentElement.parentElement))
  //   buttonWrapper.appendChild(removeButton)
  //   newRow.appendChild(buttonWrapper)
  //   return newRow
  // }

  // _removeRow(rowElement){
  //   const row = rowElement.firstElementChild.innerText
  //   const filteredMovies = movies.filter(movie => movie.Name !== row)
  //   return this._createTableHeader(filteredMovies)
  // }

  // _compareElements(key) {
  //   return function (a, b) {
  //     const aValue = (typeof a[key] === 'string') ? a[key].toLowerCase() : a[key]
  //     const bValue = (typeof b[key] === 'string') ? a[key].toLowerCase() : a[key]
  //     if(typeof aValue === 'number') return (aValue - bValue) * -1
  //     if(aValue > bValue) return 1
  //     if(aValue < bValue) return -1
  //     return 0
  //   }
  // }



//take first movieObj from moviesArray and create table header row off of obj keys
//append first row to table head
function createTableHeader(moviesArray) {
  let tableHead = document.querySelector("#table-head")
  if (tableHead.childNodes) tableHead.textContent = ""
  let movieHeaders = Object.keys(moviesArray[0])
  let headRow = document.createElement("tr")
  headRow.className = "table-head-row"
  movieHeaders.forEach(header => {
    let colTitle = document.createElement("th")
    colTitle.innerText = header
    headRow.appendChild(colTitle)
  })
  headRow.appendChild(document.createElement("th"))
  tableHead.appendChild(headRow)
  return tableHead
}

//for each movie in movies array, create a new table row and table cells for each movie info
//append to row, append row to table
function insertRow(newObj) {
  const newRow = document.createElement("tr")
  newRow.className = "table-row"
  for (let key in newObj) {
    let newCell = document.createElement("td")
    newCell.className = "table-cell"
    newCell.innerText = newObj[key]
    newRow.appendChild(newCell)
  }
  const removeWrapper = document.createElement("td")
  const removeButton = document.createElement('button')
  removeButton.type = 'button'
  removeButton.innerText = 'x'
  removeButton.addEventListener('click', () => removeRow(event.target.parentElement.parentElement))
  removeWrapper.appendChild(removeButton)
  newRow.appendChild(removeWrapper)
  return newRow
}

function removeRow(rowElement) {
  const row = rowElement.firstElementChild.textContent
  const filteredMovies = movies.filter(movie => movie.Name != row)
  return createTable(filteredMovies)
}

//create table with data using XMLHttpRequest object
/*
const request = new XMLHttpRequest()

request.open(
  "GET",
  "https://my-json-server.typicode.com/tayjenk/vanilla-js-projects/movies",
  true
)

request.onload = function() {
  const data = JSON.parse(this.response)
  ....create table head and body here
}

request.send()
*/

//create table using data through JS Fetch API
async function createTable(movieList, key = 'Name') {
  let response = await fetch(
    "https://my-json-server.typicode.com/tayjenk/vanilla-js-projects/movies"
  )
  let data = movieList ? movieList : await response.json()
  movieTable.appendChild(createTableHeader(data))
  let tableBody = document.querySelector("#table-body")
  if (tableBody.childNodes) tableBody.textContent = ""
  //default alphabetically sort movie by title
  data.sort(compareElements(key)).forEach(movie => {
    tableBody.appendChild(insertRow(movie))
  })
  movieTable.appendChild(tableBody)
}
//createTable()

//POST API
//send POST request with new data obj
//use createTable func with response JSON obj
const movie = [
  {
    Name: "hacksaw ridge",
    Genre: "biography",
    "Release Date": 2016,
    Rating: "R"
  },
  {
    Name: "space jam",
    Genre: "kids",
    "Release Date": 1995,
    Rating: "PG"
  }
]
async function addMovie(newMovie) {
  //   let response = await fetch("https://my-json-server.typicode.com/tayjenk/vanilla-js-projects/movies", {
  //   method: 'POST',
  //   body: JSON.stringify(newMovie)
  // })
  //   let data = await response.json()
  //   console.log(data)
  movies = [...movies, ...newMovie]
  createTable(movies)
}
//addMovie(movie)

//sorting function
//takes key/object key for movie to sort
// btw two movies compare by key
function compareElements(key) {
  return function compare(a, b) {
    const aValue = typeof a[key] === "string" ? a[key].toLowerCase() : a[key]
    const bValue = typeof b[key] === "string" ? b[key].toLowerCase() : b[key]
    if(typeof aValue === 'number') return (aValue - bValue) * -1
    if (aValue > bValue) return 1
    if (aValue < bValue) return -1
    return 0
  }
}

//dropdown sort, recreates table view based on dropdown list value selected
const dropdown = document.querySelector("#sort")
dropdown.addEventListener('change', () => {
  return createTable(movies, dropdown.value)
})
