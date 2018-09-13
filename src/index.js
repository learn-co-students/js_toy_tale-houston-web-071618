const addBtn = document.querySelector('#new-toy-btn')
let addToy = false
const toyPlace = document.getElementById('toy-collection')
const toyForm = document.querySelector('.container')
const form = document.querySelector(".add-toy-form")

toyPlace.addEventListener('click', function(event){
  if(event.target.className === "like-btn"){
    const pTagLikes = event.target.parentElement.parentElement.getElementsByTagName('p')[0]
    const newLikes = parseInt(pTagLikes.innerHTML) + 1
    pTagLikes.innerHTML = `${newLikes} Likes`
    // debugger
    return fetch(`http://localhost:3000/toys/${event.target.parentElement.parentElement.dataset.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        "likes": newLikes
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    });
  }
})

// YOUR CODE HERE
fetch('http://localhost:3000/toys')
	.then(resp => resp.json())
  .then(putToyOnPage)

function putToyOnPage(toys){
  const toyPlace = document.getElementById('toy-collection')
  for(let toy in toys){
    // debugger
    const toyTemplate = `<div data-id="${toys[toy].id}" class="card">
      <h2>${toys[toy].name}</h2>
      <img src=${toys[toy].image} class="toy-avatar">
      <p>${toys[toy].likes} Likes <p>
      <button class="like-btn">Like <3</button>
    </div>`
    toyPlace.innerHTML += toyTemplate
    console.log("the toy template one!")
  }
}

//what is this? Why is it here? Why would I hide a toy?
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

form.addEventListener('submit', function(event){
  event.preventDefault();
  fetch('http://localhost:3000/toys', {
    method: "POST",
    body: JSON.stringify({
      "name": event.currentTarget.name.value,
      "image": event.currentTarget.image.value,
      "likes": 0
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  const toyTemplate = `<div class="card">
    <h2>${event.currentTarget.name.value}</h2>
    <img src=${event.currentTarget.image.value} class="toy-avatar">
    <p>${0} Likes <p>
    <button class="like-btn">Like <3</button>
  </div>`
  toyPlace.innerHTML += toyTemplate
})
console.log("add event listener to like button")



// OR HERE!
