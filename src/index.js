const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.getElementById("toy-collection");
const newToyForm = document.querySelector(".add-toy-form");

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    newToyForm.addEventListener("submit", newToy)
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!

document.addEventListener("click", like)

//get the toys
fetch("http://localhost:3000/toys") //returns a promise; get is implied
	.then(resp => resp.json())
	.then(json => {
		json.map(toyCard)
	})

function toyCard(toy) {
	toyCollection.innerHTML += `
		<div id="${toy.id}"class="card">
			<h2>${toy.name}</h2>
			<img src="${toy.image}" class="toy-avatar">
			<p>${toy.likes} Likes</p>
			<button id="${toy.id}" class="like-btn">Like <3</button>
		</div>
	`
}

function newToy(event) {
	let name = document.querySelectorAll(".input-text")[0].value;
	let image = document.querySelectorAll(".input-text")[1].value;
	event.preventDefault();

	fetch("http://localhost:3000/toys", {
		method: "post",
		body: JSON.stringify({
			name: name,
			image: image, 
			likes: 0
		}),
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then(resp => resp.json())
		.then(toyCard)
}

//add likes
function like(event) {
	if (event.target.className === "like-btn") {

		let id = event.target.id;
		let liked = event.target.previousElementSibling;
		let totalLikes = parseInt(event.target.previousElementSibling.innerText);
		liked.innerHTML = `${++totalLikes} likes`

		// // save likes to db
		fetch(`http://localhost:3000/toys/${id}`, {
			method: "PATCH",
			body: JSON.stringify({
				likes: totalLikes
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(console.log)
		}
}










