const movies = [
  {
    name: "mad max: fury road",
    genre: "action",
    releaseDate: 2015,
    rating: "R"
  },
  {
    name: "moonlight",
    genre: "drama",
    releaseDate: 2016,
    rating: "R"
  },
  {
    name: "the social network",
    genre: "biography",
    releaseDate: 2010,
    rating: "PG-13"
  },
  {
    name: "get out",
    genre: "horror",
    releaseDate: 2017,
    rating: "R"
  },
  {
    name: "inception",
    genre: "action",
    releaseDate: 2010,
    rating: "PG-13"
  }
]
//grab table html element
let movieTable = document.querySelector("#movie-table")

//take first movie and create table header row off of obj keys
//append first row to table
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

let tableBody = document.createElement("tbody")
tableBody.id = "table-body"
movies.forEach(movie => {
  tableBody.appendChild(insertRow(movie))
})
movieTable.appendChild(tableBody)
