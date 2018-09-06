const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const toyURL = 'http://localhost:3000/toys'
const realForm = document.querySelector('.add-toy-form')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE
function init(){
  getToys()
}

function getToys(){
  // fetch and render toys
  return fetch(toyUrl).then(res => res.json()).then(json => {
    json.forEach(toy => {
      makeToy(toy)
    })
  })
}

function makeToy(toy){
  let toyDiv = toyCollection.appendChild(element)
  toyDiv.classlist.add("card")
}
