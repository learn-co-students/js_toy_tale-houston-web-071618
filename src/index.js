const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

const parseJSON = response => response.json()

function putToysOnPage(toys) {
	const toyCollectionDiv = document.getElementById('toy-collection')
	// const toyCollectionDiv = document.querySelector('#toy-collection')
	toys.forEach(function(toy) {
		toyCollectionDiv.innerText += `
			<div class="card">
				<h2>${toy.name}</h2>
				<img src = "${toy.image}" class="toy-avatar">
				<p>${toy.likes} Likes <p>
          		<button class="like-btn">Like <3</button>
			</div
		`
	})
}

fetch('http://localhost:3000/toys')
	.then(parseJSON)
	.then(putToysOnPage)


// new toy submission
const addToyForm = document.querySelector('.add-toy-form')

// const addToyForm = document.getElementByClassName('add-toy-form')[0]
addToyForm.addEventListener('submit', function(event) {
	event.preventDefault();
	// console.log('form-submitted')
	fetch('http://localhost:3000/toys', {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringfy({
  			"name": "Jessie",
  			"image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  			"likes": 0
		})
	})
	// .then(parseJSON)
	// .then(console.log)
})

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










// THIS IS ALL MY OLD CODE

// const url = 'http://localhost:3000/toys'
// const divId = document.getElementById.('toy-collection')
// function createNode(element) {
//   return document.createElement(element); // Create the type of element you pass in the parameters
// }
// function append(parent, el) {
//   return parent.appendChild(el); // Append the second parameter(element) to the first one
// }

// fetch(url)
// 	.then((response) => response.json())
// 		.then(function(data) {
// 			let toys = data.results;
// 			return toys.map(function(toy) {
// 				let div = createNode('div'),
// 			})
//   	});

