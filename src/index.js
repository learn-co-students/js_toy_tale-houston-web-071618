const addBtn = document.querySelector('#new-toy-btn')
const newToyForm = document.querySelector('.add-toy-form')
const toyForm = document.querySelector('.container')
const toy_collection = document.querySelector('#toy-collection')
let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  fetchToys()

  newToyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (event.target.name.value && event.target.image.value) {
      handleNewToy(event)

    }

  })

  toy_collection.addEventListener('click', (event) => {
    if (event.target.className === "like-btn") {
      handleLike(event)
    }
  })


})

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  handleAddToybutton()
})

function handleAddToybutton() {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
}


// OR HERE!
//add the toys to the page

