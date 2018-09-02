const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyDiv = document.querySelector('#toy-collection')
let likeButtons
let addToy = false;

// YOUR CODE HERE
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => createAllDivs(json))

function createAllDivs(json) {
  for (let oneToy of json) {
    createDiv(oneToy);
  }

  likeButtons = Array.from(document.querySelectorAll('.like-btn'))
  likeButtons.forEach(button => button.addEventListener('click', (e) => addLike(e)))
}

function createDiv(oneToy) {
  let newToy = document.createElement('div')
  newToy.innerHTML =
    `<div class='card'><h2>${oneToy.name}</h2><img src=${oneToy.image} class='toy-avatar'><p>${oneToy.likes} Likes<p><button class='like-btn'id=${oneToy.id}>Like <3</button></div>`

  toyDiv.appendChild(newToy)
}

function postData(data={}, url='http://localhost:3000/toys') {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: data.name,
      image: data.image,
      likes: 0
    })
  })
}

function submitToy() {
  let newSubmission = {
    name: document.getElementsByName("name")[0].value,
    image: document.getElementsByName("image")[0].value
  }

  postData(newSubmission)
}

function addLike(e) {
  currentLikesText = e.target.parentElement.parentElement.childNodes[2].innerHTML
  updatedLikes = parseInt(currentLikesText.split(' ')[0])+1

  updateLocalLike(e);
  updateDBLike(e)
}

function updateLocalLike(e) {
  e.target.parentElement.parentElement.childNodes[2].innerHTML = `${updatedLikes} Likes`
}

function updateDBLike(e) {
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      likes: updatedLikes
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', () => submitToy())
  } else {
    toyForm.style.display = 'none'
  }
})
// OR HERE!
