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


// OR HERE!

// add the toys to the page
const parseJSON = resp => resp.json()

const addSingleToy = function(toy){
  const toyCollectionDiv = document.getElementById('toy-collection')
  let card = document.createElement("div");
  card.classList.add("card")
  card.innerHTML = `
            <h2>${toy.name}</h2>
            <img src="${toy.image}" class="toy-avatar">
            <p>${toy.likes} Likes<p>
            <button class="like-btn">Like <3</button>
      `
  toyCollectionDiv.appendChild(card);

  let button = card.querySelector(".like-btn");
  button.addEventListener("click", function(event){
    let desiredPara = event.path[2].querySelector('p');
    let num = parseInt(desiredPara.innerHTML.replace(" Likes",""));
    num++;
    desiredPara.innerHTML = `${num} Likes`
  });
}



function putToysOnPage(toys) {

	// const toyCollectionDiv = document.querySelector('#toy-collection')
	toys.forEach(addSingleToy)
}

fetch('http://localhost:3000/toys')
	.then(parseJSON)
	.then(putToysOnPage)

// new toy submission
const addToyForm = document.querySelector('.add-toy-form')


// const addToyForm = document.getElementsByClassName('add-toy-form')[0]
addToyForm.addEventListener('submit', function(event) {
  event.preventDefault();

  let nameInput
  let imageInput

  for(element of addToyForm){
    if (element.name ==="name"){
      nameInput = element;
    }
    else if (element.name === "image") {
      imageInput = element;
    }
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": `${nameInput.value}`,
      "image": `${imageInput.value}`,
      "likes": 0
    })
  })
    .then(parseJSON)
    .then(addSingleToy)
    addToy = !addToy
    toyForm.style.display = "none"
    nameInput.value = "";
    imageInput.value ="";

    // making the request based on the input
    // putting that information on the page
})
