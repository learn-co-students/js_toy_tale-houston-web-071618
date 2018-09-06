const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const parentDiv = document.querySelector('#toy-collection')
const toyCollDiv = document.getElementById('toy-collection')
let addToy = false

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

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(addToysToPage)

function addToysToPage(toys) {
  toys.forEach(toy => {
    addToyToPage(toy, toyCollDiv)
    // document.getElementById('toy-collection').innerHTML += `
    // <div class="card" id=${toy.id}>
    //   <h2>${toy.name}</h2>
    //   <img src=${toy.image} class="toy-avatar">
    //   <p>${toy.likes} Likes <p>
    //   <button class="like-btn">Like <3</button>
    // </div>
    // `
  })
}

function addToyToPage(toy) {
  toyCollDiv.innerHTML += `
  <div class="card" id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p>${toy.likes} Likes <p>
    <button class="like-btn">Like <3</button>
  </div>
  `
}

toyForm.addEventListener('submit', e => {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"},
    body: JSON.stringify({
      "name": e.target.elements[0].value,
      "image": e.target.elements[1].value,
      "likes": 0
    })
  })
    .then(res => res.json())
})

//add likes
parentDiv.addEventListener('click', e=> {
  if (e.target && e.target.className === "like-btn") {
    let nowLikes = e.target.parentElement.parentElement.children[2].innerText.split(' ')[0]
    let toyId = parseInt(e.target.parentElement.parentElement.id)

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify({
        "likes": `${parseInt(nowLikes) +1}`
      })
    })
    .then(res => res.json())
    // debugger
    let newLikes = parseInt(nowLikes) + 1
    if(newLikes > 9){
    }
    e.target.parentElement.parentElement.children[2].innerText = `${newLikes} Likes`
  }
})


//this is wrong still






//
