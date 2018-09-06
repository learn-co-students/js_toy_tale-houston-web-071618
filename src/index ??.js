const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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

//add the toys to the page
function putToysOnPage(toys) {
	const toyCollectionDiv = document.getElementById('toy-collection')
	toys.forEach(function(toy) {
        toyCollectionDiv.innerHTML += `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar">
        <p>${toy.likes} Likes<p>
        <button class="like-btn">Like <3</button>
        </div>
        `
    })
}
fetch('http://localhost:3000/toys')
	.then(resp => resp.json())
	.then(putToysOnPage)


const addToyForm = document.querySelector('.add-toy-form')
addToyForm.addEventListener('submit', function(event) {
  event.preventDefault()

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(console.log)
})








//
