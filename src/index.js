const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

const url = 'http://localhost:3000/toys'
const divId = document.getElementById.('toy-collection')
function createNode(element) {
   return document.createElement(element); // Create the type of element you pass in the parameters
 }
function append(parent, el) {
   return parent.appendChild(el); // Append the second parameter(element) to the first one
 }

fetch(url)
	.then((response) => response.json())
		.then(function(data) {
			let toys = data.results;
			return toys.map(function(toy) {
				let div = createNode('div'),
			})
  	});

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
