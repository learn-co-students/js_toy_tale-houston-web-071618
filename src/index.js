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

const parseJSON = resp => resp.json()

function putToysOnPage(toys) {
  const toyCollectionDiv = document.getElementById('toy-collection')

  toys.forEach(function (toy) {
    toyCollectionDiv.innerHTML += `
    <div class="card">
      <h2 data-toy-id="${toy.id}">${toy.name}</h2>
      <img class="toy-avatar" src="${toy.image}"/>
      <p data-likes="${toy.likes}">${toy.likes} Likes</p>
      <button class="like-btn">Like <3</button>
    </div>
    `
  })
}

fetch('http://localhost:3000/toys')
  .then(parseJSON)
  .then(putToysOnPage)

const addToyForm = document.querySelector('.add-toy-form')

addToyForm.addEventListener('submit', function(event) {

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      "name": `${event.target.name.value}`,
      "image": `${event.target.image.value}`,
      "likes": 0
    })
  })
  .then(parseJSON)
  .then(putToysOnPage)
})

const toyCollectionDiv = document.getElementById('toy-collection')

toyCollectionDiv.addEventListener('click', function(event) {
  let likeButtonIsPressed = event.target.className == 'like-btn'

  if (likeButtonIsPressed) {
    let eventParentEl = event.target.parentElement
    let likesCount = eventParentEl.querySelector('p')
    fetch(`http://localhost:3000/toys/${eventParentEl.querySelector('h2').dataset.toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "likes": `${parseInt(likesCount.dataset.likes) + 1}`
      })
    })

    likesCount.dataset.likes = parseInt(likesCount.dataset.likes) + 1
    let newLikeCount =
    likesCount.dataset.likes
    likesCount.innerText = `${newLikeCount} Likes`

  }
})
