document.addEventListener('DOMContentLoaded', () => {
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyURL = "http://localhost:3000/toys"
const toyNameId = document.getElementById("toyName")
const toyImageUrlId = document.getElementById("toyImageUrl")

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

function fetchToys() {
  fetch (toyURL)
    .then(res => res.json())
    .then(toys => {renderToyCards(toys)
    });
}

function renderToyCards(toys) {
  toys.forEach (renderSingleToyCard)
}
    
function renderSingleToyCard(toy) {
  const toyCollection = document.getElementById("toy-collection")
    toyCollection.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img class="toy-avatar" src="${toy.image}"/>
      <p id="${toy.id}-likes">${toy.likes} likes!</p>
      <button id="${toy.id}" class="like-btn">Like <3</button>
    </div>
    `
  };

 function addLikes(){
 const toyCollection = document.getElementById("toy-collection")
 toyCollection.addEventListener('click', (e) => {
     if (e.target.className === "like-btn"){
       let toyId = e.target.id
       let toyLikeCount = document.getElementById(`${toyId}-likes`)
       let currentLikes = parseInt(toyLikeCount.innerText, 10) + 1
       toyLikeCount.innerText = currentLikes
       fetch(toyURL + `/${toyId}`, {
         method: 'PATCH',
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
          "likes": currentLikes
         })
       }

       )}

    })
  }

// When a user clicks on the add new toy button - a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
// The toy should conditionally render to the page.
function addNewToy() {
  let newToyForm = document.querySelector(".add-toy-form")

  newToyForm.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log(e.target.name.value)
    fetch(toyURL, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       "name": e.target.name.value,  
       "image": e.target.image.value, 
       "likes": 0
      })
    })
    .then(res => res.json())
    .then(renderSingleToyCard)
  })
}

// Conditionally increase the toy's like count
// Send a patch request to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
function addLikesToToy() {
  const likeBtn = document.querySelector(".like-btn")
  likeBtn.addEventListener('click', function(e) {
    parseInt(document.getElementById("toy-total-likes-${toy.id}").innerText, 10) 
  })
}

fetchToys()
addNewToy()
addLikes()
})

// function (toy) {
//   let toyCard = document.createElement('div')
//   toyCard.className = "card"
//   toyCard.innerHTML += `
//     <h2>${toy.name}</h2>
//     <img class="toy-avatar" src="${toy.image}"/>
//     <p>${toy.likes} likes!</p>
//     <button id="${toy.id}" class="like-btn">Like <3</button>
//   `
//   toyCollection.append( toyCard )
//   let likeBtn = toyCard.querySelector('.like-btn')
//   likeBtn.addEventListener('click', () => {
//     console.log(toy)
//   })
// }