// const movies = [
//   {
//     Name: "mad max: fury road",
//     Genre: "action",
//     "Release Date": 2015,
//     Rating: "R"
//   },
//   {
//     Name: "moonlight",
//     Genre: "drama",
//     "Release Date": 2016,
//     Rating: "R"
//   },
//   {
//     Name: "the social network",
//     Genre: "biography",
//     "Release Date": 2010,
//     Rating: "PG-13"
//   },
//   {
//     Name: "get out",
//     Genre: "horror",
//     "Release Date": 2017,
//     Rating: "R"
//   },
//   {
//     Name: "inception",
//     Genre: "action",
//     "Release Date": 2010,
//     Rating: "PG-13"
//   }
// ]

// ****dummy db create using https://my-json-server.typicode.com/***


//grab table html element
let movieTable = document.querySelector("#movie-table")

function createTableHeader(dataArray) {
  let movieHeaders = Object.keys(dataArray[0])
  let tableHead = document.createElement("thead")
  tableHead.id = "table-head"
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

//take first movie and create table header row off of obj keys
//append first row to table
/*
let movieHeaders = Object.keys(movies[0])
let tableHead = document.createElement("thead")
tableHead.id = "table-head"
let headRow = document.createElement("tr")
headRow.className = "table-head-row"
movieHeaders.forEach(header => {
  let colTitle = document.createElement("th")
  colTitle.innerText = header
  headRow.appendChild(colTitle)
})
tableHead.appendChild(headRow)
movieTable.appendChild(tableHead)
*/

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

/*
let tableBody = document.createElement("tbody")
tableBody.id = "table-body"
movies.forEach(movie => {
  tableBody.appendChild(insertRow(movie))
})
movieTable.appendChild(tableBody)
*/

//using XMLHttpRequest object
/*
const request = new XMLHttpRequest()

request.open(
  "GET",
  "https://my-json-server.typicode.com/tayjenk/vanilla-js-projects/movies",
  true
)

request.onload = function() {
  const data = JSON.parse(this.response)

  let movieHeaders = Object.keys(data[0])
  let tableHead = document.createElement("thead")
  tableHead.id = "table-head"
  let headRow = document.createElement("tr")
  headRow.className = "table-head-row"
  movieHeaders.forEach(header => {
    let colTitle = document.createElement("th")
    colTitle.innerText = header
    headRow.appendChild(colTitle)
  })
  tableHead.appendChild(headRow)
  movieTable.appendChild(tableHead)

  let tableBody = document.createElement("tbody")
  tableBody.id = "table-body"
  data.forEach(movie => {
    tableBody.appendChild(insertRow(movie))
  })
  movieTable.appendChild(tableBody)
}

request.send()
*/

//using JS Fetch API
fetch("https://my-json-server.typicode.com/tayjenk/vanilla-js-projects/movies")
.then(response => {
  return response.json()
})
.then(data => {
  movieTable.appendChild(createTableHeader(data))

  let tableBody = document.createElement("tbody")
  tableBody.id = "table-body"
  data.forEach(movie => {
    tableBody.appendChild(insertRow(movie))
  })
  movieTable.appendChild(tableBody)
})
.catch(err => {
  console.log(err)
})

//POST API
//add new movie
const newMovie = {
  Name: "hacksaw ridge",
  Genre: "biography",
  "Release Date": 2016,
  Rating: "R"
}
/*
fetch("https://my-json-server.typicode.com/tayjenk/vanilla-js-projects/movies", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newMovie)
})
.then(response => {
  console.log(response)
  response.JSON()
})
.then(data => {
  let tableBody = document.querySelector('#table-body')
  data.forEach(movie => {
    tableBody.appendChild(insertRow(movie))
  })
})
*/
