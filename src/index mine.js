const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyUrl = 'http://localhost:3000/toys'
const toyCollection = document.getElementById('toy-collection')
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

// OR HERE!

function getToys(){
  fetch(toyUrl).then(res => res.json()).then(json => {
    json.forEach(toy => {
      makeToy(toy)
    })
  })
}

function makeToy(toy){
  toy.innerHTML += `
    <div class="card" >
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} </p>
      <button class='like-btn' data-id="${toy.id}">Like <3</button>
    </div>
    `
}

function createToy
