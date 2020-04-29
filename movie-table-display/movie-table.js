class CreateTable {
  constructor() {
    this.movies = this.getMovies()
    //grabs table html element
    this.table = document.querySelector("#movie-table")
  }

  initTable() {
    this.createHead()
    this.createBody()
  }

  async getMovies() {
    const response = await fetch("http://localhost:3000/movies")
    const data = await response.json()
    return data
  }

  async createHead() {
    //console.log(await this.movies)
    const tableHead = this.table.querySelector("#table-head")
    //clears out the current head elements if updating table
    if (tableHead.childNodes) tableHead.textContent = ""
    //grab movies and create array of headers from movies
    const movies = await this.movies,
      headers = Object.keys(movies[0])
    //create new row w/ className
    const headRow = document.createElement("tr")
    headRow.className = "table-head-row"
    //for each header create a table head cell, innerText and append to createdRow
    headers.forEach((header) => {
      const headerCell = document.createElement("th")
      headerCell.innerText = header
      headRow.appendChild(headerCell)
    })
    //append an empty head cell to make space for remove buttons
    headRow.appendChild(document.createElement("th"))
    //append headrow to the table
    tableHead.appendChild(headRow)
  }

  async createBody(movies, key = "Name") {
    const tableBody = this.table.querySelector("#table-body")
    if (tableBody.childNodes) tableBody.textContent = ""
    //default sort movies by title alphabetically
    //for each movie object create row of movie data and append to table body
    //function is used to create body during init and removeRow so must check if movies is passed in or not to function
    if (!movies) movies = await this.movies
    movies.sort(this.compareBy(key)).forEach((movie) => {
      tableBody.appendChild(this.insertRow(movie))
    })
  }

  compareBy(key) {
    //takes a key to sort by, default is by name, compares two objects by key
    return function (a, b) {
      const aValue = typeof a[key] === "string" ? a[key].toLowerCase() : a[key]
      const bValue = typeof b[key] === "string" ? b[key].toLowerCase() : b[key]
      if (typeof aValue === "number") return (aValue - bValue) * -1
      if (aValue > bValue) return 1
      if (aValue < bValue) return -1
      return 0
    }
  }

  insertRow(movie) {
    //takes movie obj and creates new row w/ className
    const newRow = document.createElement("tr")
    newRow.className = "table-row"
    //for each key in movie, create a new cell with movie info and append to row
    for (let key in movie) {
      const newCell = document.createElement("td")
      newCell.className = "table-cell"
      newCell.innerText = movie[key]
      newRow.appendChild(newCell)
    }
    //at the end of row create cell to hold remove button
    const buttonCell = document.createElement("td")
    //create button and add eventListener for click event and invoke removeRow
    const removeButton = document.createElement("button")
    removeButton.type = "button"
    removeButton.innerHTML = "x"
    removeButton.addEventListener("click", () =>
      this.removeRow(event.target.parentElement.parentElement)
    )
    //append remove button to button cell and append button cell to new row
    buttonCell.appendChild(removeButton)
    newRow.appendChild(buttonCell)
    return newRow
  }

  //delete all child elements by setting innerText to empty string
  //does not remove from
  async removeRow(rowElement) {
    const target = rowElement.firstElementChild.innerText
    const movies = await this.movies
    this.movies = movies.filter((movie) => movie.Name !== target)
    this.createBody(this.movies)
  }
}
const newTable = new CreateTable()
newTable.initTable()

//dropdown sort, recreates table view based on dropdown list value selected
const dropdown = document.querySelector("#sort")
dropdown.addEventListener("change", async() => {
  const movies = await this.movies
  return newTable.createBody(movies, dropdown.value)
})

//get movie data using XMLHttpRequest object
/*
const request = new XMLHttpRequest()

request.open(
  "GET",
  "http://localhost:3000/movies",
  true
)

request.onload = function() {
  const data = JSON.parse(this.response)
  ....create table head and body here
}

request.send()
*/

//POST API
//send POST request with new data obj
//use createTable func with response JSON obj
const movie = {
  "id" : 10,
	"Name": "hacksaw ridge",
	"Genre": "biography",
	"Release Date": 2016,
	"Rating": "R"
}
// {
//   Name: "space jam",
//   Genre: "kids",
//   "Release Date": 1995,
//   Rating: "PG",
// }

function addMovie(newMovie) {
  // try {
  //   const response = await fetch("http://localhost:3000/movies", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type":"application/json"
  //   },
  //   body: JSON.stringify(newMovie)
  // })
  // const data = await response.json()
  // console.log({data})
  // } catch (error) {
  //   console.log(error)
  // }
  fetch("http://localhost:3000/movies", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(newMovie)
  })
  .then(response => response.json())
  .then(data => console.log(data))

  //const movies = await this.movies
  //createTable(movies)
}
//addMovie(movie)

