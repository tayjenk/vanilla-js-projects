/*
Movie Table:


Points to Note:
 - HTML base format:
  <!DOCTYPE html>
  <head>
    <title />
  </head>
 - DOCTYPE is an abreviation for DOCument TYPE.
*/

let movies = [
  {
    Name: "mad max: fury road",
    Genre: "action",
    "Release Date": 2015,
    Rating: "R"
  },
  {
    Name: "moonlight",
    Genre: "drama",
    "Release Date": 2016,
    Rating: "R"
  },
  {
    Name: "the social network",
    Genre: "biography",
    "Release Date": 2010,
    Rating: "PG-13"
  },
  {
    Name: "get out",
    Genre: "horror",
    "Release Date": 2017,
    Rating: "R"
  },
  {
    Name: "inception",
    Genre: "action",
    "Release Date": 2010,
    Rating: "PG-13"
  }
]

// ****dummy db create using https://my-json-server.typicode.com/***

//grab table html element
let movieTable = document.querySelector("#movie-table")

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
  return newRow
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
createTable()

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
addMovie(movie)

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
